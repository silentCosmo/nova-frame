"use client";
import React, { useState, useRef, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Modal from './Modal';
import Icon from './Icon';
import Menu from './Menu';

const inference = new HfInference(process.env.NEXT_PUBLIC_HF_API_TOKEN);

const models = [
    { label: 'Cosmo', value: 'HuggingFaceH4/zephyr-7b-alpha' },
    { label: 'miPhi', value: 'microsoft/Phi-3-mini-4k-instruct' },
    { label: 'Mist', value: 'mistralai/Mistral-7B-Instruct-v0.3' }
];

const welcomeMessage = [
    { type: 'ai', content: "This project is under development 👩🏻‍💻, so you might encounter some bugs 🐞. Feel free to choose any model from above and start interactions with AI! 😊" },
    { type: 'ai', content: "~silentCosmo" },
];

const ChatInterface = () => {
    const [messages, setMessages] = useState(() => {
        const storedMessages = typeof window !== 'undefined' && localStorage.getItem('chatMessages');
        return storedMessages ? JSON.parse(storedMessages) : welcomeMessage;
    });
    const [selectedModel, setSelectedModel] = useState(() => {
        const storedModel = typeof window !== 'undefined' && localStorage.getItem('chatModel');
        return storedModel ? JSON.parse(storedModel) : models[0].value;
    });
    const [inputValue, setInputValue] = useState('');
    const [typingMessage, setTypingMessage] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [isInCodeBlock, setIsInCodeBlock] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [useNovaSend, setUseNovaSend] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        const handleScroll = () => {
            //console.log('Scrolling...'); // Check if function is called
            if (messagesContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
                //console.log('scrollTop:', scrollTop, 'scrollHeight:', scrollHeight, 'clientHeight:', clientHeight); // Debugging log
                if (scrollHeight - scrollTop > clientHeight + 100) {
                    setShowScrollButton(true);
                } else {
                    setShowScrollButton(false);
                }
            }
        };

        if (messagesContainerRef.current) {
            //console.log('Adding event listener'); // Ensure event listener is added
            messagesContainerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (messagesContainerRef.current) {
                //console.log('Removing event listener'); // Ensure event listener is removed
                messagesContainerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('chatModel', JSON.stringify(selectedModel))
    }, [selectedModel]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        let promptContent = inputValue;

        if (inputValue.startsWith('@')) {
            // Remove the '@' and set the prompt for image generation
            promptContent = `Give a prompt for creating an image of: ${inputValue.slice(1)}`;
        }

        const newMessage = { type: 'user', content: inputValue };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputValue('');

        const messagesToSend = [
            ...messages,
            newMessage
        ].map(message => ({
            role: message.type === 'user' ? 'user' : 'assistant',
            content: message.content
        }));

        try {
            console.log('nv' + useNovaSend);
            const responseStream = inference.chatCompletionStream({
                model: selectedModel,
                messages: useNovaSend ? messagesToSend : [{ role: 'user', content: promptContent }],
                max_tokens: 1000,
            });

            let responseText = '';
            let codeBlockOpen = false;

            for await (const chunk of responseStream) {
                const textChunk = chunk.choices[0]?.delta?.content || '';
                responseText += textChunk;

                scrollToBottom();

                const codeBlockMatches = textChunk.match(/```/g);
                if (codeBlockMatches) {
                    codeBlockOpen = (codeBlockMatches.length % 2 !== 0) ? !codeBlockOpen : codeBlockOpen;
                }

                setTypingMessage(responseText);
                setIsInCodeBlock(codeBlockOpen);
                scrollToBottom();
            }

            setMessages(prevMessages => [...prevMessages, { type: 'ai', content: responseText }]);
            scrollToBottom();
            setTypingMessage('');
            setIsInCodeBlock(false);
        } catch (error) {
            console.error("Error fetching response from Hugging Face API:", error);
            setMessages(prevMessages => [...prevMessages, { type: 'ai', content: "Sorry, something went wrong." }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleDeleteChat = () => {
        setShowDeleteModal(true);
    };
    const confirmDeleteChat = () => {
        setMessages(welcomeMessage);
        localStorage.removeItem('chatMessages');
        setShowDeleteModal(false); // Close the modal
    };

    const renderMessageContent = (content, isInCodeBlock, isAIMessage) => {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        let elements = [];
        let lastIndex = 0;

        let result;
        while ((result = codeBlockRegex.exec(content)) !== null) {
            const [fullMatch, language, codeContent] = result;

            if (result.index > lastIndex) {
                elements.push(
                    <p key={lastIndex} className="mb-2 whitespace-pre-wrap">{content.substring(lastIndex, result.index)}</p>
                );
            }

            elements.push(
                <div key={result.index} className='max-w-[90vw] md:max-w-[60vw] overflow-x-auto bg-slate-800 rounded-md pt-1 mb-2'>
                    <span className='ml-3 text-sm text-slate-400'>{language}</span>
                    <SyntaxHighlighter language={language || 'text'} style={coldarkDark} wrapLongLines={true} className="overflow-x-auto">
                        {codeContent}
                    </SyntaxHighlighter>
                </div>
            );

            lastIndex = codeBlockRegex.lastIndex;
        }

        if (lastIndex < content.length) {
            const remainingContent = content.substring(lastIndex);
            if (isInCodeBlock) {
                elements.push(
                    <SyntaxHighlighter key={lastIndex} language="text" style={coldarkDark} wrapLongLines={true} className="overflow-x-auto">
                        {remainingContent}
                    </SyntaxHighlighter>
                );
            } else {
                elements.push(
                    <p key={lastIndex} className="mb-2 whitespace-pre-wrap">{remainingContent}</p>
                );
            }
        }

        return <>{elements}{isAIMessage && content && !isInCodeBlock && (
            <>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(content);
                        //alert("Copied to clipboard!");
                    }}
                    className="bg-slate-950 bg-opacity-30 text-slate-500 active:text-slate-300 active:scale-95 p-2 rounded-tl-xl -mt-2 -mb-3 -mr-3 w-fit ml-auto"
                >
                    <Icon name="copy" />
                </button>
            </>
        )}</>;
    };

    const handleNovaSend = () => {
        setUseNovaSend((useNovaSend) => !useNovaSend);
    }

    return (
        <div className="pt-14 pb-20 text-slate-400 tracking-[0.02em] flex justify-center overflow-hidden">
            <header className="bg-slate-900 bg-opacity-50 backdrop-blur-md justify-between flex fixed top-0 left-0 right-0 md:px-10 py-1 px-2">
                <button className='bg-gradient-to-tr from-fuchsia-500 to-sky-500 bg-clip-text text-transparent opacity-80 font-bold text-2xl ml-3 my-2'>NovaChat</button>
                <button
                    className="b-gradient-to-tr from-fuchsia-950 to-sky-800 text-indigo-400 my-2 rounded active:scale-75 shadow-md"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Icon name="menu" className='size-7' />
                </button>
                
                {/* <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-inherit bg-opacity-50 backdrop-blur-md font-semibold p-2 rounded-md my-2 focus:outline-none text-center"
                >
                    {models.map((model) => (
                        <option key={model.value} value={model.value}>
                            {model.label}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleNovaSend}
                    className="rose-500 text-sky-400 opacity-50 p-1 my- rounded-md ml-2"
                >
                    {useNovaSend ? 'cEm' : 'cSm'}
                </button>
                <button
                    onClick={handleDeleteChat}
                    className="rose-500 text-rose-400 opacity-50 p-1 my- rounded-md ml-2"
                >
                    Reset
                </button> */}
            </header>
            <main className="flex flex-col justify-between w-full pt-1">
                <div id="messagesContainer" ref={messagesContainerRef} className="flex-1 overflow-y-auto md:px-[30%] max-h-[calc(100vh-10rem)] px-2 ">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 flex flex-col rounded-xl mb-2 max-w-[calc(100vw)] overflow-x-auto ${message.type === 'user' ? 'rounded-tr-none w-fit bg-gradient-to-bl from-slate-900 via-slate-900 to-sky-950' : 'rounded-tl-none bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950'} ${message.type === 'user' ? 'ml-5' : 'mr-5'}`}
                            >
                                {renderMessageContent(message.content, isInCodeBlock, message.type === 'ai')}
                                {message.options && (
                                    <div className="flex flex-wrap mt-2">
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
                                {renderMessageContent(typingMessage, isInCodeBlock)}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className={` ${typingMessage ? "mt-[calc(100vh-9rem)]" : "mt-4"}`} />
                </div>

                {showScrollButton && (
                    <div className='fixed bottom-28 right-0 left-0 flex justify-center'>
                        <button
                            onClick={scrollToBottom}
                            className="bg-opacity-0 backdrop-blur-sm bg-gradient-to-tr active:bg-gradient-to-br from-fuchsia-950 to-sky-800 text-white text-opacity-30 p-1 active:p-0 rounded-full shadow-lg"
                        >
                            <Icon name="scrollDown" className="size-8" />
                        </button>
                    </div>
                )}
                <div className='fixed w-full md:px-[30%] bottom-0 md:bottom-4'>
                    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-4 md:rounded-lg md:p-3">
                        <div className="flex items-center">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter your prompt or question here."
                                className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-2 rounded flex-1 focus:outline"
                            />
                            <button onClick={handleSend} disabled={!inputValue.trim() || typingMessage} className="bg-gradient-to-tr from-fuchsia-950 to-sky-800 text-slate-400 p-2 ml-2 rounded active:scale-95 active:bg-gradient-to-br">
                                <Icon name="send" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
                <Menu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    useNovaSend={useNovaSend}
                    handleNovaSend={() => setUseNovaSend(prev => !prev)}
                    handleDeleteChat={handleDeleteChat}
                    models={models}
                />
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteChat}
                title="Confirm Reset"
            >
                <p>Are you sure you want to delete all the chat history?</p>
            </Modal>
        </div>
    );
};

export default ChatInterface;
