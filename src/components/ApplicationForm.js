import React, { useState } from 'react';
import './ApplicationForm.css';
import axios from 'axios';

const ApplicationForm = () => {
    const [name, setName] = useState('');
    const [qualification, setQualification] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [details, setDetails] = useState('');
    const [cv, setCv] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('qualification', qualification);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('jobRole', jobRole);
        formData.append('details', details);
        formData.append('cv', cv);
    
        const token = localStorage.getItem('token'); // Ensure the token is retrieved
        console.log('Token:', token);
        
        try {
            const response = await axios.post('http://localhost:5000/api/applications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Application submitted:', response.data);
        } catch (error) {
            console.error('Error submitting application:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="Qualification" required />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="Job Role" required />
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Application Details" required />
            <input type="file" onChange={(e) => setCv(e.target.files[0])} accept=".pdf" required />
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
