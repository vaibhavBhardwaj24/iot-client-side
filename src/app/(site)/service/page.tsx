"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

// interface ServiceItem {
//   title: string;
//   cost: number;
//   description: string;
// }
const servicingItems = [
  {
    title: "Less/No Cooling",
    cost: 300,
    description:
      "Service to check and resolve issues with reduced cooling or no cooling in the AC unit, ensuring optimal performance.",
  },
  {
    title: "Power Issue",
    cost: 300,
    description:
      "Inspection and resolution of power-related problems in the AC system to ensure proper functioning.",
  },
  {
    title: "Unwanted Smell",
    cost: 500,
    description:
      "Cleaning and servicing to eliminate unpleasant odors from the AC unit, improving air quality.",
  },
  {
    title: "Water Leakage",
    cost: 650,
    description:
      "Inspection and repair of leaks in the AC system to prevent water damage and maintain efficiency.",
  },
];

const repairItems = [
  {
    title: "Gas Refill",
    cost: 2500,
    description:
      "Refilling the refrigerant gas in the AC system to ensure effective cooling performance.",
  },
  {
    title: "Compressor Replacement",
    cost: '13000 - 15000',
    description:
      "Replacement of the AC compressor to restore cooling functionality when the compressor is faulty.",
  },
  {
    title: "Cooling Coil Repair",
    cost: 4200,
    description:
      "Repair or replacement of the cooling coil to address issues affecting the AC's cooling efficiency.",
  },
  {
    title: "Capacitor Repair",
    cost: 450,
    description:
      "Repair of capacitors to resolve electrical issues within the AC system and restore normal operation.",
  },
];

const Service = () => {
  const [isServicing, setIsServicing] = useState(true);

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 py-12">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Average Servicing Prices
        </h1>
        <div className="relative mb-12">
          <div className="flex  max-w-[27.5rem] mx-auto bg-gray-200 rounded-full p-1">
            <motion.div
              className="absolute top-1 left-[20.5rem] w-[calc(20%-0.25rem)] h-[calc(100%-0.5rem)] bg-blue-500 rounded-full"
              initial={false}
              animate={{
                x: isServicing ? "0%" : "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
            <button
              className={`flex-1 text-center py-3 rounded-full z-10 relative text-lg font-semibold transition-colors duration-300 ${
                isServicing ? "text-white" : "text-gray-700"
              }`}
              onClick={() => setIsServicing(true)}
            >
              Servicing
            </button>
            <button
              className={`flex-1 text-center py-3 rounded-full z-10 relative text-lg font-semibold transition-colors duration-300 ${
                !isServicing ? "text-white" : "text-gray-700"
              }`}
              onClick={() => setIsServicing(false)}
            >
              Repair
            </button>
          </div>
        </div>
        <motion.div
          key={isServicing ? "service" : "repair"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            {(isServicing ? servicingItems : repairItems).map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-102 flex"
              >
                {/* <img src={item.image} alt={item.title} className="w-1/3 object-cover" /> */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{item.cost}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Service;
