import "./styles/navbar.css";
import "./styles/pages.css";
import "./styles/home.css";
import "./styles/info.css";
import "./styles/todos.css";
import "./styles/posts.css";
import "./styles/addPost.css";

import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Info from "./pages/Info";
import ChangeInfo from "./pages/ChangeInfo";
import Todos from "./pages/Todos";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import NavBar from "./pages/NavBar";
import ChangeUser from "./pages/ChangeUser";
import AddPost from "./pages/AddPost";
// import Albums from './pages/Albums';
// import Posts from './pages/Posts';
export const AppContext = createContext();

export default function App() {
   const navigate = useNavigate();
   const location = useLocation();
   const user_id = location.pathname.split("/")[2];
   useEffect(() => {
      if (sessionStorage.getItem("activeUser")) {
         logIn(sessionStorage.getItem("activeUser"));
      } else {
         navigate("/login");
      }
   }, [user_id]);

   function logIn(userId) {
      sessionStorage.setItem("activeUser", userId);
      if (user_id != userId) {
         navigate(`/users/${userId}`);
      }
   }
   function logOut() {
      sessionStorage.removeItem("activeUser");
      navigate("/login");
   }
   return (
      <AppContext.Provider value={{ logIn, logOut }}>
         <Routes>
            <Route
               index
               element={
                  <Navigate
                     replace
                     to="/login"
                  />
               }
            ></Route>
            <Route
               path="/login"
               element={<Login />}
            ></Route>
            <Route
               path="/Register"
               element={<Register />}
            ></Route>
            <Route
               path="/users/:user_id"
               element={<NavBar />}
            >
               <Route
                  index
                  element={<Home />}
               />
               <Route
                  path="info"
                  element={<Info />}
               />
               <Route
                  path="change_info"
                  element={<ChangeInfo />}
               />
               <Route
                  path="todos"
                  element={<Todos />}
               />
               <Route
                  path="posts"
                  element={<Posts />}
               />
               <Route
                  path="posts/:post_user_id"
                  element={<Posts />}
               />
               <Route
                  path="change_user_info"
                  element={<ChangeUser />}
               />
               <Route
                  path="posts/add"
                  element={<AddPost />}
               />
            </Route>
            <Route
               path="*"
               element={<h1>404 Page not found!</h1>}
            />
         </Routes>
      </AppContext.Provider>
   );
}
