export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__close');
  }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener( 'keyup', (el) => this._handleEscClose(el) );
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener( 'keyup', (el) => this._handleEscClose(el) );
    }

    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    _closeOverleyPopup(evt) {
      if (evt.target === evt.currentTarget) {
        this.close(evt.currentTarget);
      }
    }

    setEventListeners() {
      this._buttonClosePopup.addEventListener( 'click', () => this.close() );
      this._popup.addEventListener( 'click', (evt) => this._closeOverleyPopup(evt) );
    }
}