import React, { useState } from "react";
import { useParams } from "react-router-dom";
import serverAdress from "../serverAdress";

function ChangeUser() {
  const { user_id } = useParams();

  const [formData, setFormData] = useState({
    oldUsername: "",
    oldPassword: "",
    newUsername: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${serverAdress}/users/${user_id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      alert("User changed successfully");
    } else if (res.status === 409) {
      alert("Username is already taken");
    } else if (res.status === 422) {
      alert("fill all the one of the change fields!!!");
    } else {
      alert("User not found");
    }
  };
  return (
    <div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Old Username:
          <input
            type="text"
            name="oldUsername"
            value={formData.oldUsername}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Old Password:
          <input
            type="text"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          New Username:
          <input
            type="text"
            name="newUsername"
            value={formData.newUsername}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="text"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChangeUser;
