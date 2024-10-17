import { useZuStandStore } from '@core/hooks';
import { GenericHTTPService } from './http-client.service';

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
  public login() {}

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
