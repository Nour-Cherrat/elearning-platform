import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { FaList } from "react-icons/fa";

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => setError('Error fetching user data'));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update user data
        axios.put(`http://localhost:5000/api/users/${id}`, user)
            .then(() => {
                setSuccess('User updated successfully!');
                setError(null);
                setTimeout(() => navigate('/users'), 2000); // Redirect after a delay to show success message
            })
            .catch(error => setError('Error updating user'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="admin-dashboard">
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="sidebar-col">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} className="content-col">
                        <main className="user-content">
                            <header className="admin-user-header">
                                <div className="header-title">
                                    <h3>Admin - Update User</h3>
                                </div>
                                <Link to="/user" className="btn btn-primary list-user-btn">
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
                                        name="fname"
                                        value={user.fname || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lname"
                                        value={user.lname || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={user.password || ''}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="role"
                                        value={user.role || 'student'}
                                        onChange={handleChange}
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update User
                                </Button>
                            </Form>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateUser;
