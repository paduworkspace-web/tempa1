import React from "react";

const About = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-false tracking-tight text-white mb-6">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-center text-white/80 max-w-2xl leading-relaxed">
          Learn more about our mission to support your mental health journey.
        </p>
      </div>
    </div>
  );
};

export default About;