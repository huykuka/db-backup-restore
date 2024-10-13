import { Toaster } from '@frontend/shared/components/ui/sonner';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/core/theme-provider';
import Layout from './components/layout';
import FileUpload from './components/manual-upload/manual-upload';
import Home from './routes/home';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manual" element={<FileUpload />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster
        position={'top-right'}
        closeButton
        visibleToasts={10}
        duration={2000}
      />
    </ThemeProvider>
  );
};

export default App;
