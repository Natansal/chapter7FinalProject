import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";

async function getPosts(id) {
   let posts;
   if (id) {
      posts = await fetch(`${serverAdress}/users/${id}/posts?deleted=0`);
   } else {
      posts = await fetch(`${serverAdress}/users/posts?deleted=0`);
   }
   posts = await posts.json();
   posts.forEach((post) => {
      post.commentVis = false;
      post.addCommentVis = false;
   });
   return posts;
}

function Posts() {
   const { user_id, post_user_id } = useParams();
   const [posts, setPosts] = useState(undefined);
   const [num, setNum] = useState(0);

   useEffect(() => {
      getPosts(post_user_id ? post_user_id : undefined).then((posts) => setPosts(posts));
      return () => setPosts();
   }, [user_id, post_user_id]);

   useEffect(() => {
      if (!posts) return;
      setPosts((prev) => {
         let arr = JSON.parse(JSON.stringify(prev));
         arr.forEach((post) => {
            post.commentVis = false;
            post.addCommentVis = false;
         });
         return arr;
      });
   }, [num]);

   if (!posts) {
      return <h1>Loading...</h1>;
   }

   function handleDelete(e) {
      if (!window.confirm("Are you sure you wan't to delete this post?")) {
         return;
      }
      const post_id = e.target.name.substring(4, e.target.name.length);
      fetch(`${serverAdress}/users/${user_id}/posts/${post_id}`, {
         method: "DELETE",
      }).then((res) => {
         setPosts((prev) => {
            let arr = JSON.parse(JSON.stringify(prev));
            let index = -1;
            arr.forEach((post, i) => {
               if (post.todo_id == post_id) {
                  index = i;
               }
            });
            arr.splice(index, 1);
            return arr;
         });
      });
   }

   function handleComments(e, name) {
      const post_id = e.target.name.substring(4, e.target.name.length);
      setPosts((prev) => {
         let arr = JSON.parse(JSON.stringify(prev));
         let post = arr.find((post) => post.post_id == post_id);
         post[name] = !post[name];
         return arr;
      });
   }

   function update() {
      setNum((prev) => prev + 1);
   }
   return (
      <div>
         {posts.map((post, index) => {
            return (
               <div key={index}>
                  <h1>{post.full_name}</h1>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                  {post.commentVis && (
                     <Comments
                        update={update}
                        post_id={post.post_id}
                     />
                  )}
                  {post.addCommentVis && (
                     <AddComment
                        update={update}
                        post_id={post.post_id}
                     />
                  )}
                  <button
                     name={`post${post.post_id}`}
                     onClick={(e) => handleComments(e, "commentVis")}
                  >
                     {post.commentVis ? "Hide comments" : "Show comments"}
                  </button>
                  {post.user_id == user_id && (
                     <button
                        name={`post${post.post_id}`}
                        onClick={handleDelete}
                     >
                        Delete
                     </button>
                  )}
                  <button
                     name={`post${post.post_id}`}
                     onClick={(e) => handleComments(e, "addCommentVis")}
                  >
                     {!post.addCommentVis ? "Add comment" : "Cancel"}
                  </button>
               </div>
            );
         })}
      </div>
   );
}

export default Posts;
