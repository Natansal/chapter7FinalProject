import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

function AddTodo() {
   const { user_id } = useParams();
   const [values, setValues] = useState({
      user_id: "",
      title: "",
      completed: false,
   });
   const navigator = useNavigate();

   async function handleSubmit(event) {
      event.preventDefault();
      fetch(`${serverAdress}/users/${user_id}/todos`, {
         method: "POST",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify(values),
      })
         .then((res) => res.json())
         .then((res) => {
            alert(res.message);
            navigator(`/users/${user_id}/todos`);
         });
   }

   function handleChange(e) {
      setValues((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
               type="text"
               value={values.title}
               onChange={handleChange}
               name="title"
            />
            <label htmlFor="completed">Done?</label>
            <input
               type="checkbox"
               checked={values.completed}
               onChange={handleChange}
               name="completed"
            />
            <input
               type="submit"
               value="Submit"
            />
         </form>
      </div>
   );
}

export default AddTodo;
