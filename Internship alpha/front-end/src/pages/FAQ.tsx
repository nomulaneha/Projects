import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is HeartGuard's heart disease prediction technology?",
    answer: "HeartGuard uses advanced machine learning algorithms to analyze various health parameters and predict the likelihood of heart disease. Our technology considers multiple factors including medical history, lifestyle choices, and current health metrics to provide accurate predictions."
  },
  {
    question: "How accurate are the predictions?",
    answer: "Our prediction model has been trained on extensive medical datasets and validated by healthcare professionals. While no prediction is 100% certain, our system maintains a high accuracy rate and is continuously improved through machine learning."
  },
  {
    question: "Who can use HeartGuard?",
    answer: "HeartGuard is designed for both healthcare professionals and organizations. Medical practitioners can use it to support their diagnostic process, while healthcare organizations can implement it as part of their preventive care programs."
  },
  {
    question: "How is my health data protected?",
    answer: "We take data security very seriously. All health data is encrypted using industry-standard protocols, stored securely, and handled in compliance with HIPAA and other relevant healthcare data protection regulations."
  },
  {
    question: "Can I integrate HeartGuard with existing healthcare systems?",
    answer: "Yes, HeartGuard is designed to integrate seamlessly with most major healthcare management systems. Our team provides full support for integration and customization according to your organization's needs."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer comprehensive support including technical assistance, training for healthcare staff, regular system updates, and dedicated customer service. Our support team is available 24/7 to address any concerns."
  },
  {
    question: "How often should predictions be updated?",
    answer: "We recommend updating predictions whenever there are significant changes in a patient's health parameters or at least every 6 months. However, the frequency can be adjusted based on individual needs and healthcare protocols."
  },
  {
    question: "What information is needed for a prediction?",
    answer: "The basic information includes age, gender, blood pressure, cholesterol levels, and heart rate. Additional data such as family history, lifestyle factors, and existing medical conditions can improve prediction accuracy."
  }
];

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Find answers to common questions about HeartGuard's heart disease prediction platform.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Can't find what you're looking for?{' '}
          <a href="mailto:support@heartguard.com" className="text-primary-600 hover:text-primary-500">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}; 