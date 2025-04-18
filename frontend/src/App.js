import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Sidebar from './admin/component/Sidebar';
import Home from './pages/Home';
import Scraping from './pages/Scraping';
import InputCard from './component/InputCard';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import UserSettings from './pages/UserSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './admin/pages/DashboardAdmin';
import ManageUsers from './admin/pages/ManageUsers';
import ManageScrape from './admin/pages/ManageScrape';
import AdminSettings from './admin/pages/AdminSettings';

// Cek apakah pengguna sudah login dan memiliki data pengguna yang valid
const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return localStorage.getItem('isLoggedIn') === 'true' && user;
};


// Cek apakah pengguna adalah admin
const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email?.endsWith("@admin.com");
};

// Komponen ProtectedRoute untuk halaman yang membutuhkan autentikasi
const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Komponen Layout untuk menyembunyikan Navbar di halaman admin
function Layout({ children }) {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <div className="App flex flex-col min-h-screen bg-gray-900 text-gray-200">
            {!isAdminPage && <Navbar />} {/* Navbar hanya muncul di halaman user */}
            {children}
        </div>
    );
}

function App() {
    const [loggedIn, setLoggedIn] = useState(() => isAuthenticated());

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <div className="App flex flex-col min-h-screen bg-gray-900 text-gray-200">
               
                
                <Routes>
                    {/* Rute Default: Jika belum login, arahkan ke Login */}
                    <Route path="/" element={<Layout><Login /></Layout>} />

                    {/* Rute untuk halaman User */}
                    <Route path="/home" element={<ProtectedRoute element={<Layout><Home /><InputCard /><Footer /></Layout>} />} />
                    <Route path="/scraping" element={<ProtectedRoute element={<Layout><Scraping /><Footer /></Layout>} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Layout><Profile /><Footer /></Layout>} />} />
                    <Route path="/usersettings" element={<ProtectedRoute element={<Layout><UserSettings /><Footer /></Layout>} />} />

                    {/* Rute Public */}
                    <Route path="/about" element={<Layout><About /><Footer /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /><Footer /></Layout>} />

                    {/* Rute Login dan Register */}
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/register" element={<Layout><Register /></Layout>} />

                    {/* Rute untuk halaman Admin */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute element={
                            <div className="flex">
                                <Sidebar />
                                <div className="flex-grow bg-gray-900 text-gray-200">
                                    <Routes>
                                        <Route path="dashboard" element={<DashboardAdmin />} />
                                        <Route path="users" element={<ManageUsers />} />
                                        <Route path="managescrape" element={<ManageScrape />} />
                                        <Route path="adminsettings" element={<AdminSettings />} />
                                    </Routes>
                                </div>
                            </div>
                        } />
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
