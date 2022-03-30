// создание переменных
let nameAria = document.querySelector('.profile__name');
let activityAria = document.querySelector('.profile__activity');
let buttonEdit = document.querySelector('.profile__edit-button');

let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.form');
let formClose = popupElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.form__input_value_name');
let activityInput = formElement.querySelector('.form__input_value_activity');


//функция добавления-удаления класса модификатора
function openClosePopup() {
  popupElement.classList.toggle('popup_opened');
  nameInput.value = nameAria.textContent;
  activityInput.value = activityAria.textContent;
}

//функция отключения отправки формы, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameAria.textContent = nameInput.value;
  activityAria.textContent = activityInput.value;
  openClosePopup();
}

//закрытие попапа при клике вне его окна
// function clickOverleyPopup() {
//   if (event.target === event.currentTarget) {
//     openClosePopup();
//   }
// }


//считываем клики
buttonEdit.addEventListener('click', openClosePopup);
formClose.addEventListener('click', openClosePopup);

// popupElement.addEventListener('click', clickOverleyPopup);

//считывает событие: отпрака формы
formElement.addEventListener('submit', formSubmitHandler);