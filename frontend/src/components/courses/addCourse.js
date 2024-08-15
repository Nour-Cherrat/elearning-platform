import React, { useState } from 'react';
import Header from "../layouts/Header";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import { Link } from "react-router-dom";
import { FaList, FaPlus } from "react-icons/fa";

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description) {
            setError('Title and description are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                setSuccess('Course added successfully!');
                setTitle('');
                setDescription('');
                setError('');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to add course');
                setSuccess('');
            }
        } catch (error) {
            setError('Failed to add course');
            setSuccess('');
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
                                    <h3>Admin - Add a New Course</h3>
                                </div>
                                <Link to="/course" className="btn btn-primary list-course-btn">
                                    <FaList className="menu-icon" />
                                    Courses List
                                </Link>
                            </header>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formCourseTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter course title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formCourseDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter course description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    <FaPlus className="menu-icon" />
                                    Add Course
                                </Button>
                            </Form>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddCourse;
