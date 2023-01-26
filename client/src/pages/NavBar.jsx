import React, { useContext } from "react";
import { NavLink, Outlet, useParams, Link } from "react-router-dom";
import { AppContext } from "../App";

export default function NavBar() {
   const { user_id } = useParams();
   const { logOut } = useContext(AppContext);

   function handleClick(e) {
      if (!window.confirm("Are you sure you want to log out?")) {
         return;
      }
      logOut();
   }
   return (
      <>
         <nav className="navBar">
            <NavLink to={`/users/${user_id}/Info`}>Info</NavLink>
            <NavLink to={`/users/${user_id}/change_info`}>Change info</NavLink>
            <NavLink to={`/users/${user_id}/todos`}>Todos</NavLink>
            <NavLink to={`/users/${user_id}/add_todo`}>Add todo</NavLink>
            <NavLink
               end
               to={`/users/${user_id}/posts`}
            >
               All posts
            </NavLink>
            <NavLink to={`/users/${user_id}/posts/${user_id}`}>Your posts</NavLink>
            <Link
               onClick={handleClick}
               to="/login"
            >
               Log out
            </Link>
         </nav>
         <Outlet />
      </>
   );
}
