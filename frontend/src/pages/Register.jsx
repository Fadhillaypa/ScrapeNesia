import React, { useState } from 'react';
import '../style/LoginRegister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            const data = response.data;

            setMessage(data.message || 'Registrasi berhasil!');

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registrasi gagal, coba lagi.');
        }
    };

    return (
        <div className="register-container p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block mb-2 text-white">Nama</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Masukkan nama"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block mb-2 text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Masukkan email"
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
                        placeholder="Masukkan password"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default Register;
