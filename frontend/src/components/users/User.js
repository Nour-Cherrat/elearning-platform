import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../layouts/Header";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import Sidebar from "../layouts/Sidebar";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalTeachers: 0,
        totalStudents: 0,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/count')
            .then(response => setStats(response.data))
            .catch(error => setError('Error fetching user statistics'));

        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => setError('Error fetching users'));
    }, []);

    const handleViewUser = (id) => {
        navigate(`/users/details/${id}`);
    };

    const handleEditUser = (id) => {
        navigate(`/users/edit/${id}`);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
            axios.delete(`http://localhost:5000/api/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user.id !== id));
                    alert('User deleted successfully');
                })
                .catch(error => setError('Error deleting user'));
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
                                    <h1>Admin User List</h1>
                                    <p>Overview of platform statistics</p>
                                </div>
                                <Link to="/addUser" className="btn btn-primary add-course-btn">
                                    <FaPlus className="menu-icon" />
                                    Add New User
                                </Link>
                            </header>
                            &nbsp;

                            <section className="stats-grid-user">
                                <div className="stat-card">
                                    <h2>Total Users</h2>
                                    <p>{stats.totalUsers}</p>
                                </div>
                                <div className="stat-card">
                                    <h2>Users by Role</h2>
                                    <ul>
                                        <li>Admin: {stats.totalAdmins}</li>
                                        <li>Teacher: {stats.totalTeachers}</li>
                                        <li>Student: {stats.totalStudents}</li>
                                    </ul>
                                </div>
                            </section>

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
                                                <Button variant="link" onClick={() => handleViewUser(user.id)}>
                                                    <FaEye />
                                                </Button>
                                                <Button variant="link" onClick={() => handleEditUser(user.id)}>
                                                    <FaEdit />
                                                </Button>
                                                <Button variant="link" onClick={() => handleDeleteUser(user.id)}>
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

export default User;
