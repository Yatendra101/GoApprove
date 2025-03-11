import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ApplicationForm from './components/ApplicationForm';
import ReviewPage from './components/ReviewPage';

const App = () => {
    const [token, setTokenState] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);

    const setToken = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role); // Save role in local storage
        setTokenState(token);
        setUserRole(role);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        
        if (storedToken) {
            setTokenState(storedToken);
        }
        
        if (storedRole) {
            setUserRole(storedRole);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setTokenState('');
        setUserRole('');
    };

    return (
        <div>
            {!token ? (
                isSigningUp ? (
                    <>
                        <Signup setToken={setToken} />
                        <button onClick={() => setIsSigningUp(false)}>Back to Login</button>
                    </>
                ) : (
                    <>
                        <Login setToken={setToken} setUserRole={setUserRole} />
                        <button onClick={() => setIsSigningUp(true)}>Sign Up</button>
                    </>
                )
            ) : (
                <>
                    {userRole === 'initiator' && <ApplicationForm />}
                    {(userRole === 'reviewer' || userRole === 'approver') && <ReviewPage token={token} />}
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default App;
