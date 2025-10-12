import axios from "axios";

export class HttpClient {
  constructor(baseURL = "") {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      validateStatus: (status) => status >= 200 && status < 600,
    });
  }

  async request(config) {
    const startTime = Date.now();

    try {
      const response = await this.client.request(config);
      const endTime = Date.now();

      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        time: endTime - startTime,
      };
    } catch (error) {
      const endTime = Date.now();

      if (error.response) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          data: error.response.data,
          time: endTime - startTime,
        };
      }

      return {
        status: 0,
        statusText: "Error",
        headers: {},
        data: { error: error.message },
        time: endTime - startTime,
      };
    }
  }
}

export default HttpClient;
