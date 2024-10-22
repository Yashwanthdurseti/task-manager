import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../api';

const Login = ({ setToken, setUsername }) => {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ username, password });
            setToken(data.token);
            setUsername(username); // Set username here
            localStorage.setItem('token', data.token);
            navigate('/tasks'); // Redirect to tasks page after successful login
        } catch (error) {
            alert('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Please Enter Your Username and Password</h2> {/* Added message */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setUsernameInput(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
