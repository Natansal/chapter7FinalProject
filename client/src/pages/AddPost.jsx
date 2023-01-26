import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

function AddPost() {
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const { user_id } = useParams();
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${serverAdress}/users/${user_id}/posts`, {
         method: "POST",
         headers: {
            "Content-type": "application/json",
         },
         body: JSON.stringify({ user_id, body, title }),
      })
         .then((res) => res.json())
         .then((res) => {
            alert(res.message);
            setTitle("");
            setBody("");
            navigate(`/users/${user_id}/posts`);
         });
   };

   return (
      <div className="addPost">
         <h1>Post a Post</h1>
         <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            <label>Body:</label>
            <textarea
               value={body}
               onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit">Post</button>
         </form>
      </div>
   );
}

export default AddPost;
