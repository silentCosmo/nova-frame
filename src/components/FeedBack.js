// components/FeedbackButton.js
"use client";
import { useState } from 'react';

export default function FeedbackButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                                    netlify
                                    name="feedback"/* 
                                    onSubmit={() => setIsSuccess(true)} */
                                    className="space-y-4 flex flex-col"
                                >
                                    <input type="hidden" name="form-name" value="feedback" />
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
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-3 px-4 rounded-md shadow-lg hover:from-sky-500 hover:to-indigo-700 transition duration-300 text-lg"
                                    >
                                        Send Us Your Feedback
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
