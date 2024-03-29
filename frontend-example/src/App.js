import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import axios from 'axios';

axios.defaults.withCredentials = true;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
