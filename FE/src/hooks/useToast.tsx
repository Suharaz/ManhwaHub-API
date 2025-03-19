import { toast, ToastOptions } from 'react-toastify';

const useToast = () => {
    const showToast = (message: string, options?: ToastOptions) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            ...options
        });
    };

    return { showToast };
};

export default useToast;
