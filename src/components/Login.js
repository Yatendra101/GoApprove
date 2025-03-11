import React, { useState } from 'react';
import { login } from '../api';  // Ensure this import is correct

const Login = ({ setToken, setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Attempting to log in with:', { username, password });
            const data = await login({ username, password });
            console.log('Login successful, received token:', data.token);
            setToken(data.token, data.role); // Pass role along with the token
            localStorage.setItem('role', data.role); // Save role in local storage
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required 
            />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default Login;
