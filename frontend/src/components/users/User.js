import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../layouts/Header";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => setError('Error fetching users'));
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
                        <main className="course-content">
                            <header className="admin-course-header">
                                <div className="header-title">
                                    <h1>Admin User List</h1>
                                    <p>Overview of platform statistics</p>
                                </div>
                                <Link to="/addUser" className="btn btn-primary add-course-btn">
                                    <FaPlus className="menu-icon" />
                                    Add New User
                                </Link>
                            </header>

                            {error && <p>{error}</p>}
                            {users.length === 0 ? (
                                <p>No users available</p>
                            ) : (
                                <Table bordered hover responsive>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fname</th>
                                        <th>Lname</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className={"center"}>{index + 1}</td>
                                            <td>{user.fname}</td>
                                            <td>{user.lname}</td>
                                            <td className={"center"}>{user.email}</td>
                                            <td className={"center"}>{user.role}</td>
                                            <td className={"center"}>
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

export default User;
