import { Login } from '@components/auth/login';
import ManualFileUpload from '@components/manual-upload/manual-upload';
import { authService } from '@core/services/auth.service';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AnimatedContent from './animated-route';
import Layout from '@components/layout';
import Home from '@components/home/home';


export const RouteComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { getState } = authService;

    useEffect(() => {
        const validateAuth = async () => {
            await authService.validateToken();
            setIsLoading(false);
        };
        validateAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or your preferred loading indicator
    }

    return (
        <BrowserRouter>
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

                <Route
                    element={
                        getState().isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
                    }
                >
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<AnimatedContent><Home /></AnimatedContent>} />
                    <Route path="/manual" element={<AnimatedContent><ManualFileUpload /></AnimatedContent>} />
                </Route>

                <Route path="*" element={<Navigate to={getState().isAuthenticated ? "/home" : "/login"} replace />} />
            </Routes>
        </BrowserRouter>
    );
};