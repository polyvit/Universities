import api, { Api } from "../apiService";
import config from "../../config/apiConfig";
import axios from "axios";

jest.mock("axios");

const universities = [
  {
    country: "Spain",
    domains: ["iuse.edu.es"],
    name: "International University of Southern Europe",
    web_pages: ["http://www.iuse.edu.es/"],
  },
];

describe("ApiService tests", () => {
  it("Check that api is an instance of apiService", () => {
    expect(api).toBeInstanceOf(Api);
  });
  it("Success fetch universities", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: universities })
    );
    await expect(api.universities("spain")).resolves.toEqual(universities);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}&country=spain`);
  });
  it("Fail fetch universities", async () => {
    const errMsg = "Api Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
    await expect(api.universities("spain")).rejects.toThrow(errMsg);
  });
});
