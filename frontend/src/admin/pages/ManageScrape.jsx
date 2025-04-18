// src/pages/ManageScrape.js
import React, { useState } from 'react';

// Data hasil scraping yang disimulasikan
export const initialScrapes = [
    { id: 1, url: 'https://example.com/page1', status: 'Completed', lastScraped: '2024-10-01' },
    { id: 2, url: 'https://example.com/page2', status: 'Pending', lastScraped: '2024-10-02' },
    { id: 3, url: 'https://example.com/page3', status: 'In Progress', lastScraped: '2024-10-03' },
    { id: 4, url: 'https://example.com/product1', status: 'Completed', lastScraped: '2024-10-05' },
    { id: 5, url: 'https://example.com/product2', status: 'Failed', lastScraped: '2024-10-06' },
    { id: 6, url: 'https://example.com/blog1', status: 'Completed', lastScraped: '2024-10-07' },
    { id: 7, url: 'https://example.com/blog2', status: 'Pending', lastScraped: '2024-10-08' },
    { id: 8, url: 'https://example.com/news', status: 'In Progress', lastScraped: '2024-10-09' },
];

const ManageScrape = () => {
    const [scrapes, setScrapes] = useState(initialScrapes);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editData, setEditData] = useState({ url: '', status: '', lastScraped: '' });

    const filteredScrapes = scrapes.filter((scrape) =>
        scrape.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scrape.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startEditing = (scrape) => {
        setEditingId(scrape.id);
        setEditData({ url: scrape.url, status: scrape.status, lastScraped: scrape.lastScraped });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const saveEdit = (id) => {
        setScrapes(scrapes.map((scrape) =>
            scrape.id === id ? { ...scrape, ...editData } : scrape
        ));
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px', minHeight: '650px' }} className="input-card p-4">
            <h1 className="text-2xl font-bold text-white">Manage Scrape</h1>
            <p className="text-gray-300">Manage and monitor scraping tasks here.</p>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by URL or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-4 mb-6 p-2 w-full max-w-md border border-gray-600 rounded-md bg-[#171E28] text-white placeholder-gray-500"
            />

            <div className="w-full max-w-4xl mx-auto overflow-x-auto">
                <table className="min-w-full border border-gray-600">
                    <thead className="bg-gradient-to-b from-[#15212D] to-[#082e36]">
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 text-white">ID</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">URL</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Status</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Last Scraped</th>
                            <th className="border border-gray-600 px-4 py-2 text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#171E28]">
                        {filteredScrapes.map((scrape) => (
                            <tr key={scrape.id} className="hover:bg-[#105C6E] transition duration-300">
                                <td className="border border-gray-600 px-4 py-2 text-white">{scrape.id}</td>

                                {editingId === scrape.id ? (
                                    <>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="text"
                                                name="url"
                                                value={editData.url}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="text"
                                                name="status"
                                                value={editData.status}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                        <td className="border border-gray-600 px-4 py-2">
                                            <input
                                                type="text"
                                                name="lastScraped"
                                                value={editData.lastScraped}
                                                onChange={handleEditChange}
                                                className="p-1 rounded-md w-full bg-[#171E28] text-white placeholder-gray-500"
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{scrape.url}</td>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{scrape.status}</td>
                                        <td className="border border-gray-600 px-4 py-2 text-white">{scrape.lastScraped}</td>
                                    </>
                                )}

                                <td className="border border-gray-600 px-4 py-2 text-white">
                                    {editingId === scrape.id ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(scrape.id)}
                                                className="px-2 py-1 mr-2 bg-green-500 rounded text-white"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-2 py-1 bg-red-500 rounded text-white"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(scrape)}
                                            className="px-2 py-1 bg-blue-500 rounded text-white"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredScrapes.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-400">
                                    No scrape tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScrape;
