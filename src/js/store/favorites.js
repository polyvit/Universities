import api from "../services/apiService";
import { getDropdownInstance } from "../plugins/materialize";

class Favorites {
  constructor(api) {
    this.api = api;
    this.favorites = [];
    this.dropdown = document.querySelector(".dropdown-content");
    this.dropdownTrigger = document.querySelector(".dropdown-trigger");
    this.dropdownInstance = getDropdownInstance(this.dropdownTrigger);
  }
  init() {
    const favsFromLS = JSON.parse(localStorage.getItem("favs"));
    if (favsFromLS.length > 0) this.favorites = favsFromLS;
    this.renderDropdown();
    this.favorites.forEach((fav) => {
      const heartBtn = document.querySelector(`[data-uni-title="${fav.name}"]`);
      heartBtn.classList.remove("blue");
      heartBtn.classList.add("red");
    });
  }
  addHandlerToFavs(universities) {
    const favBtns = document.querySelectorAll(".btn-fav");
    favBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const uniName = e.target
          .closest(".card-action")
          .previousElementSibling.firstElementChild.textContent.trim();
        this.favorites.push(universities.find((uni) => uni.name == uniName));
        localStorage.setItem("favs", JSON.stringify(this.favorites));
        this.renderDropdown();
        btn.classList.remove("blue");
        btn.classList.add("red");
        this.dropdownInstance.open();
        setTimeout(() => {
          this.dropdownInstance.close();
        }, 1500);
      });
    });
  }
  addDeleteHandler() {
    const delBtns = document.querySelectorAll(".delete-favorite");
    delBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const uniName = e.target.parentElement.parentElement.dataset.uniName;
        const index = this.favorites.indexOf(
          this.favorites.find((el) => el.name == uniName)
        );
        this.favorites.splice(index, 1);
        localStorage.setItem("favs", JSON.stringify(this.favorites));
        e.target.parentElement.parentElement.remove();
        const heartBtn = document.querySelector(
          `[data-uni-title='${uniName}']`
        );
        heartBtn.classList.remove("red");
        heartBtn.classList.add("blue");
      });
    });
  }
  renderDropdown() {
    let fragment = "";
    this.favorites.forEach((favUni) => {
      const template = Favorites.rowTemplate(favUni);
      fragment += template;
    });
    this.dropdown.innerHTML = "";
    this.dropdown.insertAdjacentHTML("beforeend", fragment);
    this.addDeleteHandler();
  }
  static rowTemplate(uni) {
    return `
    <div class="favorite-item d-flex align-items-start" data-uni-name="${uni.name}">
                <img
                  src="https://logo.clearbit.com/${uni.domains[0]}"
                  class="favorite-item-airline-img"
                  onerror="this.src = 'https://phonoteka.org/uploads/posts/2023-03/thumbs/1680210955_phonoteka-org-p-shapka-bakalavra-art-krasivo-2.jpg'"
                  width="50"
                  height="50"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">
                        <a href="${uni.web_pages[0]}" target="_blank" class="favorite-item-name">${uni.name}</a>
                      </span>
                    </div>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small delete-favorite blue ml-auto"
                    >Delete</a
                  >
                </div>
              </div>
    `;
  }
}

const favorites = new Favorites(api);

export default favorites;
