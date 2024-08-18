import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { FaList } from "react-icons/fa";

const UpdateCourse = () => {
    const { id } = useParams(); // Get course ID from URL
    const [course, setCourse] = useState({
        title: '',
        description: '' // Initialize description
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch course data
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(error => setError('Error fetching course data'));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update course data
        axios.put(`http://localhost:5000/api/courses/${id}`, course)
            .then(() => {
                navigate('/course'); // Redirect to the course list
            })
            .catch(error => setError('Error updating course'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!course) return <p>Loading...</p>;

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
                                    <h3>Admin - Update Course</h3>
                                </div>
                                <Link to="/course" className="btn btn-primary list-course-btn">
                                    <FaList className="menu-icon" />
                                    Courses List
                                </Link>
                            </header>

                            {error && <p>{error}</p>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={course.title || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={course.description || ''}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Course
                                </Button>
                            </Form>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateCourse;
