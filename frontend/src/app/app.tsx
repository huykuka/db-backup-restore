import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./routes/home";
import {ThemeProvider} from "./components/core/theme-provider";
import Layout from "./components/layout";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'


const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;