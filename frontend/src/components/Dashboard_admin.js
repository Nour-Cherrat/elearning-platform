import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/Style.css';
import Course from "./courses/Course";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";

const Dashboard_admin = () => {
    const [stats, setStats] = useState({
        totalLessons: 0,
        totalStudents: 0,
        totalTeachers: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                totalLessons: 120,
                totalStudents: 350,
                totalTeachers: 20,
            };
            setStats(data);
        };

        fetchData();
    }, []);

    const [totalCourses, setTotalCourses] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses/count');
                if (response.ok) {
                    const data = await response.json();
                    setTotalCourses(data.count);
                } else {
                    const data = await response.json();
                    setError(data.error || 'Failed to fetch course count');
                }
            } catch (error) {
                setError('Failed to fetch course count');
            }
        };

        fetchCourseCount();
    }, []);

    return (
        <div className="admin-dashboard">
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="sidebar-col">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} className="content-col">
                        <main className="dashboard-content">
                            <header className="admin-dashboard-header">
                                <h1>Admin Dashboard</h1>
                                <p>Overview of platform statistics</p>
                            </header>

                            <section className="stats-grid">
                                <div className="stat-card">
                                    <h2>Total Courses</h2>
                                    <p>{totalCourses !== null ? totalCourses : 'Loading...'}</p>
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
                                <h4>Recent activities</h4>
                            </section>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard_admin;
