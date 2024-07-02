// components/FAQ.js
"use client"

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/FAQ.css'; // Import the CSS file for transitions

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is NovaFrame?",
            answer: "NovaFrame is an AI-powered image generator that helps you create stunning visuals from text prompts."
        },
        {
            question: "How does NovaFrame work?",
            answer: "NovaFrame uses advanced AI models to generate images based on the text descriptions you provide. Simply enter a prompt, select an engine, and generate your image."
        },
        {
            question: "What are the different engines available?",
            answer: "We offer three engines: NovaLite, NovaBlend, and NovaElite. Each engine offers different levels of quality and performance."
        },
        {
            question: "How can I download my generated images?",
            answer: "Once an image is generated, you can download it directly from the app by clicking the 'Download Image' button."
        },
        {
            question: "Can I share the generated images on social media?",
            answer: "Yes, you can share your generated images on social media platforms directly from the app."
        },
        {
            question: "Is there a limit to the number of images I can generate?",
            answer: "There is no limit to the number of images you can generate. However, the number of free generations may be limited based on your subscription plan."
          },
          /* {
            question: "What file formats are supported for download?",
            answer: "Currently, you can download your generated images in PNG and JPEG formats."
          }, */
          {
            question: "Do I own the rights to the images I generate?",
            answer: "Yes, you own the rights to the images you generate. You can use them for personal or commercial purposes without any restrictions."
          },
          {
            question: "How accurate are the AI-generated images?",
            answer: "The accuracy of the AI-generated images depends on the complexity of the prompt and the engine used. Our advanced engines, like NovaBlend and NovaElite, offer higher accuracy and better quality."
          },
          {
            question: "Can I request custom features or improvements?",
            answer: "We welcome feedback and suggestions from our users. You can contact our support team with your requests, and we will consider them for future updates."
          },
          {
            question: "How do I install the NovaFrame web app on my device?",
            answer: "To install NovaFrame as a Progressive Web App (PWA) on your device, follow these instructions:<br><br><strong>Desktop:</strong><br>1. Open the NovaFrame web app in your Chrome or Edge browser.<br>2. Click on the three dots menu in the upper-right corner of the browser window.<br>3. Select 'Install NovaFrame' from the menu.<br>4. Follow the on-screen instructions to complete the installation.<br><br><strong>Mobile:</strong><br>1. Open the NovaFrame web app in your Chrome browser on Android or Safari browser on iOS.<br>2. Tap the share icon (iOS) or the three dots menu (Android).<br>3. Select 'Add to Home Screen' from the menu.<br>4. Follow the on-screen instructions to complete the installation."
          },
        // Add more FAQs as needed
    ];

    return (
        <div className='md:px-28 px-6'>
            <div className="bg-slate-900 bg-opacity-40 backdrop-blur-lg md:p-8 p-6 rounded-lg mt-8 mb-12 shadow-lg shadow-slate-950">
                <h2 className="text-2xl font-bold text-slate-200 mb-4">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="text-left w-full text-slate-200 font-semibold focus:outline-none flex justify-between items-center"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="ml-2">{openIndex === index ? '-' : '+'}</span>
                        </button>
                        <CSSTransition
                            in={openIndex === index}
                            timeout={300}
                            classNames="faq"
                            unmountOnExit
                        >
                            <p className="text-slate-300 leading-6 text-sm mt-2"  dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                        </CSSTransition>
                        {index < faqs.length - 1 && <hr className="border-gray-600 mt-4" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
