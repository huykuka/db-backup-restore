import { LogInDto } from '@components/auth/login-form';
import { useZuStandStore } from '@core/hooks';
import {
  ACCESS_TOKEN,
  LocalStorageService,
} from '@core/services/local-storage.service';
import { apiClient } from './api-client.service';
import { GenericHTTPService } from './http-client.service';
import { ToastService } from './toast.service';

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
  public async login(data: LogInDto): Promise<void> {
    try {
      const response: any = await super.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const token = response.data.data.accessToken;
      if (token) {
        ToastService.success('Login successfully');
        this.setState('isAuthenticated', true);
        LocalStorageService.setItem(ACCESS_TOKEN, token);
      }
    } catch (err: any) {
      throw err; // Re-throw the error to be handled by the caller
    }
  }

  public async logout() {
    try {
    } catch (err: any) {
      console.error(err);
    } finally {
      this.setState('isAuthenticated', false);
      LocalStorageService.removeItem(ACCESS_TOKEN);
    }
  }

  public async validateToken() {
    try {
      const token = LocalStorageService.getItem(ACCESS_TOKEN);
      if (!token) {
        return;
      }
      const response = await apiClient.get('/auth/validate');
      const statusCode = response.status;
      if (statusCode == 200) {
        this.setState('isAuthenticated', true);
      }
    } catch (err: any) {
      LocalStorageService.removeItem(ACCESS_TOKEN);
      this.setState('isAuthenticated', false);
      throw err
    }
  }

  public setState(key: keyof AuthState, value: any) {
    useAuth.getState().setState(key, value);
  }

  public getState(): AuthState {
    return useAuth.getState().state;
  }
}

export const authService = new AuthService();
