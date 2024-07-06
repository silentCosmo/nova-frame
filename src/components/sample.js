"use client";
import React, { useState, useRef, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.NEXT_PUBLIC_HF_API_KEY);

const models = [
    { label: 'Select Model', value: 'openai/gpt-3.5-turbo' },
    { label: 'Phim', value: 'microsoft/Phi-3-mini-4k-instruct' },
    { label: 'Mist', value: 'mistralai/Mistral-7B-Instruct-v0.3' }
];

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { type: 'ai', content: "This service is under development 👩🏻‍💻, so you might encounter some bugs 🐞, Feel free to choose any model from above and start testing!😊 \n\n\n~silentCosmo" },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [selectedModel, setSelectedModel] = useState(models[0].value);
    const [typingMessage, setTypingMessage] = useState('');
    const responseTextRef = useRef('');
    const messagesEndRef = useRef(null);

    // Scroll to bottom of messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Typewriter effect with manual animation control
    const animateTyping = async (message) => {
        for (let i = 0; i <= message.length; i++) {
            setTypingMessage(message.substring(0, i));
            scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 50)); // Adjust typing speed here
        }
        setMessages(prevMessages => [...prevMessages, { type: 'ai', content: message }]);
        setTypingMessage('');
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newMessage = { type: 'user', content: inputValue };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputValue('');

        try {
            const responseStream = inference.chatCompletionStream({
                model: selectedModel,
                messages: [{ role: 'user', content: inputValue }],
                max_tokens: 500,
            });

            responseTextRef.current = ''; // Initialize response text reference

            for await (const chunk of responseStream) {
                const textChunk = chunk.choices[0]?.delta?.content || '';
                responseTextRef.current += textChunk;
                setTypingMessage(responseTextRef.current);
                scrollToBottom();
            }

            await animateTyping(responseTextRef.current);
        } catch (error) {
            console.error("Error fetching response from Hugging Face API:", error);
            await animateTyping("Sorry, something went wrong. Please try again. Go is SaaS Business boilerplate and starter kit template specifically crafted for SaaS businesses and startups. It is perfectly tailored for SaaS startups, apps, businesses, and more. With a premium design and essential UI components and pages, it offers everything you need to start a feature-rich business website with SaaS features.Built with Latest Technologies and High-quality modern designThis is perfect for business, startups, SaaS companies, and more. Built-with latest Next.js & React and offers essential UI components, authentication and database integration, and Stripe integration. Its superior design and functionality make it the first choice for launching a feature-rich SaaS business website efficiently.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen pt-16 pb-20 text-slate-400 tracking-[0.02em] flex justify-center bg-gray-900 overflow-hidden">
            <main className="flex flex-col justify-between h-full w-full md:w-4/6">
                <div className="justify-center flex mb-2">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="bg-slate-800 text-white p-2 rounded focus:outline-none focus:border-slate-700 focus:border"
                    >
                        {models.map((model) => (
                            <option key={model.value} value={model.value}>
                                {model.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div id="messagesContainer" className="flex-1 overflow-y-auto md:px-10 px-2" style={{ maxHeight: '70vh' }}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-xl mb-2 ${message.type === 'user' ? 'rounded-tr-none w-fit bg-gradient-to-bl from-slate-900 via-slate-900 to-sky-950' : 'rounded-tl-none bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950'} ${message.type === 'user' ? 'ml-5' : 'mr-5'}`}
                            >
                                {message.content.split("\n").map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                                {message.options && (
                                    <div className="mt-2">
                                        {message.options.map((option, i) => (
                                            <button key={i} className="bg-gray-600 p-1 m-1 rounded">{option}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {typingMessage && (
                        <div className="flex justify-start">
                            <div className="p-3 rounded-xl mb-2 rounded-tl-none bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 mr-5">
                                <p>{typingMessage}</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="mt-20" />
                </div>

                <div className="bg-gray-900 fixed w-full md:w-4/6 bottom-0 p-4">
                    <div className="flex items-center">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your prompt or question here."
                            className="bg-slate-800 text-white p-2 rounded flex-1 focus:outline"
                        />
                        <button onClick={handleSend} disabled={!inputValue.trim()} className="bg-gradient-to-tr from-fuchsia-950 to-sky-800 text-slate-400 p-2 ml-2 rounded active:scale-95 active:bg-gradient-to-br">
                            Send
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatInterface;
