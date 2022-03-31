// создание переменных
let nameAria = document.querySelector('.profile__name');
let activityAria = document.querySelector('.profile__activity');
let buttonEdit = document.querySelector('.profile__edit-button');

let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.form');
let formClose = popupElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.form__input_value_name');
let activityInput = formElement.querySelector('.form__input_value_activity');


//функция открытия Popup
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
}

//Функция закрытия Popup
function closePopup() {
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
buttonEdit.addEventListener('click', openPopup);
formClose.addEventListener('click', closePopup);

// popupElement.addEventListener('click', clickOverleyPopup);

//считывает событие: отпрака формы
formElement.addEventListener('submit', formSubmitHandler);