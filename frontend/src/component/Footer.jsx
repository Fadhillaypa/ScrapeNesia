import React from 'react';
import logo from '../assets/logo.png'; // Sesuaikan path jika berbeda

const Footer = () => {
    return (
        <footer className="pt-10 bg-gradient-to-b from-[#15212D] to-[#082e36] sm:pt-16 lg:pt-24 rounded-t-3xl">
            <div className="mx-auto max-w-7xl">
                {/* Logo Section */}
                <div className="col-span-2 md:col-span-4 mr-5 flex items-center">
                    <img
                        src={logo}
                        alt="Logo ScrapeNesia"
                        className="w-10 h-10 mr-3" // Ukuran logo di footer
                    />
                    <span className="text-white text-xl font-bold">ScrapeNesia</span>
                </div>
                <div className="px-8 sm:px-6 lg:px-[8rem] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12 ml-52 mt-0">

                    {/* Follow Us Section */}
                    <div className="col-span-2 md:col-span-4 mt-6"> {/* Tambahkan ml-8 */}
                        <h4 className="text-white">Follow Us</h4>
                        <ul className="space-y-4 mt-4 text-gray-300">
                            <li><a href="https://www.facebook.com/" className="hover:underline">Facebook</a></li>
                            <li><a href="https://twitter.com/" className="hover:underline">Twitter</a></li>
                            <li><a href="https://www.instagram.com/" className="hover:underline">Instagram</a></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="col-span-2 md:col-span-4 mt-6"> {/* Tambahkan ml-8 */}
                        <h4 className="text-white">Company</h4>
                        <ul className="space-y-4 mt-4 text-gray-300">
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="col-span-2 md:col-span-4 mt-6"> {/* Tambahkan ml-8 */}
                        <h4 className="text-white">Support</h4>
                        <ul className="space-y-4 mt-4 text-gray-300">
                            <li><a href="#" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">FAQs</a></li>
                            <li><a href="#" className="hover:underline">Status</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} ScrapeNesia App. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
