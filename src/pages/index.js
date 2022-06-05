import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/cards.js';
import {allSelectorsForm} from '../utils/arrawSelectors.js';
import {
  buttonEdit,
  buttonAdd,
  formEditElement,
  formAddElement,
  nameInput,
  activityInput,
} from '../utils/utils.js';


const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  activitySelector: '.profile__activity'
});

// создание наследников класса валидации формы
const validFormEdit = new FormValidator(allSelectorsForm, formEditElement);
const validFormAdd = new FormValidator(allSelectorsForm, formAddElement);

validFormEdit.enableValidation();
validFormAdd.enableValidation();

// создание карточек со слушителями
function creatureCard(item, selector) {
    const card = new Card(item, selector, { handleCardClick: (evt) => {
      popupImage.open(evt);
    } 
  });
  const cardElement = card.getCard();

  return cardElement;
}

// добавление карточек при загрузке из массива
const addCardLoad = new Section({ items: initialCards, 
  renderer: (item, selector) => {

    const cardElement = creatureCard(item, selector);
    addCardLoad.addItem(cardElement);
  }
}, '.elements__container');

addCardLoad.renderCards();

// экземпляр кдасса попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_photo', '.templateCard');

popupImage.setEventListeners();

// экземпляр класса для редактирования данных пользователя
const popupEditForm = new PopupWithForm('.popup_type_edit', 
  { submitForm: (value) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые поля в profile во время плавного закрытия формы
    validFormEdit.disablingButton();

    userInfo.setUserInfo( value['input-name'], value['input-activity'] );
  } 
  });

popupEditForm.setEventListeners();

// экземпляр класса для добавления карточек пользователем
const popupAddForm = new PopupWithForm('.popup_type_add', 
{ submitForm: (inputsValue) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые карточки во время плавного закрытия формы
  validFormAdd.disablingButton();

  const cardElement = creatureCard(inputsValue, 'templateCard');
  addCardLoad.addUserItem(cardElement);
  } 
});  

popupAddForm.setEventListeners();

// открытие Edit-формы
function openEditForm() {

  const userInfoList = userInfo.getUserInfo();
  
  nameInput.value = userInfoList.userName;
  activityInput.value = userInfoList.userActivity;

  validFormEdit.disablingButton();
  validFormEdit.checkFormDuringOpen();
}

//  СЧИТЫВАЕМ СОБЫТИЯ

// открытие попап edit
buttonEdit.addEventListener('click', () => {
  openEditForm();
  popupEditForm.open();
});

// открытие попап add
buttonAdd.addEventListener('click', () => {
  formAddElement.reset();
  validFormAdd.checkFormDuringOpen();
  validFormAdd.disablingButton();
  popupAddForm.open();
});