import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

async function getComments(id, post_id) {
   let comments = await fetch(`${serverAdress}/users/${id}/comments?post_id=${post_id}&deleted=0`);
   comments = await comments.json();
   return comments;
}

function Comments({ post_id }) {
   const { user_id } = useParams();
   const [comments, setComments] = useState(undefined);

   useEffect(() => {
      getComments(user_id, post_id).then((comments) => setComments(comments));
      return () => setComments();
   }, [user_id, post_id]);

   if (!comments) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         {comments.map((comment, index) => {
            return (
               <div key={index}>
                  <h1>{comment.full_name}</h1>
                  <p>{comment.body}</p>
               </div>
            );
         })}
      </div>
   );
}

export default Comments;
