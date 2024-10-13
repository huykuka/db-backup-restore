import { GenericHTTPService } from './http-client.service';

class HealthService extends GenericHTTPService {
  public async getDatabaseHealth() {
    return await this.get('/health/database');
  }
}

export const healthService = new HealthService();
