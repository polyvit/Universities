import axios from "axios";
import config from "../config/apiConfig";
// import worldData from "countries-state-city-dropdown";

export class Api {
  constructor(config) {
    this.url = config.url;
    this.logoUrl = config.logo;
  }
  async getAllData() {
    try {
      const response = await axios.get(`${this.url}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async countries() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async universities(country) {
    try {
      const response = await axios.get(`${this.url}&country=${country}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
