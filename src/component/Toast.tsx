import { useEffect } from 'react';

const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
};

export interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`fixed left-1/2 top-[10%] -translate-x-1/2 z-50 px-10 py-3 rounded-md text-white shadow-lg ${typeStyles[type]}`}
        >
            {message}
        </div>

    );
}
