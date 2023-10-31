import locationsInstance, { Locations } from "../locations";
import api, { Api } from "../../services/apiService";

const countries = [
  {
    name: { common: "Russia", official: "Russian Federation" },
    cca2: "RU",
  },
];

jest.mock("../../services/apiService", () => {
  const mockApi = {
    countries: jest.fn(() =>
      Promise.resolve([
        {
          name: { common: "Russia", official: "Russian Federation" },
          cca2: "RU",
        },
      ])
    ),
  };
  return {
    Api: jest.fn(() => mockApi),
  };
});

const apiService = new Api();

describe("Locations test", () => {
  beforeEach(() => {
    locationsInstance.countries = {
      Russia: {
        name: { common: "Russia", official: "Russian Federation" },
        cca2: "RU",
      },
    };
  });

  it("Check that locationInstance is an instance of Locations", () => {
    expect(locationsInstance).toBeInstanceOf(Locations);
  });
  it("Check that Locations instance is created successfully", () => {
    const instance = new Locations(api);
    expect(instance.countries).toEqual({});
    expect(instance.shortCountriesList).toEqual({});
  });
  it("Check getCountryCode", () => {
    const res = locationsInstance.getCountryCode("Russia");
    expect(res).toBe("RU");
  });
  it("Check getCountryCode with incorrect data", () => {
    const res = locationsInstance.getCountryCode("Russi");
    expect(res).toBe(undefined);
  });
  // it("Check init method call", () => {
  //   const instance = new Locations(apiService);
  //   expect(instance.init()).resolves.toEqual(countries);
  // });
});
