import React, { useState } from 'react';
import { signup } from '../api';

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = await signup({ username, password });
            setToken(data.token);
            setSuccess('User created successfully!');
            setUsername('');
            setPassword('');
        } catch (err) {
            setError('Signup failed. Please try again.');
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
            <button type="submit">Sign Up</button>
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default Signup;
