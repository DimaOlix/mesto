// создание переменных
let nameAria = document.querySelector('.profile__name');
let activityAria = document.querySelector('.profile__activity');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let popupElement = document.querySelector('.popup');
let popupAddElement = document.querySelector('.popup_type_add');

let formElement = popupElement.querySelector('.form');
let formClose = popupElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.form__input_value_name');
let activityInput = formElement.querySelector('.form__input_value_activity');

let formAddElement = popupElement.querySelector('.add-form');
let closeFormAdd = popupElement.querySelector('.popup__close_type_add');
let placeInput = formElement.querySelector('.add-form__input_value_place');
let linkInput = formElement.querySelector('.add-form__input_value_link');



let elementCard = document.querySelectorAll('.element');
let elementCardImage = document.querySelectorAll('.element__image');
let elementCardTitle = document.querySelectorAll('.element__title');


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


// elementCardImage.forEach(function(el) {
//   for (i = 0; i <= initialCards.length; i += 1) {
//     let elSrc = initialCards[i].link;
//   }
//   el.src = elSrc; 
// });





//функция открытия Popup Edit
function openPopupEdit(popupElement) {
  popupElement.classList.add('popup_opened');
//   nameInput.value = nameAria.textContent;
//   activityInput.value = activityAria.textContent;
}

//Функция закрытия Popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}



//функция отключения отправки формы, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  closePopup();
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
  openPopupEdit(popupElement);
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
});

// закрытие попап edit
formClose.addEventListener('click', function() {
  closePopup(popupElement);
});

// открытие попап add
addButton.addEventListener('click', function() {
  openPopupEdit(popupAddElement);
});

// закрытие попап add
closeFormAdd.addEventListener('click', function() {
  closePopup(popupAddElement);
});


// popupElement.addEventListener('click', clickOverleyPopup);

//считывает событие: отпрака формы
formElement.addEventListener('submit', formSubmitHandler);