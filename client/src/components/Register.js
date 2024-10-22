import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, password });
            alert("User registered successfully!");
        } catch (error) {
            alert('Registration failed: ' + error.response.data.message); // Add this line
        }
    };

    return (
        <div>
            <h2>Please Register Here</h2> {/* Added message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
