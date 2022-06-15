export default class FormValidator {

  constructor(formSelectors, form) {
    this._formSelectors = formSelectors;
    this._form = form;
    this._inputsList = Array.from(this._form.querySelectorAll(this._formSelectors.inputSelector));
    this._button = this._form.querySelector(this._formSelectors.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }

  checkFormDuringOpen() {
    this._inputsList.forEach((elem) => {
      this._hideError(elem);
    });
  }

  disablingButton() {
    this._button.classList.add(this._formSelectors.inactiveButtonClass);
    this._button.setAttribute('disabled', 'disabled');
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputsList);

    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
  
      inputElement.addEventListener('input', () => {
        this._toggleErrorMessage(inputElement);
        this._toggleButtonState(this._inputsList);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disablingButton();
    } else {
      this._button.classList.remove(this._formSelectors.inactiveButtonClass);
      this._button.removeAttribute('disabled', 'disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleErrorMessage(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _showError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
 
    errorElement.textContent = errorMessage;
    input.classList.add(this._formSelectors.inputErrorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    
    input.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.textContent = '';
  }
}