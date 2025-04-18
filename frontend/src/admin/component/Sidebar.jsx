// src/components/Sidebar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import axios from 'axios';

const Sidebar = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/logout');
            localStorage.removeItem('isLoggedIn'); // Menghapus status login dari localStorage
            navigate('/login'); // Mengarahkan pengguna kembali ke halaman login
        } catch (error) {
            console.error('Logout failed:', error);
            // Anda dapat menambahkan logika untuk menangani kesalahan logout jika diperlukan
        }
    };

    return (
        <aside className="h-screen w-64 bg-gray-800 p-6 text-white fixed">
            <div className="flex items-center mb-10">
                <img src={logo} alt="Logo ScrapeNesia" className="w-10 h-10 mr-3" />
                <span className="text-xl font-bold">Scrape Nesia</span>
            </div>
            <nav className="space-y-4">
                <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">Manage Users</Link>
                <Link to="/admin/managescrape" className="block py-2 px-4 rounded hover:bg-gray-700">Manage Scrape Data</Link>
                <Link to="/admin/adminsettings" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</Link>
            </nav>
            <button
                onClick={handleLogout}
                className="mt-80 ml-14 bg-red-600 hover:bg-gray-700 text-white py-2 px-4 rounded ">Logout</button>
        </aside>
    );
};

export default Sidebar;
