import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

async function getInfo(id) {
   let info = await fetch(`${serverAdress}/users/${id}/info`);
   info = await info.json();
   return info;
}

function Info() {
   const { user_id } = useParams();
   const [info, setInfo] = useState(undefined);

   useEffect(() => {
      getInfo(user_id).then((info) => setInfo(info));
      return () => setInfo();
   }, [user_id]);

   if (!info) {
      return <h1>Loading...</h1>;
   }

   return (
      <div className="infoPage">
         <h1>Info page</h1>
         <h3>Name: {info.full_name}</h3>
         <h3>Email: {info.email}</h3>
         <h3>Phone: {info.phone}</h3>
         <h3>Job: {info.job}</h3>
      </div>
   );
}

export default Info;
