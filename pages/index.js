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



const сardСontainer = document.querySelector('.elements__container');
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

function getCards(elem) {
  const newCard = template.content.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  
  cardTitle.textContent = elem.name;
  cardImage.src = elem.link;

  return newCard;
}

function render() {
  const html = initialCards.map(getCards);
  сardСontainer.append(...html);
}

render();



//функция открытия Popup
function openPopupEdit(popupEditElement) {
  popupEditElement.classList.add('popup_opened');
}

//Функция закрытия Popup
function closePopup(popupEditElement) {
  popupEditElement.classList.remove('popup_opened');
}



//функция отключения отправки формы, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  closePopup(popupEditElement);
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