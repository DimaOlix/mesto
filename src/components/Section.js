export default class Section {

  constructor({renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderCards(items) {
    items.forEach((item) => {
      this._renderer(item);  
    });

  }

  addItem(elem) {
    this._container.append(elem);
  }

  addUserItem(elem) {
    this._container.prepend(elem);
  }
}
