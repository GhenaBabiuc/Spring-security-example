import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
