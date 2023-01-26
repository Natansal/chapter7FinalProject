import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

async function getComments(id, post_id) {
   let comments = await fetch(`${serverAdress}/users/comments?post_id=${post_id}&deleted=0`);
   comments = await comments.json();
   return comments;
}

function Comments({ post_id, update }) {
   const { user_id } = useParams();
   const [comments, setComments] = useState(undefined);

   useEffect(() => {
      getComments(user_id, post_id).then((comments) => setComments(comments));
      return () => setComments();
   }, [post_id]);

   if (!comments) {
      return <h1>Loading...</h1>;
   }

   function handleDelete(e) {
      if (!window.confirm("Are you sure you wan't to delete this comment?")) {
         return;
      }
      const comment_id = e.target.name.substring(4, e.target.name.length);
      fetch(`${serverAdress}/users/${user_id}/comments/${comment_id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((res) => {
            update();
            alert(res.message);
         });
   }
   return (
      <div className="comments">
         <h1>Comments:</h1>
         {comments.map((comment, index) => {
            return (
               <div key={index}>
                  <h1>{comment.full_name}</h1>
                  <p>{comment.body}</p>
                  {comment.user_id == user_id && (
                     <button
                        name={`comm${comment.comment_id}`}
                        onClick={handleDelete}
                     >
                        Delete comment
                     </button>
                  )}
               </div>
            );
         })}
      </div>
   );
}

export default Comments;
