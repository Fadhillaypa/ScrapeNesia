import React, { useState } from 'react';
import '../style/LoginRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/api/login", formData, { withCredentials: true });

            const { user } = response.data;
    
            if (user) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(user));

                // Redirect sesuai role
                if (user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/home");
                }
            } else {
                setErrorMessage("Login gagal! Coba lagi.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-container p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block mb-2 text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block mb-2 text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="mt-4 text-white">
                Belum punya akun? 
                <a href="/register" className="text-blue-400"> Daftar di sini</a>
            </p>
        </div>
    );
};

export default Login;
