import React from "react";
import Tilt from "react-parallax-tilt";

const values = [
  {
    title: "Innovation",
    description: "We value creativity and fresh ideas to stay ahead in tech.",
  },
  {
    title: "Collaboration",
    description: "Together, we achieve more and build a better tech community.",
  },
  {
    title: "Inclusion",
    description:
      "We celebrate diversity and create opportunities for everyone.",
  },
];

const CultureValues = () => (
  <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#EC008C] to-[#F15B2A] bg-clip-text text-transparent">
      Our Culture & Values
    </h2>
    <p className="text-lg md:text-xl dark:text-gray-400 mb-8">
      What drives us to build a better tech future.
    </p>
    <div className="flex flex-wrap justify-center gap-6">
      {values.map((value, index) => (
        <Tilt
          key={index}
          className="max-w-xs p-6 border border-gray-200 bg-indigo-200 dark:bg-indigo-950 rounded-lg shadow-lg hover:shadow-xl transition img-fluid cursor-pointer"
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.05}
        >
          <h3 className="text-3xl font-semibold text-transparent bg-gradient-to-r dark:from-green-500 dark:to-white bg-clip-text from-green-900 to-green-400">
            {value.title}
          </h3>

          <p className="dark:text-gray-400 mt-2">{value.description}</p>
        </Tilt>
      ))}
    </div>
  </div>
);

export default CultureValues;
