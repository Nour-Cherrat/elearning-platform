import React from 'react';
import '../../assets/Style.css'; // CSS file for styling
import { FaUsers, FaChalkboardTeacher, FaBook, FaClipboardList, FaChartLine, FaCog } from 'react-icons/fa';
import {FaChartColumn} from "react-icons/fa6"; // Importing icons from react-icons

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul className="menu">
                    <li>
                        <a href="/dashboard">
                            <FaChartColumn className="menu-icon" />
                            <span>Admin Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#manage-users">
                            <FaUsers className="menu-icon" />
                            <span>Manage Users</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="/user">All users</a></li>
                            <li><a href="/users/students">Students</a></li>
                            <li><a href="/users/teachers">Teachers</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#course-management">
                            <FaBook className="menu-icon" />
                            <span>Course Management</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="/course">Courses</a></li>
                            <li><a href="#manage-lessons">Lessons</a></li>
                            <li><a href="#manage-quizzes">Quizzes</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#progress-tracking">
                            <FaChartLine className="menu-icon" />
                            <span>Progress Tracking</span>
                        </a>
                    </li>
                    <li>
                        <a href="#settings">
                            <FaCog className="menu-icon" />
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;