import { Link } from "react-router-dom";
import React from "react";

const HeroSection = () => (
  <div className="text-center py-16 text-white">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#EC008C] to-[#F15B2A] bg-clip-text text-transparent">
      Join Us at Techno Sphere
    </h1>{" "}
    <p className="text-lg md:text-xl mb-6">
      Be part of our mission to explore and share the latest in technology, AI,
      and DevOps.
    </p>
    <button className="px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      <Link to={"/jobs"}>View Open Positions</Link>
    </button>
    <div className="mt-10 border-t border-gray-500"></div> {/* Divider */}
  </div>
);

export default HeroSection;
