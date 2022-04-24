// создание переменных

// переменные для кнопок и полей с информацией в profile
const nameAria = document.querySelector('.profile__name');
const activityAria = document.querySelector('.profile__activity');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// переменные для попап edit и add
const popupElement = document.querySelector('.popup');
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




// ВАЛИДАЦИЯ ФОРМЫ

// const form = document.querySelector('.form');
// const formInput = form.querySelector('.form__input');
// console.log(formInput);
// formError = form.querySelector(`#${formInput.id}-error`);
// console.log(formError);








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

//  СЧИТЫВАЕМ СОБЫТИЯ

// открытие попап edit
buttonEdit.addEventListener('click', function() {
  const inputList = Array.from(formEditElement.querySelectorAll('.form__input'));
  const buttonElement = formEditElement.querySelector('.form__button');
  
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
  
  inputList.forEach((inputElement) => {
    hideError(formEditElement, inputElement);
  });
  
  toggleButtonState(inputList, buttonElement);

  openPopup(popupEditElement);
});

// закрытие попап edit
formClose.addEventListener('click', function() {
  сlosePopup(popupEditElement);
});

// открытие попап add
buttonAdd.addEventListener('click', function() {
  
  const inputList = Array.from(formAddElement.querySelectorAll('.form__input'));
  const buttonElement = formAddElement.querySelector('.form__button');
  
  inputList.forEach((inputElement) => {
    hideError(formAddElement, inputElement);
  });  
  toggleButtonState(inputList, buttonElement);

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


// функция закрытия попап при нажатии на оверлей
function closeOverleyPopup(evt) {
  if (evt.target === evt.currentTarget) {
    сlosePopup(evt.currentTarget);
  }
}

// функция добавления слушателей на оверлей для закрытия попап
function setListenerOverleyPopup() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      closeOverleyPopup(evt);
    });

  });
}

setListenerOverleyPopup();


// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     сlosePopup(popupEditElement);
//   }
// });



// считывает событие: отпрака формы
formEditElement.addEventListener('submit', formSubmitHandler);

formAddElement.addEventListener('submit', addCardSubmit);