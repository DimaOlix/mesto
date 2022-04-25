// включение валидации форм попапов
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();

// установка импутам слушателей событий ввода
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleErrorMessage(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// проверка на невалидность хотябы одного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// добавление/удаление классов, активности кнопкам формы
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_type_invalid');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('form__button_type_invalid');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

// проверка на валидность полей ввода
function toggleErrorMessage(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

// появление сообщения об ошибке и добавление класса ошибки полю ввода
function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  inputElement.classList.add('form__input_type_invalid');
}

// скрытие текста ошибки и удаление класса ошибки у поля ввода
function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove('form__input_type_invalid');
  errorElement.textContent = '';
}

// function closePopapUsingEsc(elem) {
//   if (elem.key === 'Escape') {
//     сlosePopup(elem);
//     window.removeEventListener('keyup', closePopapUsingEsc);
//   }
// }

function setListenerEsc(evt) {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  console.log(evt.key)
  popupList.forEach((elem) => {
    console.log(elem)

    if (evt.key === 'Escape') {
      сlosePopup(elem);
      window.removeEventListener('keyup', setListenerEsc);
    }
  });
}


