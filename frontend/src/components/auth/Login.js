import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="forgot-password">Don't have an account? <a href="/register">Sign up</a></p>
                </div>
                <div className="login-image">
                    <h3>Check Your Project Progress</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;