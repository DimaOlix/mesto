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
const popupPhotoContainer = document.querySelector('.popap_type_photo');
const popupPhotoElement = document.querySelector('.popap__photo-element');



const сardСontainer = document.querySelector('.elements__container');
const сardElement = document.querySelectorAll('.element');

const template = document.querySelector('.templateCard');

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

// функция для добавления при загрузке страницы и удаления кнопкой карточек
function getCards(elem) {
  const newCard = template.content.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');

  const buttonDeletCard = newCard.querySelector('.element__delete');
  buttonDeletCard.addEventListener('click', deletCard);
  
  cardTitle.textContent = elem.name;
  cardImage.src = elem.link;

  return newCard;
}

// добавление карточек из массива
function render() {
  const cardFromArray = initialCards.map(getCards);
  сardСontainer.append(...cardFromArray);
}

render();

// удаление карточки при нажатии на delet
function deletCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

// добавление карточек при помощи попап add
function addCards() {
  const newCard = template.content.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  cardTitle.textContent = placeInput.value;
  cardImage.src = linkInput.value;

  return newCard;
}



//функция открытия Popup
function openPopupEdit(popupEditElement) {
  popupEditElement.classList.add('popup_opened');
}

//Функция закрытия Popup
function closePopup(popupEditElement) {
  popupEditElement.classList.remove('popup_opened');
}



//функция отключения отправки формы edit, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  closePopup(popupEditElement);
}

//функция отключения отправки формы add, добавления значений 
//введенных в форму в соответствующие теги 
function addCardSubmit (evt) {
  evt.preventDefault();
  const card = addCards();
  сardСontainer.prepend(card);

  closePopup(popupAddElement);
}

//закрытие попапа при клике вне его окна
// function clickOverleyPopup() {
//   if (event.target === event.currentTarget) {
//     openClosePopup();
//   }
// }


//считываем клики

// открытие попап edit
editButton.addEventListener('click', function() {
  openPopupEdit(popupEditElement);
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
});

// закрытие попап edit
formClose.addEventListener('click', function() {
  closePopup(popupEditElement);
});

// открытие попап add
addButton.addEventListener('click', function() {
  openPopupEdit(popupAddElement);
});

// закрытие попап add
closeFormAdd.addEventListener('click', function() {
  closePopup(popupAddElement);
});



// popupEditElement.addEventListener('click', clickOverleyPopup);

//считывает событие: отпрака формы
formEditElement.addEventListener('submit', formSubmitHandler);

formAddElement.addEventListener('submit', addCardSubmit);

// открыть popap-photo
сardElement.addEventListener('click', function() {
  openPopupEdit(popupPhotoContainer);
});