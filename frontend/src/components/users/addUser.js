import React, { useState } from 'react';
import Header from "../layouts/Header";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import { Link } from "react-router-dom";
import { FaList, FaPlus } from "react-icons/fa";

const AddUser = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!fname || !lname || !email || !password) {
            setError('First name, last name, email, and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname, lname, email, password, role }),
            });

            if (response.ok) {
                setSuccess('User added successfully!');
                setFname('');
                setLname('');
                setEmail('');
                setPassword('');
                setRole('student');
                setError('');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to add user');
                setSuccess('');
            }
        } catch (error) {
            setError('Failed to add user');
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
                                    <h3>Admin - Add a New User</h3>
                                </div>
                                <Link to="/user" className="btn btn-primary list-course-btn">
                                    <FaList className="menu-icon" />
                                    Users List
                                </Link>
                            </header>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formFname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    <FaPlus className="menu-icon" />
                                    Add User
                                </Button>
                            </Form>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddUser;
