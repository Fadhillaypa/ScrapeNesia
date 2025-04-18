import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/InputCard.css';

const InputCard = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [scrapedData, setScrapedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Untuk navigasi

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        setError('');
    };

    const handleScrape = async () => {
        if (!isValidUrl(url)) {
            setError('URL tidak valid. Silakan masukkan URL yang benar.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/scrape', { url });
            console.log('Response Data:', response.data);
            localStorage.setItem('scrapedData', JSON.stringify(response.data.products || [])); // Simpan data di localStorage
            navigate('/scraping'); // Pindah ke halaman hasil scraping
        } catch (err) {
            console.error('Error scraping data:', err);
            setError('Gagal scraping data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const isValidUrl = (urlString) => {
        try {
            return Boolean(new URL(urlString));
        } catch (e) {
            return false;
        }
    };

    return (
        <div id="input-card" className="text-center input-card">
            <h1>Scrape Data Otomatis</h1>
            <input
                type="text"
                placeholder="Masukkan URL yang ingin Anda scrape"
                value={url}
                onChange={handleInputChange}
                className="input-url"
            />
            <button onClick={handleScrape} disabled={loading} className="submit-btn">
                {loading ? 'Scraping...' : 'Scrape!'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default InputCard;
