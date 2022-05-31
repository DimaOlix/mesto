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
    if(this._items.length > 1) {
      this._container.append(elem);
    } else {
      this._container.prepend(elem);
    }
  }
}