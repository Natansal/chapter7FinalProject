import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AppContext } from "../App";


export default function NavBar() {
    const { user } = useContext(AppContext);
    const [localUser, setLocalUser] = useState(null);

    const removeUser = () => {
        setLocalUser((localStorage.removeItem("users")));
        return alert(`User ${user.username} has been logged out`);    
    }

    useEffect(() => {
        window.addEventListener('popstate', (e) => {
            if (localStorage.getItem('users') === null) {
                window.history.go(1);
            }
        })
    }, [localUser])

    return (
        <nav className="navBar">
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/Home/${user.username}/Info`}>Info</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/Home/${user.username}/Todos`}>Todos</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/Home/${user.username}/Posts`}>Posts</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to={`/Home/${user.username}/Albums`}>Albums</NavLink>
            <hr />
            <NavLink className={({isActive}) => (isActive ? 'link active' : 'link')} to="/" onClick={removeUser}>Logout</NavLink>
            <br /><br /><br />
            <Outlet />
        </nav>
    )
}