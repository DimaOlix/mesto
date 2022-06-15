import Popup from './Popup.js'

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoElement = this._popup.querySelector('.popup__photo-element');
    this._popupPhotoTitle = this._popup.querySelector('.popup__title-photo');
  }

  open(card) {
    const photoCard = card.querySelector('.element__image');

    this._popupPhotoElement.src = photoCard.src;
    this._popupPhotoElement.alt = photoCard.alt;
    this._popupPhotoTitle.textContent = photoCard.alt;
    
    super.open();
  }
}