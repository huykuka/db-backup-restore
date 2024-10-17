import { Login } from "@components/auth/login"
import FileUpload from "@components/core/file-upload"
import Home from "@components/home/home"
import Layout from "@components/layout"
import { authService, useAuth } from "@core/services/auth.service"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

export const RouteComponent = () => {
    useAuth()
    const { getState } = authService
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={getState().isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />

                {getState().isAuthenticated ? (
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/manual" element={<FileUpload />} />
                        {/* Catch-all route for authenticated users */}
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Route>
                ) : (
                    // If not authenticated, just show the Login page for the home route
                    <Route path="/" element={<Login />} />
                )}

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}