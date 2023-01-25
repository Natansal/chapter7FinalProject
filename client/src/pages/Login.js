import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const getUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/users/login`);
            const json = await response.json();
            navigate(`/Home/${user.username}`);
        }
        catch (error) {
            alert('Wrong username or password');
            throw new Error('Wrong username or password');
        }
    }

    return (
        <div>
            <form>
                <input type="text" name="username" onChange={handleInputs} />
                <input type="password" name="password" onChange={handleInputs} />
                <button onClick={getUser}>Click to submit</button>
            </form>
        </div>
    );
}