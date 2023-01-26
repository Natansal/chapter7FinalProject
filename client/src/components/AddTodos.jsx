import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

function AddTodo({ update }) {
   const { user_id } = useParams();
   const [values, setValues] = useState({
      user_id: "",
      title: "",
      completed: true,
   });

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
            update();
            setValues({
               user_id: "",
               title: "",
               completed: true,
            });
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

   function handleChecked(e) {
      setValues((prev) => {
         return {
            ...prev,
            [e.target.name]: !e.target.checked,
         };
      });
   }

   return (
      <div className="addTodosPage">
         <form onSubmit={handleSubmit}>
            <h1>Add a task</h1>
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
               checked={!values.completed}
               onChange={handleChecked}
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
