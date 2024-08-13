import React from 'react';
import Course from './Course';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Course /> {/* Display the list of courses */}
        </div>
    );
};

export default Dashboard;
