import { getAutocompleteInstance } from "../plugins/materialize";

class FormUI {
  constructor(getAutocompleteInstance) {
    this._form = document.forms["locationControls"];
    this.countryInput = document.getElementById("autocomplete-country"); // form input
    this.autocompleteInstance = getAutocompleteInstance(this.countryInput); // instance of materialize's autocomplete
  }
  get form() {
    return this._form;
  }
  get countryValue() {
    return this.countryInput.value;
  }
  setAutocompleteData(data) {
    this.autocompleteInstance.updateData(data);
  }
}

const formui = new FormUI(getAutocompleteInstance);

export default formui;
