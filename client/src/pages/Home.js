import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Outlet } from "react-router-dom";

function Home() {
   const { userId } = useContext(AppContext);
   const { username, setUsername } = useState("");

   useEffect(() => {}, []);

   return (
      <>
         <div>
            <h1>Welcome {username}!</h1>
            <h1>Come have fun with us</h1>
         </div>
      </>
   );
}

export default Home;
