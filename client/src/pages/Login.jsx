import React, { useState, useContext } from "react";
import serverAdress from "../serverAdress";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

function Login() {
   const [user, setUser] = useState({});
   const { logIn } = useContext(AppContext);

   const handleInputs = (e) => {
      setUser((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch(`${serverAdress}/users/login`, {
         method: "POST",
         body: JSON.stringify(user),
         headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.logged) {
         logIn(data.id);
      } else {
         alert("User not exist");
      }
   };

   return (
      <div className="loginPage">
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="username"
               onChange={handleInputs}
            />
            <input
               type="password"
               name="password"
               onChange={handleInputs}
            />
            <button type="submit">Click to submit</button>
         </form>
         <br />
         <NavLink to={"/Register"}>Click here to register</NavLink>
      </div>
   );
}

export default Login;
