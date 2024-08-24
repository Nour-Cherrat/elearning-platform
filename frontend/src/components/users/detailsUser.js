import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => setError('Error fetching user details'));
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-details">
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="sidebar-col">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} className="content-col">
                        <main className="user-details-content">
                            <Card>
                                <Card.Header>
                                    <h1>{user.fname} {user.lname}</h1>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Role:</strong> {user.role}</p>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => window.history.back()}>
                                        Back to Users
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserDetails;
