
const allSelectorsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_invalid',
  inputErrorClass: 'form__input_type_invalid',
}

// включение валидации форм попапов, отключение отправки форм
function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation(allSelectorsForm);

// установка импутам слушателей событий ввода
function setEventListeners(formElement, config) {
  const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonState(inputsList, buttonElement, config);
  
  inputsList.forEach((inputElement) => {
    hideError(formElement, inputElement, config);

    inputElement.addEventListener('input', () => {
      toggleErrorMessage(formElement, inputElement, config);
      toggleButtonState(inputsList, buttonElement, config);
    });
  });
}

// проверка на невалидность хотябы одного поля
function hasInvalidInput(inputsList) {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// добавление/удаление классов, активности кнопкам формы
function toggleButtonState(inputsList, buttonElement, config) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

// проверка на валидность полей ввода
function toggleErrorMessage(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
}

// появление сообщения об ошибке и добавление класса ошибки полю ввода
function showError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

// скрытие текста ошибки и удаление класса ошибки у поля ввода
function hideError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}