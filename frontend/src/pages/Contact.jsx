import React, { useState } from 'react';
import '../style/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Proses pengiriman form (misalnya, panggil API atau tampilkan pesan)
        console.log('Form data:', formData);
        alert('Pesan berhasil dikirim!');
    };

    return (
        <div className="contact-container p-4">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
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
                    <label htmlFor="phone" className="block text-white mb-2">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your message"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
