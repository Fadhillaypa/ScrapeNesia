import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../style/Navbar.css';

const Navbar = ({ setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",  // ✅ Kirim request dengan session cookies
            });
    
            if (response.ok) {
                // ✅ Hapus status login dari localStorage
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user");
                localStorage.removeItem("scrapedData"); // 🧹 Hapus hasil scraping
    
                // ✅ Arahkan ke halaman login setelah logout
                navigate("/login");
            } else {
                console.error("❌ Logout gagal!");
            }
        } catch (error) {
            console.error("❌ Error saat logout:", error);
        }
    };
    
    

    // Ambil data pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800">
            <div className="flex-shrink-0 flex items-center">
                <Link to="/" aria-label="Tautan ke beranda" className="ml-10">
                    <img src={logo} alt="Logo ScrapeNesia" className="w-12 h-12 sm:h-12" />
                </Link>
                <span className="text-white text-xl font-bold ml-16">ScrapeNesia</span>
            </div>

            <div className="hidden md:flex items-center space-x-4 mr-10">
                <Link to="/home" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Home</Link>
                <Link to="/scraping" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Scraping</Link>
                <Link to="/about" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">About Us</Link>
                <Link to="/contact" className="text-white hover:bg-gray-700 rounded-md py-2 px-4">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
                <div
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-gray-600 transform hover:scale-105 transition duration-300"
                    title="Profile"
                >
                    {user.avatar
                        ? <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        : (user.name ? user.name[0].toUpperCase() : '?')}
                </div>

                {/* Tombol Logout */}
                <button onClick={handleLogout} className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-gray-600">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
