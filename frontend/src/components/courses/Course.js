import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../layouts/Header";
import { Col, Container, Row, Button } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import {FaPlus} from "react-icons/fa6";
import {Link} from "react-router-dom";
import addCourse from "./addCourse";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:5000/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => setError('Error fetching courses'));
    }, []);

    // Handler for the button click
    const handleAddCourse = () => {
        alert('Add New Course button clicked!');
    };

    return (
        <div className="admin-dashboard">
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="sidebar-col">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} className="content-col">
                        <main className="course-content">
                            <header className="admin-course-header">
                                <div className="header-title">
                                    <h1>Admin Course List</h1>
                                    <p>Overview of platform statistics</p>
                                </div>
                                <Link to="/addCourse" className="btn btn-primary add-course-btn">
                                    <FaPlus className="menu-icon" />
                                    Add New Course
                                </Link>
                            </header>

                            {error && <p>{error}</p>}
                            {courses.length === 0 ? (
                                <p>No courses available</p>
                            ) : (
                                <ul>
                                    {courses.map(course => (
                                        <li key={course.id} className="course-item">
                                            <h3>{course.title}</h3>
                                            <p><u>Description :</u> {course.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Course;
