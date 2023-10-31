import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// init autocomplete
const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete, {
  data: {
    Google: null,
    Amazon: null,
  },
});

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

// Init dropdown
const dropdowns = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropdowns, {
  closeOnClick: false,
});

export function getDropdownInstance(elem) {
  return M.Dropdown.getInstance(elem);
}
