import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Loader, XCircleIcon } from "lucide-react";

import NavBar from "./components/NavBar";
import AppRouter from "./router/AppRouter";
import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from "./store/useChatStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
    const { fullScreenView, clearFullScreenView } = useChatStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (!isCheckingAuth && !authUser) {
        <div className='flex items-center justify-center h-screen'>
            <Loader
                className='animate-spin'
                size={48}
                color='#007bff'
            />
        </div>;
    }

    return (
        <div data-theme={theme}>
            <NavBar />
            {fullScreenView && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
                    <button
                        onClick={clearFullScreenView}
                        className='absolute top-4 right-4 text-white text-2xl font-bold px-3 py-1'>
                        <XCircleIcon className='size-8' />
                    </button>
                    <img
                        src={fullScreenView}
                        alt='Preview'
                        className='max-h-[90%] rounded-lg'
                    />
                </div>
            )}
            <AppRouter />
            <Toaster />
        </div>
    );
};

export default App;
