import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

const Scraping = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const scrapedData = JSON.parse(localStorage.getItem('scrapedData')) || [];
        setData(scrapedData);

        // 🔍 Pantau perubahan status login
        const checkLoginStatus = () => {
            if (!localStorage.getItem('isLoggedIn')) {
                setData([]); // Kosongkan tampilan
                navigate("/login"); // Arahkan ke login jika belum login
            }
        };

        window.addEventListener("storage", checkLoginStatus);
        return () => window.removeEventListener("storage", checkLoginStatus);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <div className="w-full max-w-5xl mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">Hasil Scraping</h1>
                        <p className="text-gray-300">Berikut adalah hasil scraping yang telah dilakukan.</p>
                        {data.length > 0 && (
                            <CSVLink
                                data={data}
                                headers={[
                                    { label: "Nama Produk", key: "produkName" },
                                    { label: "Harga", key: "produkPrice" },
                                    { label: "Rating", key: "produkRating" },
                                    { label: "Terjual", key: "produkTerjual" },
                                    { label: "Lokasi", key: "produkLokasi" },
                                    { label: "URL", key: "produkUrl" },
                                ]}
                                filename="hasil_scraping.csv"
                                className="px-4 py-2 bg--500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Download CSV
                            </CSVLink>
                        )}
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full border border-gray-600">
                            <thead className="bg-gradient-to-b from-[#15212D] to-[#082e36]">
                                <tr>
                                    <th className="border border-gray-600 px-4 py-2 text-white">No</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">Nama Produk</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">Harga</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">Rating</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">Terjual</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">Lokasi</th>
                                    <th className="border border-gray-600 px-4 py-2 text-white">URL</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#171E28]">
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index} className="hover:bg-[#105C6E] transition duration-300">
                                            <td className="border border-gray-600 px-4 py-2 text-white">{index + 1}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">{item.produkName}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">{item.produkPrice}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">{item.produkRating}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">{item.produkTerjual}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">{item.produkLokasi}</td>
                                            <td className="border border-gray-600 px-4 py-2 text-white">
                                                <a href={item.produkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                                    Lihat Produk
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-white p-4">Tidak ada data scraping.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Scraping;
