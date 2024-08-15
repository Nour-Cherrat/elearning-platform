import React, { useState, useEffect } from 'react';
import '../assets/Dashboard.css';
import Course from "./Course";
import Header from "./layouts/Header";

const Dashboard_admin = () => {
    // State to hold the statistics
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalLessons: 0,
        totalStudents: 0,
        totalTeachers: 0,
    });

    // Fetch data (you might fetch from an API)
    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            // Mock data for illustration
            const data = {
                totalCourses: 15,
                totalLessons: 120,
                totalStudents: 350,
                totalTeachers: 20,
            };
            setStats(data);
        };

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <Header />
            <header className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Overview of platform statistics</p>
            </header>

            <section className="stats-grid">
                <div className="stat-card">
                    <h2>Total Courses</h2>
                    <p>{stats.totalCourses}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Lessons</h2>
                    <p>{stats.totalLessons}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Students</h2>
                    <p>{stats.totalStudents}</p>
                </div>
                <div className="stat-card">
                    <h2>Total Teachers</h2>
                    <p>{stats.totalTeachers}</p>
                </div>
            </section>

            <section className="recent-activities">
                <h2>Courses List</h2>
                <Course />
            </section>
        </div>
    );
};

export default Dashboard_admin;
