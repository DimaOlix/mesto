import Popup from './Popup.js'

export default class PopupWithСonfirmation extends Popup {

constructor(popupSelector) {
  super(popupSelector);
  this._form = this._popup.querySelector('.form');
  this._buttonSubmitForm = this._form.querySelector('.form__button')
}

  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
  
  changeTextButton() {
    this._buttonSubmitForm.textContent = 'Удаление...';
  }

  refundTextButton(textButton) {
    this._buttonSubmitForm.textContent = textButton;
  }
} 