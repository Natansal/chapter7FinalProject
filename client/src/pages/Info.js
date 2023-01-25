import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Info() {
   const { user } = useContext(AppContext);

   return (
      <div>
         <h1>Info page</h1>
         <h1>Hi {user.name}!</h1>
         <br />
         <h2>Personal information:</h2>
         <br />
         <h3>E-mail: {user.email}</h3>
         <br />
         <h3>
            Adsress: {user.address.street} ,{user.address.suite} ,{user.address.city}
         </h3>
         <br />
         <h3>Phone Number: {user.phone}</h3>
         <br />
         <h3>Your catch phrase: {user.company.catchPhrase}!</h3>
      </div>
   );
}
