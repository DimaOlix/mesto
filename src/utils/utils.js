export {
  popupPhotoContainer, 
  popupPhotoElement, 
  popupPhotoTitle, 
  buttonEdit,
  buttonAdd,
  popupEditElement,
  popupAddElement,
  popupConfirmation,
  formEditElement,
  formAddElement,
  nameInput,
  activityInput,
  userAvatar,
  formAddAvatar,
};

const userAvatar = document.querySelector('.profile__avatar');

// переменные для кнопок и полей с информацией в profile
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// переменные для попап edit и add
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupConfirmation = document.querySelector('.popup_type_confirmation');

// переменные для формы edit
const formEditElement = popupEditElement.querySelector('.form_type_edit');
const nameInput = formEditElement.querySelector('.form__input_value_name');
const activityInput = formEditElement.querySelector('.form__input_value_activity');

// переменные для формы add
const formAddElement = popupAddElement.querySelector('.form_type_add');

const popupPhotoContainer = document.querySelector('.popup_type_photo');
const popupPhotoElement = document.querySelector('.popup__photo-element');
const popupPhotoTitle = document.querySelector('.popup__title-photo');

// форма редактирования аватара
const formAddAvatar = document.querySelector('.form_type_avatar');
