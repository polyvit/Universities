import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// init select
// const select = document.querySelectorAll("select");
// M.FormSelect.init(select);

// export function getSelectInstance(elem) {
//   return M.FormSelect.getInstance(elem);
// }

// Init datepicker
// const datepicker = document.querySelectorAll(".datepicker");
// M.Datepicker.init(datepicker);

// export function getDatepickerInstance(elem) {
//   return M.Datepicker.getInstance(elem);
// }

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
