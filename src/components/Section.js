export default class Section {

  _items;
  _container;
  _renderer;

  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderCards() {
    this._items.forEach((item) => {
      this._renderer(item, 'templateCard');  
    });
  }

  addItem(elem) {
    this._container.append(elem);
  }

  addUserItem(elem) {
    this._container.prepend(elem);
  }
}
