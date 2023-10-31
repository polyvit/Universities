import api from "../services/apiService";

export class Locations {
  constructor(api) {
    this.api = api;
    this.countries = {};
    this.shortCountriesList = {};
  }
  async init() {
    new Promise((resolve) => resolve(this.api.countries())).then((response) => {
      response.forEach((country) => {
        this.countries[country.name.common] = country;
        this.shortCountriesList[country.name.common] = country.flags.png;
        return this.countries;
      });
    });
  }
  getCountryCode(country) {
    return this.countries[country]?.cca2;
  }
}

const locations = new Locations(api);

export default locations;
