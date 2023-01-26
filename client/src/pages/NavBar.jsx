import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";


export default function NavBar() {
    const { user_id } = useParams();

    return (
        <nav className="navBar">
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/users/${user_id}/Info`}>Info</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/users/${user_id}/change_info`}>Change info</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/users/${user_id}/todos`}>Todos</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/users/${user_id}/add_todo`}>Add todo</NavLink>
            <Outlet />
        </nav>
    )
}