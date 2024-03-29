import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/main/info');
                setUser(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/user/logout');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Username: {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserPage;