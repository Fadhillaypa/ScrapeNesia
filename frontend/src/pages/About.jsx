import React from 'react';
import '../style/About.css'

const About = () => {
    return (
        <div  className="about-container">
            <div className="about-card">
                <h1 className="about-title">About Us</h1>
                <p className="about-text">
                Welcome to ScrapeNesia, your trusted partner for powerful and efficient web scraping solutions. Our platform is designed to help you easily extract valuable data from e-commerce websites. By simply inputting a URL from any supported online store, you can instantly scrape detailed information such as product descriptions, prices, reviews, and more. Whether you're looking to analyze market trends, track competitors, or gather data for business insights, we've got you covered.
                </p>
                <p className="about-text">
                With just a few clicks, you can input the URL of your desired e-commerce page and download the scraped data in a user-friendly format. Our system ensures fast, accurate, and reliable data extraction, saving you hours of manual work.
                </p>
                <p className="about-text">
                At ScrapeNesia, we are committed to providing cutting-edge technology that empowers your business with the data you need. Join thousands of users who trust us to scrape the web for actionable insights.
                </p>
                <p className="about-text">
                    Thank you for choosing us as your trusted partner. Let us do the heavy lifting so you can focus on growing your business!
                </p>
            </div>
        </div>
    );
};

export default About;
