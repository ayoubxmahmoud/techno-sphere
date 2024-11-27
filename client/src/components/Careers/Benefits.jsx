import React from 'react';

const benefits = [
  { icon: '💼', title: 'Flexible Work', description: 'Remote-friendly and flexible schedules.' },
  { icon: '🏖️', title: 'Paid Time Off', description: 'Generous vacation and holiday allowances.' },
  { icon: '🩺', title: 'Health Coverage', description: 'Comprehensive medical, dental, and vision plans.' },
];

const Benefits = () => (
  <div className="py-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-[#EC008C] to-[#F15B2A] bg-clip-text text-transparent">
      Employee Benefits
    </h2>
    <div className="flex flex-wrap justify-center gap-6">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="max-w-xs p-6 text-center rounded-lg project-card-view"
        >
          <div className="text-4xl mb-4">{benefit.icon}</div>
          <h3 className="text-2xl font-semibold">{benefit.title}</h3>
          <p className="text-gray-700 dark:text-gray-400 mt-2">{benefit.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Benefits;
