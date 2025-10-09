import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import { useAuthStore } from "../store/useAuthStore";

const AppRouter = () => {
    const { authUser } = useAuthStore();
    return (
        <Routes>
            <Route
                path='/'
                element={authUser && authUser.isVerified ? <HomePage /> : authUser && !authUser.isVerified ? <Navigate to='/verify-email' /> : <Navigate to='/login' />}
            />
            <Route
                path='/signup'
                element={!authUser ? <SignUpPage /> : <Navigate to='/login' />}
            />
            <Route
                path='/verify-email'
                element={<EmailVerificationPage />}
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
    );
};

export default AppRouter;
