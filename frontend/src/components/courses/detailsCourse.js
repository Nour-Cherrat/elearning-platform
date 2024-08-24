import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Container, Button, ListGroup, Card, Row, Col} from 'react-bootstrap';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

const CourseDetails = () => {
    const { id } = useParams(); // Extract course ID from the route parameters
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch course details based on the ID from the route
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(error => setError('Error fetching course details'));
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className="course-details">
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="sidebar-col">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9} className="content-col">
                        <main className="course-details-content">
                            <Card>
                                <Card.Header>
                                    <h1>{course.title}</h1>
                                    <p><strong>Teacher:</strong> jhon doe </p>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Description:</strong> {course.description}
                                    </Card.Text>
                                    <h5>Lessons (total lessons)</h5>
                                    <ListGroup>
                                            <ListGroup.Item>
                                                <strong>Lesson 1 :</strong> lesson title
                                            </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => window.history.back()}>
                                        Back to Courses
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

export default CourseDetails;
