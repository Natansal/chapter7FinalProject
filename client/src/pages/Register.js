import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import serverAdress from '../serverAdress';
function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        full_name: "",
        email: "",
        phone: "",
        job: ""
    });

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${serverAdress}/users/register`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });
        const data = await res.json();
        if (data.id) navigate(`/users/${data.id}`);
        else alert("User not exist");
        
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Full Name:
                <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Job:
                <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};


export default Register
