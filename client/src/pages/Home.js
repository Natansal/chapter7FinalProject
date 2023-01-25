import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Home() {
    const { user } = useContext(AppContext);
    return (
        <>
            <div>
                <h1>Welcome {user.username}!</h1>
                <h1>Come have fun with us</h1>
            </div>
        </>
    )
}