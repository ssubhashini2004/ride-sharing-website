import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';  // Ensure the path to your logo is correct

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login:', user, password);
        // Place your login logic here
        navigate('/al'); // Redirect to AL page upon successful login
    };

    return (
        <div className="login-form">
            <img src={logo} className="login-logo" alt="App Logo" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
}

export default Login;
