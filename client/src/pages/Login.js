import React, { useState, useContext } from 'react'
import serverAdress from '../serverAdress';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App';


function Login() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { setUserId } = useContext(AppContext);
    
    const handleInputs = (e) => {
        setUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`${serverAdress}/users/login`,
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });
        const data = await res.json();
        setUserId(data.id);
        if (data.logged) navigate(`/users/${data.id}`);
        else alert("User not exist");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleInputs} />
                <input type="password" name="password" onChange={handleInputs} />
                <button type='submit'>Click to submit</button>
            </form>
        </div>
    )
}

export default Login
