"use client";
import React, { useState, useRef } from 'react';
import { sendForm } from '@emailjs/browser';

export default function FeedbackButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null); 

    // Collect metadata
    const getMetadata = () => {
        const browserInfo = `${navigator.userAgent} on ${navigator.platform}`;
        const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const referrerUrl = document.referrer?document.referrer:'Direct Link';
        const userLanguage = navigator.language || navigator.userLanguage;
        const currentUrl = window.location.href;

        // Get the current date and time
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        return {
            browserInfo,
            deviceType,
            screenResolution,
            referrerUrl,
            userLanguage,
            currentUrl,
            date,
            time
        };
    };

    // Form Submit function
    const formSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const metadata = getMetadata();
        const formData = new FormData(formRef.current);

        // Append metadata to FormData
        Object.entries(metadata).forEach(([key, value]) => {
            formData.append(key, value);
        });

        sendForm('service_bedzlcp', 'template_817wj3s', formRef.current, 'LPR3sEr5mvcMMLSG2')  // Replace with your EmailJS Service ID, Template ID, and User ID
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
                setIsSuccess(true);
                setIsSubmitting(false);
                e.target.reset();
                
                // Send an auto-response to the user
                /* const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                send('service_bedzlcp', 'template_ocljhma', {
                    name: name,
                    email: email,
                    message: message,
                    ...metadata,
                }, 'LPR3sEr5mvcMMLSG2')  // Replace with your EmailJS Service ID, Template ID, and User ID for the auto-response
                    .then((result) => {
                        console.log('AUTO-RESPONSE SUCCESS!', result.status, result.text);
                    }, (error) => {
                        console.log('AUTO-RESPONSE FAILED...', error);
                    }); */

            }, (error) => {
                console.log('FAILED...', error);
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-2 px-4 rounded-md shadow-lg hover:from-teal-700 hover:to-teal-900 transition duration-300 animate-fade-in"
            >
                Send Us Your Feedback
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-slate-900 p-8 rounded-md shadow-lg max-w-sm mx-4 relative backdrop-blur-xl bg-opacity-50">
                        <button
                            onClick={() => {
                                setIsPopupOpen(false);
                                setIsSuccess(false); // Reset success state
                            }}
                            className="absolute top-4 right-5 text-gray-400 hover:text-gray-200 transition duration-300"
                        >
                            ✕
                        </button>
                        {!isSuccess ? (
                            <>
                                <h2 className="text-xl font-bold mb-4 text-center text-white">Let’s Connect</h2>
                                <form
                                    ref={formRef}  // Set the ref here
                                    onSubmit={formSubmit}
                                    className="space-y-4 flex flex-col"
                                >
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            required
                                            className="w-full p-3 bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 text-lg focus:border-sky-600 focus:outline-none transition duration-300"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            required
                                            className="w-full p-3 bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 text-lg focus:border-sky-600 focus:outline-none transition duration-300"
                                        />
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            required
                                            className="w-full resize-y p-3 bg-transparent border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 text-lg focus:border-sky-600 focus:outline-none transition duration-300"
                                            rows={3}
                                        />
                                    </div>
                                    {/* Hidden metadata fields */}
                                    <input type="hidden" name="browserInfo" value={getMetadata().browserInfo} />
                                    <input type="hidden" name="deviceType" value={getMetadata().deviceType} />
                                    <input type="hidden" name="screenResolution" value={getMetadata().screenResolution} />
                                    <input type="hidden" name="referrerUrl" value={getMetadata().referrerUrl} />
                                    <input type="hidden" name="userLanguage" value={getMetadata().userLanguage} />
                                    <input type="hidden" name="currentUrl" value={getMetadata().currentUrl} />
                                    <input type="hidden" name="date" value={getMetadata().date} />
                                    <input type="hidden" name="time" value={getMetadata().time} />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-3 px-4 rounded-md shadow-lg hover:from-sky-500 hover:to-indigo-700 transition duration-300 text-lg"
                                        disabled={isSubmitting} // Disable button when submitting
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner"/><span className='animate-pulse'>Submitting...</span>
                                            </>
                                        ) : (
                                            'Send Us Your Feedback'
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-xl font-bold mb-4 text-green-500">Thank You!</h2>
                                <p className="mb-4 text-white">Your feedback has been received. We appreciate your input!</p>
                                <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-2 px-4 rounded-md shadow-lg hover:from-teal-700 hover:to-teal-900 transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
