import { Login } from "@components/auth/login";
import Home from "@components/home/home";
import Layout from "@components/layout";
import ManualFileUpload from "@components/manual-upload/manual-upload";
import { authService, useAuth } from "@core/services/auth.service";
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AnimatedContent from './animated-route';

export const RouteComponent = () => {
    useAuth();
    const { getState } = authService;

    useEffect(() => {
        authService.validateToken();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        getState().isAuthenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <Login />
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
            </Routes>
        </BrowserRouter>
    );
};