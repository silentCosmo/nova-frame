import React, { useState, useRef } from 'react';
import Icon from './Icon';
import { sendForm } from '@emailjs/browser';

const Menu = ({
    isOpen, onClose, selectedModel, setSelectedModel,
    useNovaSend, handleNovaSend, handleDeleteChat, models
}) => {
    const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef(null);

    const getMetadata = () => {
        const browserInfo = `${navigator.userAgent} on ${navigator.platform}`;
        const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const referrerUrl = document.referrer ? document.referrer : 'Direct Link';
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

    const formSubmit = (e) => {
        e.preventDefault();
        if (e.target.message.value.length==0) return;
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
                setIsFeedbackFormOpen(false);
                
            }, (error) => {
                console.log('FAILED...', error);
                setIsSubmitting(false);
            });
    };

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={onClose}
                ></div>
            )}
            <div className={`fixed top-0 right-0 w-72 overflow-auto bg-slate-900 bg-opacity-65 backdrop-blur-md text-slate-300 h-full shadow-lg z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="p-4 flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <button onClick={onClose} className="text-white">
                            <Icon name="scrollDown" className='-rotate-90 size-6 active:translate-x-4 text-slate-500' />
                        </button>
                    </div>
                    <hr className='border-slate-800 opacity-40 border-t mb-5' />
                    <div className="flex-grow">
                        <div className="mb-6">
                            <label className="block mb-2" htmlFor="model-select">Select Model</label>
                            <div className="flex space-x-4">
                                {models.map((model) => (
                                    <div
                                        key={model.value}
                                        onClick={() => setSelectedModel(model.value)}
                                        className={`cursor-pointer p-2 rounded-md ${selectedModel === model.value ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-gray-300'} flex-grow flex items-center justify-center hover:bg-indigo-500`}
                                    >
                                        {model.label}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Choose the model that best suits your needs. Models vary in complexity and capabilities.
                            </p>
                        </div>
                        <hr className='border-slate-800 opacity-50 border-t my-6'/>
                        <div className='mb-6'>
                            <div className="flex items-center justify-between my-2">
                                <label className="mr-2">EchoPrompt</label>
                                <button
                                    onClick={handleNovaSend}
                                    className={`w-12 h-6 rounded-full ${useNovaSend ? 'bg-indigo-800' : 'bg-gray-600'} relative focus:outline-none`}
                                >
                                    <div className={`w-6 h-6 rounded-full transform transition-transform ${useNovaSend ? 'translate-x-full bg-indigo-500' : 'bg-slate-500'}`}></div>
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">
                                Remember previous conversations for a more coherent response. (experimental)
                            </p>
                        </div>
                        <hr className='border-slate-800 opacity-50 border-t my-6' />
                        <div className='mb-6'>
                            <div className="flex items-center justify-between my-2">
                                <label className="mr-2">Dark Mode</label>
                                <button
                                    onClick={null}
                                    className={`w-12 h-6 rounded-full ${1 === 1 ? 'bg-indigo-800' : 'bg-gray-600'} relative focus:outline-none`}
                                >
                                    <div className={`w-6 h-6 rounded-full transform transition-transform ${1 === 1 ? 'translate-x-full bg-indigo-500' : 'bg-slate-500'}`}></div>
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">
                                Toggle between dark and light mode.
                            </p>
                        </div>
                        <hr className='border-slate-800 opacity-50 border-t my-6' />
                        <div className="mb-4 flex items-center justify-between">
                            <label className="block mb-2">Reset Chat</label>
                            <button
                                onClick={handleDeleteChat}
                                className="p-2 text-pink-800 hover:text-pink-700 hover:scale-110 rounded-md"
                            >
                                <Icon name='delete' className='size-5' />
                            </button>
                        </div>
                        <hr className='border-slate-800 opacity-50 border-t my-6' />
                        <div className="mb-4">
                            <label className="block mb-2">Feedback / Report Bug</label>
                            {isFeedbackFormOpen ? (
                                <form
                                    onSubmit={formSubmit}
                                    ref={formRef}
                                    className="space-y-2 flex flex-col"
                                >
                                    <input
                                        name="name"
                                        className="w-full p-2 bg-slate-800 text-white rounded-md text-base focus:outline-none"
                                        placeholder=" Your Name"
                                    />
                                    <textarea
                                        name="message"
                                        className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none"
                                        placeholder="Enter your feedback or report a bug"
                                    />
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
                                        disabled={isSubmitting}
                                        className={`text-base w-full py-2 px-4 ${isSubmitting ? 'bg-gray-600' : 'bg-indigo-900 active:bg-indigo-700 hover:bg-indigo-800'} text-white rounded-md`}
                                    >
                                        {isSubmitting ? <><span className="spinner"/>Submitting...</> : 'Submit'}
                                    </button>
                                </form>
                            ) : (
                                <button
                                onClick={() => setIsFeedbackFormOpen(true)}
                                className="block w-full text-center py-2 px-4 bg-indigo-900 hover:bg-indigo-800 rounded-md"
                                >
                                    Provide Feedback
                                </button>
                            )}
                        </div>
                            {isSuccess && <p className="text-teal-500">Feedback submitted successfully!</p>}
                    </div>
                    <div className="text-center text-gray-500 text-sm mt-4 pb-4">
                        &copy; 2024 NovaChat
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
