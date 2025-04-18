import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { initialScrapes } from './ManageScrape';
import { Link } from 'react-router-dom'; // Import Link untuk navigasi

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardAdmin = () => {
    // Map data scrapes for the chart
    const scrapeLabels = initialScrapes.map((scrape) => scrape.url);
    const scrapeDates = initialScrapes.map((scrape) =>
        new Date(scrape.lastScraped).getTime()
    );

    const chartData = {
        labels: scrapeLabels,
        datasets: [
            {
                label: 'Scrape Dates (Unix Timestamp)',
                data: scrapeDates,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#FFFFFF',
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        `Last Scraped: ${new Date(context.raw).toLocaleDateString()}`,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFFFFF',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#FFFFFF',
                },
                grid: {
                    color: '#444444',
                },
            },
        },
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-gray-300">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white">EduFlex</h2>
                </div>
                <nav className="mt-6">
                    <a
                        href="#"
                        className="block px-6 py-3 text-white bg-gray-700 rounded-md mb-2"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="block px-6 py-3 hover:bg-gray-700 rounded-md"
                    >
                        Assignment
                    </a>
                    <a
                        href="#"
                        className="block px-6 py-3 hover:bg-gray-700 rounded-md"
                    >
                        Report
                    </a>
                    <a
                        href="#"
                        className="block px-6 py-3 hover:bg-gray-700 rounded-md"
                    >
                        Stats
                    </a>
                    <a
                        href="#"
                        className="block px-6 py-3 hover:bg-gray-700 rounded-md"
                    >
                        Message
                    </a>
                    <a
                        href="#"
                        className="block px-6 py-3 hover:bg-gray-700 rounded-md"
                    >
                        Help
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search anything here..."
                            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md focus:outline-none"
                        />
                        <button className="ml-4 p-2 bg-gray-700 text-white rounded-md">
                            🔍
                        </button>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                    <Link to="/admin/users" className="p-6 bg-gray-800 rounded-lg text-center">
                        <h3 className="text-lg font-bold text-white">Users Data</h3>
                    </Link>
                    <Link to="/admin/managescrape" className="p-6 bg-gray-800 rounded-lg text-center">
                        <h3 className="text-lg font-bold text-white">Scrape Data</h3>
                    </Link>
                    <Link to="/admin/downloads" className="p-6 bg-gray-800 rounded-lg text-center">
                        <h3 className="text-lg font-bold text-white">Download</h3>
                    </Link>
                </div>

                {/* Scrape Data Section */}
                <section className="mt-10">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Scrape Data Overview
                    </h2>
                    <div className="bg-gray-800 p-6 rounded-md">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardAdmin;
