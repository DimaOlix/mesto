// создание переменных

// переменные для кнопок и полей с информацией в profile
const nameAria = document.querySelector('.profile__name');
const activityAria = document.querySelector('.profile__activity');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// переменные для попап edit и add
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');

// переменные для формы edit
const inputElement = popupEditElement.querySelector('.form__input');
const formEditElement = popupEditElement.querySelector('.form_type_edit');
const formClose = popupEditElement.querySelector('.popup__close_type_edit');
const nameInput = formEditElement.querySelector('.form__input_value_name');
const activityInput = formEditElement.querySelector('.form__input_value_activity');

// переменные для формы add
const formAddElement = popupAddElement.querySelector('.form_type_add');
const formCloseAdd = popupAddElement.querySelector('.popup__close_type_add');
const placeInput = popupAddElement.querySelector('.form__input_value_place');
const linkInput = popupAddElement.querySelector('.form__input_value_link');

// переменные для popup-photo
const popupPhotoContainer = document.querySelector('.popup_type_photo');
const popupPhotoElement = document.querySelector('.popup__photo-element');
const popupPhotoTitle = document.querySelector('.popup__title-photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close_type_image');

// переменные для template
const template = document.querySelector('.templateCard');
const сardСontainer = document.querySelector('.elements__container');
const сardElement = document.querySelectorAll('.element');
const elementCardImage = document.querySelector('.element__image');
const elementCardTitle = document.querySelector('.element__title');






const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
console.log(formInput);
formError = form.querySelector(`#${formInput.id}-error`);
console.log(formError);


function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (el) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_type_invalid');
  } else {
    buttonElement.classList.remove('form__button_type_invalid');
  }
}
  

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);

  inputElement.classList.add('form__input_type_invalid');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error');
  
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove('form__input_type_invalid');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error');
  
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};


form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});







// массив для карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// выбор карточки в template и добавления им слушателей событий
function getCards(elem) {
  const cardNew = template.content.cloneNode(true);
  const cardImage = cardNew.querySelector('.element__image');
  const cardTitle = cardNew.querySelector('.element__title');
  const buttonDeletCard = cardNew.querySelector('.element__delete');
  const buttonLikeCard = cardNew.querySelector('.element__like');
  
  cardTitle.textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
 
  buttonDeletCard.addEventListener('click', deletCard);
  buttonLikeCard.addEventListener('click', getLikeCard);
  cardImage.addEventListener('click', function() {openImagePopap(elem)});

  return cardNew;
}

// добавление карточек из массива
function renderCard() {
  const cardFromArray = initialCards.map(getCards);
  сardСontainer.append(...cardFromArray);
}

renderCard();

// создание новой карточки пользователем
function addCardSubmit (evt) {
  evt.preventDefault();
  const card = getCards({name: placeInput.value, link: linkInput.value});
  сardСontainer.prepend(card);
  сlosePopup(popupAddElement);
  formAddElement.reset();
}

// удаление карточки при нажатии на delet
function deletCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

// вешаем Like
function getLikeCard(evt) {
  const like = evt.target.closest('.element__like');
  like.classList.toggle('element__like_active');
}

// открытие Popap-Photo
function openImagePopap (elem) {  
  popupPhotoElement.src = elem.link;
  popupPhotoElement.alt = elem.name;
  popupPhotoTitle.textContent = elem.name;
  openPopup(popupPhotoContainer); 
}

// открытие Popup
function openPopup(elem) {
  elem.classList.add('popup_opened');
}

// закрытие Popup
function сlosePopup(elem) {
  elem.classList.remove('popup_opened');
}

// отключение отправки формы edit, добавление значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  сlosePopup(popupEditElement);
}

// закрытие попапа при клике вне его окна
// function clickOverleyPopup() {
//   if (event.target === event.currentTarget) {
//     openPopup();
//   }
// }

//  считываем клики

// открытие попап edit
buttonEdit.addEventListener('click', function() {
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
  openPopup(popupEditElement);
});

// закрытие попап edit
formClose.addEventListener('click', function() {

  сlosePopup(popupEditElement);
});

// открытие попап add
buttonAdd.addEventListener('click', function() {
  openPopup(popupAddElement);
});

// закрытие попап add
formCloseAdd.addEventListener('click', function() {
  сlosePopup(popupAddElement);
  formAddElement.reset();
});

// закрытие попап попап-photo
buttonClosePopupPhoto.addEventListener('click', function() {
  сlosePopup(popupPhotoContainer);
});

// popupEditElement.addEventListener('click', clickOverleyPopup);

// считывает событие: отпрака формы
formEditElement.addEventListener('submit', formSubmitHandler);

formAddElement.addEventListener('submit', addCardSubmit);


// function enableValidation(formSelector) {
//   const formElement = document.querySelector(formSelector);
//   formElement.addEventListener ('submit', function (evt) {
//     handleFormSubmit(evt);
//   });
// }


// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   const form = evt.currentTarget;
//   if (form.checkInputValidity()) {

//   }
// }
