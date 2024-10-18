import { LogInDto } from '@components/auth/login-form';
import { useZuStandStore } from '@core/hooks';
import {
  ACCESS_TOKEN,
  LocalStorageService,
} from '@core/services/local-storage.service';
import { apiClient } from './api-client.service';
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
      const token = response.data.data.accessToken;
      if (token) {
        toastService.success('Login successfully');
        this.setState('isAuthenticated', true);
        LocalStorageService.setItem(ACCESS_TOKEN, token);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  public logout() {
    console.log('logout');
  }

  public async validateToken() {
    try {
      const response = await apiClient.get('/auth/validate');
      const statusCode = response.status;
      if (statusCode == 200) {
        this.setState('isAuthenticated', true);
      }
    } catch (err: any) {
      console.error(err);
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
