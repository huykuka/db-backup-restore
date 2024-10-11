import { GenericHTTPService } from './http-client.services';
import { toast } from 'sonner';

class HealthService extends GenericHTTPService {
  public async getDatabaseHealth() {
    return await this.get('/health/database');
  }
}

const healthService = new HealthService();
export default healthService;
