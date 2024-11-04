import { ModeToggle } from '../core/mode-toggle';
import { authService } from '../../core/services/auth.service';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { LogInDto, LoginForm } from './login-form';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const handleLogin = async (data: LogInDto) => {
    await authService
      .login(data)
      .then(() => navigate('/home', { replace: true }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="fixed top-0 right-0 m-2">
        <ModeToggle></ModeToggle>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Database Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onLogin={handleLogin} />
        </CardContent>
      </Card>
    </div>
  );
}
