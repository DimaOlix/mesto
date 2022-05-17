export class FormValidator {

  _formSelectors;
  _form;

  constructor(formSelectors, form) {
    this._formSelectors = formSelectors;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }

  hideErrorDuringOpen(form, input, selectors) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    
    input.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    const inputsList = Array.from(this._form.querySelectorAll(this._formSelectors.inputSelector));
    const buttonElement = this._form.querySelector(this._formSelectors.submitButtonSelector);

    this._toggleButtonState(inputsList, buttonElement, this._formSelectors);

    inputsList.forEach((inputElement) => {
      this._hideError(this._form, inputElement, this._formSelectors);
  
      inputElement.addEventListener('input', () => {
        this._toggleErrorMessage(this._form, inputElement, this._formSelectors);
        this._toggleButtonState(inputsList, buttonElement, this._formSelectors);
      });
    });
  }

  _toggleButtonState(inputs, button, selectors) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(selectors.inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(selectors.inactiveButtonClass);
      button.removeAttribute('disabled', 'disabled');
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleErrorMessage(form, input, selectors) {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage, selectors);
    } else {
      this._hideError(form, input, selectors);
    }
  }

  _showError(form, input, errorMessage, selectors) {
    const errorElement = form.querySelector(`#${input.id}-error`);
 
    errorElement.textContent = errorMessage;
    input.classList.add(selectors.inputErrorClass);
  }

  _hideError(form, input, selectors) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    
    input.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = '';
  }
}