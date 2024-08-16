import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../layouts/Header";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:5000/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => setError('Error fetching courses'));
    }, []);


    const handleDeleteCourse = (id) => {
        if (window.confirm(`Are you sure you want to delete course with ID: ${id}?`)) {
            axios.delete(`http://localhost:5000/api/courses/${id}`)
                .then(() => {
                    setCourses(courses.filter(course => course.id !== id));
                    alert('Course deleted successfully');
                })
                .catch(error => setError('Error deleting course'));
        }
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
                                <Table bordered hover responsive>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Teacher's Name</th>
                                        <th>Number of Students</th>
                                        <th>Number of Lessons</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={course.id}>
                                            <td className={"center"}>{index + 1}</td>
                                            <td>{course.title}</td>
                                            <td>Jhon Doe</td>
                                            <td className={"center"}>--</td>
                                            <td className={"center"}>--</td>
                                            <td className={"center"}>
                                                <Button variant="link" onClick={() => handleDeleteCourse(course.id)}>
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Course;
