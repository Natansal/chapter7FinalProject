import React, { useState } from "react";

function ChangeUser() {
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

  const handleSubmit = () => {};
  return (
    <div>
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
        <label>
          Old Password:
          <input
            type="text"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          New Username:
          <input
            type="text"
            name="newUsername"
            value={formData.newUsername}
            onChange={handleChange}
          />
        </label>
        <label>
          New Password:
          <input
            type="text"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
}

export default ChangeUser;
