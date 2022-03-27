// создание переменных
let nameAria = document.querySelector('.profile__name');
let activityAria = document.querySelector('.profile__activity');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonAdd = document.querySelector('.profile__add-button');

let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.form');
let formClose = popupElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.form__input-name');
let activityInput = formElement.querySelector('.form__input-activity');
let formSaveButton = formElement.querySelector('.form__button');

//функция добавления-удаления класса модификатора
function popupOpenClose() {
  popupElement.classList.toggle('popup_opened');
}

//закрытие попапа при клике вне его окна
function clickOverleyPopup() {
  if (event.target === event.currentTarget) {
    popupOpenClose();
  }
}

//считываем клики
buttonEdit.addEventListener('click', popupOpenClose);
formClose.addEventListener('click', popupOpenClose);
popupElement.addEventListener('click', clickOverleyPopup);

//задал значения в окна ввода формы
nameInput.value = nameAria.textContent;
activityInput.value = activityAria.textContent;

//функция отключения отправки формы, добавления значений 
//введенных в форму в соответствующие теги 
function formSubmitHandler (evt) {
  evt.preventDefault();

  let valueNameAria = nameInput.value;
  let valueActivityAria = activityInput.value;

  nameAria.textContent = valueNameAria;
  activityAria.textContent = valueActivityAria;

  popupOpenClose();
}

//считывает событие: отпрака формы
formElement.addEventListener('submit', formSubmitHandler); 


