import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './cards.js';
import {allSelectorsForm} from './arrawSelectors.js';
import {openPopup} from './utils.js';
import {сlosePopup} from './utils.js';

// переменные для кнопок и полей с информацией в profile
const nameAria = document.querySelector('.profile__name');
const activityAria = document.querySelector('.profile__activity');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

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
const formCloseAdd = popupAddElement.querySelector('.popup__close_type_add');
const placeInput = popupAddElement.querySelector('.form__input_value_place');
const linkInput = popupAddElement.querySelector('.form__input_value_link');
const buttonAddForm = formAddElement.querySelector('.form__button');

// переменные для popup-photo
const popupPhotoContainer = document.querySelector('.popup_type_photo');
const buttonClosePopupPhoto = document.querySelector('.popup__close_type_image');

// переменные для template
const сardСontainer = document.querySelector('.elements__container');

// функция создания 
function creatureCard(item, selector) {
  const card = new Card(item, selector);
  return card.getCard();
}

// добавление карточек из массива при загрузке
function renderCard() {
  initialCards.forEach((item) => {
    const cardElem = creatureCard(item, 'templateCard');
    
    сardСontainer.append(cardElem);
  });
}

renderCard();

// создание наследников класса валидации формы
const validFormEdit = new FormValidator(allSelectorsForm, formEditElement);
const validFormAdd = new FormValidator(allSelectorsForm, formAddElement);

validFormEdit.enableValidation();
validFormAdd.enableValidation();

// добавление значений введенных в форму в соответствующие теги 
function editProfileSubmit() {
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;  
}

// создание новой карточки пользователем
function addCardSubmit() {
  const card = creatureCard({name: placeInput.value, link: linkInput.value}, 'templateCard');

  сardСontainer.prepend(card);
}

// открытие Edit-формы
function openEditForm(selectors, formElement) {
  
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;

  validFormEdit.disablingButtonDuringOpen();
  validFormEdit.checkFormDuringOpen();
}

// функция добавления слушателей на оверлей для закрытия попап
function setListenerOverleyPopup() {
  const popupsList = document.querySelectorAll('.popup');
  
  popupsList.forEach((popup) => {
    
    popup.addEventListener('click', (evt) => {
      closeOverleyPopup(evt);
    });
  });
}

setListenerOverleyPopup();

// функция закрытия попап при нажатии на оверлей
function closeOverleyPopup(evt) {
  if (evt.target === evt.currentTarget) {
    сlosePopup(evt.currentTarget);
  }
}

//  СЧИТЫВАЕМ СОБЫТИЯ

// открытие попап edit
buttonEdit.addEventListener('click', function() {
  openEditForm(allSelectorsForm, formEditElement);
  openPopup(popupEditElement);
});

// закрытие попап edit
formClose.addEventListener('click', function() {
  сlosePopup(popupEditElement);
});

// открытие попап add
buttonAdd.addEventListener('click', function() {
  formAddElement.reset();
  validFormAdd.checkFormDuringOpen();
  openPopup(popupAddElement);
});

// закрытие попап add
formCloseAdd.addEventListener('click', function() {
  сlosePopup(popupAddElement);
});

// закрытие попап попап-photo
buttonClosePopupPhoto.addEventListener('click', function() {
  сlosePopup(popupPhotoContainer);
});

// считывает событие: отпрака формы
formEditElement.addEventListener('submit', function() {
  editProfileSubmit();
  сlosePopup(popupEditElement);
});
 
formAddElement.addEventListener('submit', function() {
  addCardSubmit();
  validFormAdd.disablingButtonDuringOpen();
  сlosePopup(popupAddElement);
  formAddElement.reset();
});