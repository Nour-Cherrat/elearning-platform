import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:5000/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => setError('Error fetching courses'));
    }, []);

    return (
        <div>
            <h1>Course Page</h1>
            {error && <p>{error}</p>}
            {courses.length === 0 ? (
                <p>No courses available</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Course;
