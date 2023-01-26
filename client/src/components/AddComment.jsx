import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

function AddComment({ post_id, update }) {
   const { user_id } = useParams();
   const [bodyVal, setBodyVal] = useState("");

   async function handleSubmit(event) {
      event.preventDefault();
      fetch(`${serverAdress}/users/${user_id}/comment`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({
            user_id,
            post_id,
            body: bodyVal,
         }),
      })
         .then((res) => res.json())
         .then((res) => {
            update();
            alert(res.message);
         });
   }

   function handleChange(e) {
      setBodyVal(e.target.value);
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <textarea
               cols="30"
               rows="10"
               value={bodyVal}
               onChange={handleChange}
            ></textarea>
         </form>
      </div>
   );
}

export default AddComment;
