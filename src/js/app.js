import locations from "./store/locations";
import universities from "./store/universities";
import "../css/style.css";
import "./plugins";
import formui from "./views/form";
import listui from "./views/list";
import favorites from "./store/favorites";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formui.form;
  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });
  // Handlers
  async function onFormSubmit() {
    const countryFromInput = formui.countryValue;
    const countryCode = locations.getCountryCode(countryFromInput);
    const countryForServer =
      universities.universities[countryCode]?.country || countryFromInput;
    const country = countryForServer.toLowerCase().split(" ").join("+");
    await universities.fetchUni(country);
    listui.renderList(universities.lastSearch);
    favorites.addHandlerToFavs(universities.lastSearch);
    favorites.init();
  }
  // Init application
  async function initApp() {
    await locations.init();
    await universities.init();
    formui.setAutocompleteData(locations.shortCountriesList);
  }
});
