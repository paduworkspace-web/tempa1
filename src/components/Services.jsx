import React from "react";
import { Card, CardBody } from "./Card";

const Services = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="relative h-screen w-[96vw] rr bc flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          {/* Services Title */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
            <h2 className="text-xl special-font sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3 sm:mb-4 px-1 ">
              <span className="cc">Our<span className="ss"> Services</span></span>
            </h2>
            {/* <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-1 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-500 transition-all duration-700 ease-in-out"></h2> */}
            <p className="text-gray-300 special-font text-sm sm:text-base md:text-xl max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-1 leading-relaxed">
              To Be Your Best Version <br /> Make your life <span className="sss">Colorful</span>  
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-full">
            {/* Service Card 1 */}
            <Card className="hover-card hover-card-1 floating-animation w-full h-auto min-h-[180px] sm:min-h-[200px] md:h-56 lg:h-64 group">
              <CardBody className="hover-gradient p-4 sm:p-5 h-full flex flex-col relative">
                <div className="flex items-start mb-3 sm:mb-4 relative z-10">
                  <div className="hover-icon w-1 sm:w-1.5 h-5 sm:h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-base sm:text-lg md:text-xl font-bold text-gray-100 leading-tight flex-1 group-hover:text-blue-300 transition-colors duration-300">
                    Interactive Learning Formats
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-sm sm:text-base leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Learn the way that suits you best, whether it's through
                  immersive videos, insightful audio sessions, or structured
                  documents. Our multi-format approach ensures you stay engaged
                  and retain more.
                </p>
              </CardBody>
            </Card>

            {/* Service Card 2 */}
            <Card className="hover-card hover-card-2 floating-animation w-full h-auto min-h-[180px] sm:min-h-[200px] md:h-56 lg:h-64 group">
              <CardBody className="hover-gradient p-4 sm:p-5 h-full flex flex-col relative">
                <div className="flex items-start mb-3 sm:mb-4 relative z-10">
                  <div className="hover-icon w-1 sm:w-1.5 h-5 sm:h-6 bg-gradient-to-b from-green-400 to-teal-500 rounded-full mr-3 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-base sm:text-lg md:text-xl font-bold text-gray-100 leading-tight flex-1 group-hover:text-green-300 transition-colors duration-300">
                    Guided Meditation
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-sm sm:text-base leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Find peace in the chaos with our guided meditation sessions.
                  Designed to reduce stress and improve focus, these sessions
                  help you reconnect with your inner calm one breath at a time.
                </p>
              </CardBody>
            </Card>

            {/* Service Card 3 */}
            <Card className="hover-card hover-card-3 floating-animation w-full h-auto min-h-[180px] sm:min-h-[200px] md:h-56 lg:h-64 group md:col-span-2 lg:col-span-1">
              <CardBody className="hover-gradient p-4 sm:p-5 h-full flex flex-col relative">
                <div className="flex items-start mb-3 sm:mb-4 relative z-10">
                  <div className="hover-icon w-1 sm:w-1.5 h-5 sm:h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-3 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-base sm:text-lg md:text-xl font-bold text-gray-100 leading-tight flex-1 group-hover:text-orange-300 transition-colors duration-300">
                    AI-Powered Support
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-sm sm:text-base leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Get instant answers and round-the-clock assistance with our
                  AI-powered support system. Designed to handle queries
                  efficiently and guide you without delays.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;