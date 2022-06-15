import Popup from './Popup.js'

export default class PopupWithСonfirmation extends Popup {

constructor(popupSelector) {
  super(popupSelector);
  this._form = this._popup.querySelector('.form');

}

  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
} 