import './App.css'
import {ThemeProvider} from "./components/core/theme-provider.tsx";
import Layout from "./components/layout.tsx";
import Home from "./routes/home.tsx";
import {Route, Router, Routes} from "react-router-dom";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    )
}

export default App
