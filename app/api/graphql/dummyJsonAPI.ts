import { RESTDataSource } from 'apollo-datasource-rest';
import { DataSourceConfig } from 'apollo-datasource';

class DummyJsonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dummyjson.com/';
    this.initialize({} as DataSourceConfig<any>); 
  }

  async getUsers(limit: number = 10, offset: number = 0) {
    const data = await this.get(`/users/?limit=${limit}&skip=${offset * limit}`);
    return data.users;
  }

  async getUser(id: string) {
    const data = await this.get(`/users/${id}`);
    return data;
  }

  async getPosts(limit: number = 10, offset: number = 0) {
    const data = await this.get(`/posts?limit=${limit}&skip=${offset * limit}`);
    return data.posts;
  }

  async getPost(id: string) {
    const data = await this.get(`/posts/${id}`);
    return data;
  }
}

export default DummyJsonAPI;
