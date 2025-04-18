// src/pages/Home.js
import React from 'react';
import '../style/Home.css';

const Home = () => {
  return (
    <div className="w-full text-center">
      <h1 className="w-full sm:w-10/12 md:w-full text-[46px] md:text-[60px] mx-4 md:mx-0 pt-20 pb-4 lg:pb-0 font-light text-white leading-[3rem] md:leading-[4rem]">
        Scrape any data for<br />
        <span
          id="switching-text"
          className="text-[#06B6D4] inline-block"
          style={{ animation: '0.7s ease 0s 1 normal forwards running slide-in' }}
        >
          Data Research
        </span>
      </h1>
    </div>
  );
};

export default Home;
