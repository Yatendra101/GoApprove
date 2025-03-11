import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatusPage = ({ token, applicationId }) => {
    const [application, setApplication] = useState(null);
    const [remarks, setRemarks] = useState([]);

    useEffect(() => {
        const fetchApplication = async () => {
            const response = await axios.get(`/api/applications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplication(response.data);
        };

        const fetchRemarks = async () => {
            const response = await axios.get(`/api/applications/${applicationId}/remarks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRemarks(response.data);
        };

        fetchApplication();
        fetchRemarks();
    }, [token, applicationId]);

    return (
        <div>
            {application && (
                <>
                    <h1>Application Status</h1>
                    <p>Status: {application.status}</p>
                    <p>Details: {application.details}</p>
                    <a href={application.cv} target="_blank" rel="noopener noreferrer">View CV</a>

                    <h2>Remarks</h2>
                    <ul>
                        {remarks.map(remark => (
                            <li key={remark._id}>{remark.remark} by {remark.userId.username}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default StatusPage;
