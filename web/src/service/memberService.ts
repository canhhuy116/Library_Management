class Members {
  public async getAll(): Promise<any> {
    const response = await fetch('../src/service/members.json');
    const data = await response.json();
    return data;
  }
}

export default new Members();
