import { Toaster } from '@frontend/shared/components/ui/sonner';
import { ThemeProvider } from './components/core/theme-provider';
import { RouteComponent } from './routes/route';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouteComponent />
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
