import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";
import Comments from "../components/Comments";

async function getPosts(id) {
   let posts = await fetch(`${serverAdress}/users/${id}/posts?deleted=0`);
   posts = await posts.json();
   posts.forEach((post) => (post.commentVis = false));
   return posts;
}

function Posts() {
   const { user_id } = useParams();
   const [posts, setPosts] = useState(undefined);

   useEffect(() => {
      getPosts(user_id).then((posts) => setPosts(posts));
      return () => setPosts();
   }, [user_id]);

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

   function handleComments(e) {
      const post_id = e.target.name.substring(4, e.target.name.length);
      setPosts((prev) => {
         let arr = JSON.parse(JSON.stringify(prev));
         let post = arr.find((post) => post.post_id == post_id);
         post.commentVis = !post.commentVis;
         return arr;
      });
   }
   return (
      <div>
         {posts.map((post, index) => {
            return (
               <div key={index}>
                  <h1>{post.full_name}</h1>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                  {post.commentVis ? <Comments post_id={post.post_id} /> : ""}
                  <button
                     name={`post${post.post_id}`}
                     onClick={handleComments}
                  >
                     Show comments
                  </button>
                  <button
                     name={`post${post.post_id}`}
                     onClick={handleDelete}
                  >
                     Delete
                  </button>
               </div>
            );
         })}
      </div>
   );
}

export default Posts;
