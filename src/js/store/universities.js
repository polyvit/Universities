import api from "../services/apiService";

class Universities {
  constructor(api) {
    this.api = api;
    this.universities = {};
  }
  async init() {
    new Promise((resolve) => resolve(this.api.getAllData())).then(
      (response) => {
        response.forEach((data) => {
          this.universities[data.alpha_two_code] = data;
        });
      }
    );
  }
  async fetchUni(country) {
    const response = await this.api.universities(country);
    this.lastSearch = this.serializeUniversities(response);
  }
  serializeUniversities(universities) {
    return Object.values(universities).map((uni) => {
      return {
        ...uni,
        logo: `https://logo.clearbit.com/${uni.domains[0]}`,
      };
    });
  }
}

const universities = new Universities(api);

export default universities;

// {name: 'St. Petersburg State Institute of Technology (Technological University)', web_pages: ['http://www.gti.spb.ru/'], domains: ['gti.spb.ru']}
