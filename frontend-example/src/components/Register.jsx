import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });

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
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            console.error('Passwords do not match!');
            return;
        }

        try {
            await axios.post('http://localhost:8080/user/registration', user);
            navigate('/login');
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
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <input
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <button type="submit">Register</button>
            </form>
            <button onClick={() => navigate('/login')}>Login</button>
        </>
    );
};

export default Register;