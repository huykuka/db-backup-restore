import { LogInDto } from '@components/auth/login-form';
import { useZuStandStore } from '@core/hooks';
import { GenericHTTPService } from './http-client.service';
import { toastService } from './toast.service';

export interface AuthState {
  isAuthenticated: boolean;
  user?: {
    name?: string;
    role?: string;
  };
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
};
// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAuth = useZuStandStore(authInitialState);

class AuthService extends GenericHTTPService {
  public async login(data: LogInDto) {
    try {
      const response: any = await super.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      toastService.success('Login successfully');
      this.setState('isAuthenticated', true);
      localStorage.setItem('accessToken', response.data.data.accessToken);
    } catch (err: any) {}
  }

  public logout() {}

  public setState(key: keyof AuthState, value: any) {
    useAuth.getState().setState(key, value);
  }

  public resetState() {
    useAuth.getState().reset();
  }

  public getState(): AuthState {
    return useAuth.getState().state;
  }
}

export const authService = new AuthService();
