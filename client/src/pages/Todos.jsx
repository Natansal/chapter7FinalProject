import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

async function getTodos(id) {
   let todos = await fetch(`${serverAdress}/users/${id}/todos?deleted=0`);
   todos = await todos.json();
   return todos;
}

function Todos() {
   const { user_id } = useParams();
   const [todos, setTodos] = useState(undefined);

   useEffect(() => {
      getTodos(user_id).then((todos) => setTodos(todos));
      return () => setTodos();
   }, [user_id]);

   if (!todos) {
      return <h1>Loading...</h1>;
   }
   function handleChange(e) {
      const todo_id = e.target.name.substring(4, e.target.name.length);
      fetch(`${serverAdress}/users/${user_id}/todos/${todo_id}`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({
            completed: !e.target.checked,
         }),
      }).then((res) => {
         setTodos((prev) => {
            let arr = JSON.parse(JSON.stringify(prev));
            let index = -1;
            arr.forEach((todo, i) => {
               if (todo.todo_id == todo_id) {
                  index = i;
               }
            });
            arr[index].completed = arr[index].completed == 0 ? 1 : 0;
            return arr;
         });
      });
   }

   function handleDelete(e) {
      if (!window.confirm("Are you sure you wan't to delete this task?")) {
         return;
      }
      const todo_id = e.target.name.substring(4, e.target.name.length);
      fetch(`${serverAdress}/users/${user_id}/todos/${todo_id}`, {
         method: "DELETE",
      }).then((res) => {
         setTodos((prev) => {
            let arr = JSON.parse(JSON.stringify(prev));
            let index = -1;
            arr.forEach((todo, i) => {
               if (todo.todo_id == todo_id) {
                  index = i;
               }
            });
            arr.splice(index, 1);
            return arr;
         });
      });
   }
   return (
      <div>
         <h1>Todos page</h1>
         {todos.map((todo, index) => {
            return (
               <div key={index}>
                  <input
                     type="checkbox"
                     onChange={handleChange}
                     checked={todos.find((val) => val.todo_id === todo.todo_id).completed === 0 ? true : false}
                     name={`todo${todo.todo_id}`}
                  />
                  <label htmlFor={`todo${todo.todo_id}`}>{todo.title}</label>
                  <button
                     onClick={handleDelete}
                     name={`butn${todo.todo_id}`}
                  >
                     Delete
                  </button>
               </div>
            );
         })}
      </div>
   );
}

export default Todos;
