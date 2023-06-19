class AuthService {
  public async login(): Promise<any> {
    const response = await fetch('../src/service/auth.json');
    const data = await response.json();
    return data;
  }

  public async signup(): Promise<any> {
    return;
  }
}

export default new AuthService();
