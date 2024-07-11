import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
            <div className="relative bg-slate-900 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg md:max-w-sm max-w-xs mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
                <div className="mb-4">
                    {children}
                </div>
                <div className="flex justify-around">
                    <button
                        onClick={onConfirm}
                        className="bg-pink-800 text-slate-300 py-2 px-4 rounded-md hover:bg-pink-900 focus:outline-none"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-slate-600 text-slate-300 py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
