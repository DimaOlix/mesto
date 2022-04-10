// создание переменных

// переменные для кнопок и полей с информацией в profile
const nameAria = document.querySelector('.profile__name');
const activityAria = document.querySelector('.profile__activity');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// переменные для попап edit и add
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');

// переменные для формы edit
const formEditElement = popupEditElement.querySelector('.form_type_edit');
const formClose = popupEditElement.querySelector('.popup__close_type_edit');
const nameInput = formEditElement.querySelector('.form__input_value_name');
const activityInput = formEditElement.querySelector('.form__input_value_activity');

// переменные для формы add
const formAddElement = popupAddElement.querySelector('.form_type_add');
const closeFormAdd = popupAddElement.querySelector('.popup__close_type_add');
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

// функция выбора элементом карточки в template и добавления им слушателей событий
function getCards(elem) {
  const newCard = template.content.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const buttonDeletCard = newCard.querySelector('.element__delete');
  const buttonLikeCard = newCard.querySelector('.element__like');
  
  cardTitle.textContent = elem.name;
  cardImage.src = elem.link;
 
  buttonDeletCard.addEventListener('click', deletCard);
  buttonLikeCard.addEventListener('click', getLikeCard);
  cardImage.addEventListener('click', openImagePopap);
  
  return newCard;
}

// добавление карточек из массива
function renderCard() {
  const cardFromArray = initialCards.map(getCards);
  сardСontainer.append(...cardFromArray);
}

renderCard();

//функция создания новой карточки пользователем
function addCardSubmit (evt) {
  evt.preventDefault();
  const card = getCards({name: placeInput.value, link: linkInput.value});
  сardСontainer.prepend(card);
  placeInput.value = '';
  linkInput.value = '';
  card.addEventListener('click', openClosePopup);

  openClosePopup(popupAddElement);
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

function openImagePopap (evt) {
  popupPhotoElement.src = evt.target.src;
  popupPhotoTitle.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  popupPhotoContainer.classList.toggle('popup_opened');
}

//функция открытия/закрытия Popup
function openClosePopup(elem) {
  elem.classList.toggle('popup_opened');
}

//функция отключения отправки формы edit, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  openClosePopup(popupEditElement);
}

//закрытие попапа при клике вне его окна
// function clickOverleyPopup() {
//   if (event.target === event.currentTarget) {
//     openopenClosePopup();
//   }
// }

//считываем клики

// открытие попап edit
editButton.addEventListener('click', function() {
  openClosePopup(popupEditElement);
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
});

// закрытие попап edit
formClose.addEventListener('click', function() {
  openClosePopup(popupEditElement);
});

// открытие попап add
addButton.addEventListener('click', function() {
  openClosePopup(popupAddElement);
});

// закрытие попап add
closeFormAdd.addEventListener('click', function() {
  openClosePopup(popupAddElement);
});

// закрытие попап попап-photo
buttonClosePopupPhoto.addEventListener('click', function() {
  openClosePopup(popupPhotoContainer);
});

// popupEditElement.addEventListener('click', clickOverleyPopup);

//считывает событие: отпрака формы
formEditElement.addEventListener('submit', formSubmitHandler);

formAddElement.addEventListener('submit', addCardSubmit);




