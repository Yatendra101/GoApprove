import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ReviewPage = ({ token }) => {
    const [applications, setApplications] = useState([]);

    const fetchApplications = useCallback(async () => {
        const response = await axios.get('/api/applications', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
    }, [token]); // Now includes token as a dependency

    useEffect(() => {
        fetchApplications(); // Call fetchApplications on component mount
    }, [fetchApplications]); // Added fetchApplications to the dependency array

    const handleReview = async (id, status) => {
        await axios.put(`/api/applications/${id}/review`, { status, remark: "Sample remark" }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        // Refresh the application list
        fetchApplications(); // Now this works because fetchApplications is defined in scope
    };

    return (
        <div>
            <h1>Review Applications</h1>
            <ul>
                {applications.map(app => (
                    <li key={app._id}>
                        <p>Status: {app.status}</p>
                        <p>Details: {app.details}</p>
                        <button onClick={() => handleReview(app._id, 'Approved')}>Approve</button>
                        <button onClick={() => handleReview(app._id, 'Rejected')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewPage;
