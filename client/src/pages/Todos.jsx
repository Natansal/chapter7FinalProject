import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";
import AddTodo from "../components/AddTodos";
async function getTodos(id) {
   let todos = await fetch(`${serverAdress}/users/${id}/todos?deleted=0`);
   todos = await todos.json();
   return todos;
}

function Todos() {
   const { user_id } = useParams();
   const [todos, setTodos] = useState(undefined);
   const [num, setNum] = useState(0);

   function update() {
      setNum((prev) => prev + 1);
   }

   useEffect(() => {
      getTodos(user_id).then((todos) => setTodos(todos));
      return () => setTodos();
   }, [user_id, num]);

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
      <div className="todosPage">
         <h1>Todos page</h1>
         <div className="todosContainer">
            <div className="todos">
               {todos.map((todo, index) => {
                  return (
                     <div
                        key={index}
                        className="todo"
                     >
                        <input
                           type="checkbox"
                           onChange={handleChange}
                           checked={todo.completed === 0 ? true : false}
                           name={`todo${todo.todo_id}`}
                        />
                        <label
                           className={todo.completed === 1 ? "" : "doneTask"}
                           htmlFor={`todo${todo.todo_id}`}
                        >
                           {todo.title}
                        </label>
                        <button className="deleteBtn"
                           onClick={handleDelete}
                           name={`butn${todo.todo_id}`}
                        >
                           Delete
                        </button>
                     </div>
                  );
               })}
            </div>
            <AddTodo update={update} />
         </div>
      </div>
   );
}

export default Todos;
