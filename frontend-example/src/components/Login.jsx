import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: '', password: ''});

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:8080/main/secured', {withCredentials: true});
                navigate('/user');
            } catch (error) {
            }
        };

        checkAuth();
    }, []);

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/user/auth', credentials);
            navigate('/user');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/register')}>Register</button>
        </>
    );
};

export default Login;
