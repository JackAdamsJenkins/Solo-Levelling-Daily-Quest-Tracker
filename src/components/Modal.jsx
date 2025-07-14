import React from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="system-window modal-content w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl glow-text">{title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="max-w-none text-gray-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
