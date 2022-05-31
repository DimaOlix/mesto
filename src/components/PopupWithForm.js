import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  _submitForm;
  _form;
  _inputList;
  _inputsValue;

  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');

  }

  _getInputValues() {
    this._inputsValue = {};
      this._inputList.forEach(element => {
      this._inputsValue[element.id] = element.value;
    });
    return this._inputsValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}