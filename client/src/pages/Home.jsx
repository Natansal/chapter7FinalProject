import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Outlet, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";
import NavBar from "./NavBar";

function Home() {
    const { user_id } = useParams();
    const [fullname, setFullname] = useState("");

    async function getInfo(id) {
        let info = await fetch(`${serverAdress}/users/${id}/info`);
        info = await info.json();
        return info;
    }


    useEffect(() => {
        getInfo(user_id)
            .then((info) => setFullname(info.full_name ? info.full_name : ""))
            .catch(error => { console.log(error) });
    }, [user_id]);

    if (!fullname) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
        <NavBar />
            <div>
                <h1>Welcome {fullname}!</h1>
                <h1>Come have fun with us</h1>
            </div>
        </>
    );
}

export default Home;
