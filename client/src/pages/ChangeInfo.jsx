import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

async function getInfo(id) {
   let info = await fetch(`${serverAdress}/users/${id}/info`);
   info = await info.json();
   return info;
}

function ChangeInfo() {
   const { user_id } = useParams();
   const [info, setInfo] = useState(undefined);
   const [values, setValues] = useState({
      full_name: "",
      phone: "",
      job: "",
      email: "",
   });
   const navigator = useNavigate();

   useEffect(() => {
      getInfo(user_id).then((info) => setInfo(info));
      return () => setInfo();
   }, [user_id]);

   useEffect(() => {
      if (!info) {
         return;
      }
      setValues({ ...info });
   }, [info]);
   if (!info) {
      return <h1>Loading...</h1>;
   }

   async function handleSubmit(event) {
      event.preventDefault();
      fetch(`${serverAdress}/users/${user_id}/info`, {
         method: "PUT",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify(values),
      })
         .then((res) => res.json())
         .then((res) => {
            alert(res.message);
            navigator(`/users/${user_id}/info`);
         });
   }

   function handleChange(e) {
      setValues((prev) => {
         return {
            ...prev,
            [e.target.name]: e.target.value,
         };
      });
   }
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label htmlFor="full_name">Full name</label>
            <input
               type="text"
               value={values.full_name}
               onChange={handleChange}
               name="full_name"
            />
            <label htmlFor="email">Email</label>
            <input
               type="text"
               value={values.email}
               onChange={handleChange}
               name="email"
            />
            <label htmlFor="phone">Phone</label>
            <input
               type="text"
               value={values.phone}
               onChange={handleChange}
               name="phone"
            />
            <label htmlFor="job">Job</label>
            <input
               type="text"
               value={values.job}
               onChange={handleChange}
               name="job"
            />
            <input
               type="submit"
               value="Submit"
            />
         </form>
      </div>
   );
}

export default ChangeInfo;
