import React from 'react';
import Toast from './Toast';
import useToastStore from '../store/ToastStore.js';

export default function ToastProvider() {
    const { toasts, removeToast } = useToastStore();

    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    open={true}
                    onClose={() => removeToast(toast.id)}
                    message={toast.message}
                    severity={toast.severity}
                    autoHideDuration={toast.autoHideDuration}
                />
            ))}
        </>
    );
}