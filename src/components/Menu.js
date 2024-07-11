import React from 'react';
import Icon from './Icon';

const Menu = ({
    isOpen, onClose, selectedModel, setSelectedModel,
    useNovaSend, handleNovaSend, handleDeleteChat, models
}) => {
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={onClose}
                ></div>
            )}
            <div className={`fixed top-0 right-0 w-72 bg-slate-900 bg-opacity-65 backdrop-blur-xl text-slate-300 h-full shadow-lg z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
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
                        </div>
                        <hr className='border-slate-800 opacity-50 border-t my-6'/>
                        <div className='mb-6'>
                            <div className="flex items-center justify-between my-2">
                                <label className=" mr-2">EchoPrompt</label>
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
                    </div>
                    <div className="text-center text-gray-500 text-sm mt-4">
                        &copy; 2024 NovaChat
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
