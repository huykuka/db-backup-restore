import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./routes/home";
import {ThemeProvider} from "./components/core/theme-provider";
import Layout from "./components/layout";
import {Toaster} from "@frontend/shared/components/ui/sonner";


const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </Layout>
            </Router>
            <Toaster/>
        </ThemeProvider>
    );
};

export default App;