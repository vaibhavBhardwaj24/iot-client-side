"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question:
      "How does the Heat Detection and Notification System contribute to sustainability?",
    answer:
      "Our system actively monitors the temperature and operational efficiency of home appliances, ensuring they run within optimal parameters. By preventing overheating and energy wastage, the system reduces the carbon footprint of appliances, thus contributing to sustainable living.",
  },
  {
    question: "Can this system be integrated with existing home appliances?",
    answer:
      "Yes, our system is designed to be retrofitted to a wide range of existing appliances. The sensors and monitoring components can be easily installed without requiring significant modifications to the appliance.",
  },
  {
    question: "What happens when an abnormal temperature is detected?",
    answer:
      "When the system detects a temperature above a predefined threshold, it immediately sends a notification to the user via a connected web application. This allows the user to take prompt action, such as turning off the appliance or calling for maintenance.",
  },
  {
    question: "Is the system easy to use for non-technical users?",
    answer:
      "Absolutely. The user interface of our web application is designed to be intuitive and user-friendly. Notifications and alerts are clear and actionable, ensuring that even non-technical users can easily manage and maintain their appliances.",
  },
  {
    question: "What future developments are planned for this system?",
    answer:
      "Future developments include expanding the system’s compatibility with more appliance types, enhancing machine learning algorithms for better predictive maintenance, and integrating with smart home ecosystems for a more seamless user experience.",
  },
];

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200 overflow-hidden"
    >
      <button
        className="flex justify-between items-center w-full text-left py-4 px-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* <ChevronDown className="w-5 h-5 text-blue-500" /> */}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {faqItems.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
