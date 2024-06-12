"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can I try the system before purchasing?",
    answer:
      "Yes, we offer a free demo of our system. You can sign up for a demo on our website.",
  },
  {
    question: "Is there a minimum contract period?",
    answer:
      "No, there is no minimum contract period. You can choose to pay monthly or annually, and cancel anytime.",
  },
  {
    question: "Do you offer support for integrating with our existing systems?",
    answer:
      "Yes, we provide dedicated support to help you integrate our system with your existing software applications.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, as well as PayPal and bank transfers.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Your new plan will take effect immediately.",
  },
];

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Here are some common questions about our school management system.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <button
                className="flex items-center justify-between w-full py-4 px-6 bg-gray-100 rounded-lg focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${
                    expandedIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      expandedIndex === index
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  ></path>
                </svg>
              </button>
              {expandedIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
