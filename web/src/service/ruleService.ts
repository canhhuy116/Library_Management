import http from './httpService';

class RuleService {
  public async getAll(): Promise<any> {
    const response = await http.get('/rule');
    return response.data;
  }
}

export default new RuleService();
