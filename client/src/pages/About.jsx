import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <h1 className="text-3xl font font-semibold text-center my-7">
          About Techno Sphere
        </h1>
        <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
            Welcome to Techno Sphere, a hub for tech enthusiasts and
            professionals alike! This blog serves as a resource-rich platform
            dedicated to exploring the depths of programming languages,
            frameworks, and modern technologies. Whether you're diving into
            React for building intuitive user interfaces, mastering JavaScript
            for dynamic web development, or exploring artificial intelligence's
            vast potential, Techno Sphere delivers clear and comprehensive
            documentation to enhance your knowledge and skills.
          </p>
          <p>
            Beyond programming, Techno Sphere keeps you informed about the
            ever-evolving landscape of technology. From the latest breakthroughs
            in AI to essential updates in cybersecurity, the blog ensures you're
            always ahead of the curve. Cybersecurity enthusiasts will find
            actionable insights to protect digital environments, while AI
            aficionados can delve into groundbreaking developments shaping our
            future.
          </p>
          <p>
            As a blend of learning and discovery, Techno Sphere offers an
            engaging mix of tutorials, guides, and news that cater to both
            beginners and seasoned professionals. Whether you aim to sharpen
            your programming expertise or stay informed on tech trends, Techno
            Sphere is your trusted companion in navigating the digital world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
