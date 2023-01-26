import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function NavBar() {
   const { user_id } = useParams();

   return (
      <nav className="navBar">
         <NavLink to={`/users/${user_id}/Info`}>Info</NavLink>
         <hr />
         <NavLink to={`/users/${user_id}/change_info`}>Change info</NavLink>
         <hr />
         <NavLink to={`/users/${user_id}/change_user_info`}>Change user data</NavLink>
         <hr />
         <NavLink to={`/users/${user_id}/todos`}>Todos</NavLink>
         <hr />
         <NavLink to={`/users/${user_id}/add_todo`}>Add todo</NavLink>
         <hr />
         <NavLink end to={`/users/${user_id}/posts`}>All posts</NavLink>
         <hr />
         <NavLink to={`/users/${user_id}/posts/${user_id}`}>Your posts</NavLink>
         <Outlet />
      </nav>
   );
}
