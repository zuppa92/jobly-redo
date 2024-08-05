// src/api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCurrentUser() {
    let res = await this.request('users/me');
    return res.user;
  }

  static async register(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  static async getCompanies(name) {
    let res = await this.request('companies', { name });
    return res.companies;
  }

  static async getJobs(title) {
    let res = await this.request('jobs', { title });
    return res.jobs;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
}

export default JoblyApi;