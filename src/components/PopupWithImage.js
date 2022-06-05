import Popup from './Popup.js'

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoElement = this._popup.querySelector('.popup__photo-element');
    this._popupPhotoTitle = this._popup.querySelector('.popup__title-photo');
  }

  open(evt) {
    this._popupPhotoElement.src = evt.target.src;
    this._popupPhotoElement.alt = evt.target.alt;
    this._popupPhotoTitle.textContent = evt.target.alt;
    super.open();
  }
}