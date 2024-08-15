import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard_admin from './components/Dashboard_admin';
import Course from './components/Course';

const routes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <Dashboard_admin /> },
    { path: '/course', element: <Course /> },
];

export default routes;
