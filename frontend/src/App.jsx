import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
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
            <Routes>
                <Route
                    path='/'
                    element={authUser ? <HomePage /> : <Navigate to='/login' />}
                />
                <Route
                    path='/signup'
                    element={!authUser ? <SignUpPage /> : <Navigate to='/' />}
                />
                <Route
                    path='/login'
                    element={!authUser ? <LoginPage /> : <Navigate to='/' />}
                />
                <Route
                    path='/settings'
                    element={<SettingsPage />}
                />
                <Route
                    path='/profile'
                    element={authUser ? <ProfilePage /> : <Navigate to='/' />}
                />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
