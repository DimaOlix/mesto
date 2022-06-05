export default class Card {
  
  constructor(dataForСard, template, {handleCardClick}) {
    this._handleCardClick = handleCardClick;
    this._dataForСard = dataForСard;
    this._template = template;
  }

  getCard() {
    this.contentTemplate = document.querySelector(`.${this._template}`).content;
    this._card = this.contentTemplate.querySelector('.element').cloneNode(true);

    this._setValuesCard();
    this._setEventListener();

    return this._card;
  }

  _setValuesCard() {
    this._card.querySelector('.element__title').textContent = this._dataForСard.place;
    const elementImage = this._card.querySelector('.element__image');
    elementImage.src = this._dataForСard.link;
    elementImage.alt = this._dataForСard.place;
  }

  _setEventListener() {
    this._card.querySelector('.element__delete')
    .addEventListener('click', () => this._deletCard());
    this._card.querySelector('.element__like')
    .addEventListener('click', () => this._getLikeCard());
    this._card.querySelector('.element__image')
    .addEventListener('click', (evt) => this._handleCardClick(evt));
  }

  _deletCard() {
    this._card.remove();
    this._card = null;
  }

  _getLikeCard() {
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  }
}