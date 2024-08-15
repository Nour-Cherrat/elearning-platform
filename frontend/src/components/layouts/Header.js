import React from 'react';
import '../../assets/Style.css';
import { FaUser, FaCog } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>MyPlatform</h1> {/* Replace with your logo */}
            </div>
            <div className="icons">
                <FaUser className="icon" title="Profile" />
                <FaCog className="icon" title="Settings" />
            </div>
        </header>
    );
};

export default Header;
