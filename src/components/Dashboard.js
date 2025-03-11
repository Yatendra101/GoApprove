import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await axios.get('/api/applications/user/yourUserId', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplications(response.data);
        };

        fetchApplications();
    }, [token]);

    return (
        <div>
            <h1>Your Applications</h1>
            <ul>
                {applications.map(app => (
                    <li key={app._id}>
                        <p>Status: {app.status}</p>
                        <p>Details: {app.details}</p>
                        <a href={app.cv} target="_blank" rel="noopener noreferrer">View CV</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
