import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, createContext } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Info from "./pages/Info";
import ChangeInfo from "./pages/ChangeInfo";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodos";
import Register from "./pages/Register";
// import Albums from './pages/Albums';
// import ToDos from './pages/ToDos';
// import Posts from './pages/Posts';
export const AppContext = createContext();

export default function App() {
   const [userId, setUserId] = useState(null);

   return (
      <AppContext.Provider value={{ userId, setUserId }}>
         <Routes>
            <Route
               index
               element={
                  <Navigate
                     replace
                     to="/Login"
                  />
               }
            ></Route>
            <Route
               path="/Login"
               element={<Login />}
            ></Route>
            <Route
               path="/users/:user_id"
               element={<Home />}
            />
            <Route
               path="/users/:user_id/info"
               element={<Info />}
            />
            <Route
               path="/users/:user_id/change_info"
               element={<ChangeInfo />}
            />
            <Route
               path="/users/:user_id/todos"
               element={<Todos />}
            />
            <Route
               path="/users/:user_id/add_todo"
               element={<AddTodo />}
            />
         </Routes>
      </AppContext.Provider>
   );
}
