import { Login } from "@components/auth/login";
import Home from "@components/home/home";
import Layout from "@components/layout";
import ManualFileUpload from "@components/manual-upload/manual-upload";
import { authService, useAuth } from "@core/services/auth.service";
import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AnimatedContent from './animated-route';

export const RouteComponent = () => {
    useAuth();

    return (
        <HashRouter>
            <InnerRoutes />
        </HashRouter>
    );
};

const InnerRoutes = () => {
    const navigate = useNavigate();
    const { getState } = authService;
    useEffect(() => {
        authService.validateToken()
            .catch(() => {
                navigate('/login', { replace: true });
            });
    }, []);

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    getState().isAuthenticated ? (
                        <Navigate to="/home" replace />
                    ) : (
                        <AnimatedContent><Login /></AnimatedContent>
                    )
                }
            />
            {getState().isAuthenticated ? (
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<AnimatedContent><Home /></AnimatedContent>} />
                    <Route path="/manual" element={<AnimatedContent><ManualFileUpload /></AnimatedContent>} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Route>
            ) : (
                <Route path="/" element={<Login />} />
            )}


            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes >
    );
};