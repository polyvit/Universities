import api from "../services/apiService";

class ListUI {
  constructor() {
    this.container = document.querySelector(".universities-sections .row");
  }
  renderList(universities) {
    this.clearContainer();
    if (universities.length == 0) {
      this.showEmptyMsg();
      return;
    }
    let fragment = "";

    universities.forEach((uni) => {
      const template = ListUI.cardTemplate(uni);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }
  clearContainer() {
    this.container.innerHTML = "";
  }
  showEmptyMsg() {
    const template = ListUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="universities-empty-res-msg">
      По вашему запросу ничего не найдено
    </div>
    `;
  }
  static cardTemplate(uni) {
    return `
    <div class="col s12 m6" data-hook="uniCard">
            <div class="card horizontal">
              <div class="card-image">
                <img src="${uni.logo}" onerror="this.src = 'https://phonoteka.org/uploads/posts/2023-03/thumbs/1680210955_phonoteka-org-p-shapka-bakalavra-art-krasivo-2.jpg' " width="100" height="100"/>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h6 class="uni-name">
                    ${uni.name}
                  </h6>
                </div>
                <div class="card-action d-flex">
                  <a href="${uni.web_pages[0]}" target="_blank" class="blue-text">Перейти на сайт</a>
                  <a
                    class="btn-floating btn-fav waves-effect waves-light ml-auto blue" data-uni-title="${uni.name}"
                    ><i class="material-icons">favorite_border</i></a
                  >
                </div>
              </div>
            </div>
          </div>
    `;
  }
}

const listui = new ListUI();

export default listui;
