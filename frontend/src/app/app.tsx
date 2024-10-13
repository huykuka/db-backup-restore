import { Toaster } from '@frontend/shared/components/ui/sonner';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/core/theme-provider';
import Layout from './components/layout';
import Home from './routes/home';

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
      <Toaster
        position={'top-right'}
        visibleToasts={10}
        duration={10000}
        
      />
    </ThemeProvider>
  );
};

export default App;
