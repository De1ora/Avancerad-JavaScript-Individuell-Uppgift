import { create } from 'zustand'

const useToastStore = create((set) => ({
    toasts: [],

    addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, {
            id: Date.now() + Math.random(),
            message: toast.message,
            severity: toast.severity || 'success',
            autoHideDuration: toast.autoHideDuration || 5000,
            ...toast
        }]
    })),

    removeToast: (toastId) => set((state) => ({
        toasts: state.toasts.filter(toast => toast.id !== toastId)
    })),

    clearToasts: () => set({ toasts: []})
}));

export default useToastStore;