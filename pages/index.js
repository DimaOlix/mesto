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
const buttonAddForm = formAddElement.querySelector('.form__button');


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
  cardImage.addEventListener('click', () => openImagePopap(elem));

  return cardNew;
}

// добавление карточек из массива
function renderCard() {
  const cardFromArray = initialCards.map(getCards);
  сardСontainer.append(...cardFromArray);
}

renderCard();

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

// открытие Popup
function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keyup', closePopapEsc);
}

// закрытие Popup
function сlosePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopapEsc);
}

// добавление значений введенных в форму в соответствующие теги 
function editProfileSubmit() {
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;  
}

// создание новой карточки пользователем
function addCardSubmit(evt) {
  const card = getCards({name: placeInput.value, link: linkInput.value});

  сardСontainer.prepend(card);
}

// закрытие попап по нажатию ESC
function closePopapEsc(evt) {  
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    сlosePopup(popup);
  }
}

// открытие Popap-Photo
function openImagePopap (elem) {  
  popupPhotoElement.src = elem.link;
  popupPhotoElement.alt = elem.name;
  popupPhotoTitle.textContent = elem.name;

  openPopup(popupPhotoContainer); 
}

// проверка форм во время их открытия
function checkFormDuringOpen(config, formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  inputsList.forEach((elem) => {
    toggleButtonState(inputsList, button, config);
    hideError(formElement, elem, config)
  });
}

// открытие Edit-формы
function openEditForm(config, formElement) {
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
  checkFormDuringOpen(config, formElement);
}

// функция закрытия попап при нажатии на оверлей
function closeOverleyPopup(evt) {
  if (evt.target === evt.currentTarget) {
    сlosePopup(evt.currentTarget);
  }
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
  checkFormDuringOpen(allSelectorsForm, formAddElement);
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
 
formAddElement.addEventListener('submit', function(evt) {
  addCardSubmit(evt);
  buttonAddForm.setAttribute('disabled', 'disabled');
  сlosePopup(popupAddElement);
  formAddElement.reset();
});