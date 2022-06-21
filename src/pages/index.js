import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithСonfirmation from '../components/PopupWithСonfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {allSelectorsForm} from '../utils/arrawSelectors.js';
import {
  buttonEdit,
  buttonAdd,
  formEditElement,
  formAddElement,
  nameInput,
  activityInput,
  userAvatar,
  formAddAvatar,
  userName,
} from '../utils/utils.js';

const apiServerRequest = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    activitySelector: '.profile__activity',
    avatarSelector: '.profile__avatar',
});

// отресовка карточек только после загрузки 
// данных пользователя и данных для карточек
Promise.all([apiServerRequest.getUserInfo(), apiServerRequest.getCardsInfo()])
.then((res) => {
  userInfo.setUserInfoLoad(res[0]);
  addCard.renderCards(res[1]);
})
.catch((err) => console.log(err));

// экземпляр класса для отрисовки карточек
const addCard = new Section( {
  renderer: (item) => {
    const cardElement = creatureCard(item, 'templateCard');
    renderCard(cardElement, item);
  }
}, '.elements__container');

// выбор добавления карт append/prepend
function renderCard(card, datacard) {
  if(datacard.owner._id === userName.id) {
    addCard.addUserItem(card);
  } else {
    addCard.addItem(card);
  }
}

// функция создания карточек со слушителями
function creatureCard(item, selector) {
    const card = new Card(userName.id, item, selector, {
      handleDelete: () => {
        popupСonfirmationForm.setSubmitHandler(() => {
          popupСonfirmationForm.changeTextButton();

          apiServerRequest.deleteCard(cardElement.id)
          .then(() => {
            popupСonfirmationForm.close();
            validFormAdd.disablingButton();
            card.deletCard();
          })
          .catch((err) => console.log(err))
          .finally(() => popupСonfirmationForm.refundTextButton('Да'))
        })
        popupСonfirmationForm.open();
      }
    },
    {
      handleAddLikeClick: (cardItem) => {
        apiServerRequest.setLikeCard(cardItem.id)
        .then( (res) => {
          card.addLikeAndQuantity(res);
        })
        .catch((err) => console.log(err))   
      }
    },
    {
      handleRemoveLikeClick: (cardItem) => {
        apiServerRequest.removeLikeCard(cardItem.id)
        .then((res) => {
          card.removeLikeAndQuantity(res);
        })
        .catch((err) => console.log(err))
      }
    },
    { 
      handleCardClick: () => {
        popupImage.open(cardElement);
      } 
    });

  const cardElement = card.getCard();
  return cardElement;
}

// экземпляр класса для подтверждения удаления карточки
const popupСonfirmationForm = new PopupWithСonfirmation('.popup_type_confirmation');

popupСonfirmationForm.setEventListeners();

// создание наследников класса валидации формы
const validFormEdit = new FormValidator(allSelectorsForm, formEditElement);
const validFormAdd = new FormValidator(allSelectorsForm, formAddElement);
const validFormAvatar = new FormValidator(allSelectorsForm, formAddAvatar);

validFormEdit.enableValidation();
validFormAdd.enableValidation();
validFormAvatar.enableValidation();

// экземпляр кдасса попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_photo', '.templateCard');

popupImage.setEventListeners();

// экземпляр класса для редактирования данных пользователя
const popupEditForm = new PopupWithForm('.popup_type_edit', 
  { submitForm: (value) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые поля в profile во время плавного закрытия формы
      validFormEdit.disablingButton();
      popupEditForm.changeTextButton();

      apiServerRequest.editUserInfo(value['input-name'], value['input-activity'])
      .then((res) => {
        popupEditForm.close();
        userInfo.setUserInfo( res.name, res.about );
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditForm.refundTextButton('Сохранить'))
    }
  });

popupEditForm.setEventListeners();

// экземпляр класса для добавления карточек пользователем
const popupAddForm = new PopupWithForm('.popup_type_add', 
{ submitForm: (inputsValue) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые карточки во время плавного закрытия формы
    validFormAdd.disablingButton();
    popupAddForm.changeTextButton();
    
    apiServerRequest.addCard(inputsValue.place, inputsValue.link)
    .then((res) => {
      popupAddForm.close();
      addCard.renderCards([res]);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddForm.refundTextButton('Создать'))
  } 
});

popupAddForm.setEventListeners();

// экземпляр класса для изменения аватарки
const popupAvatrForm = new PopupWithForm('.popup_type_avatar', 
{ submitForm: (inputsValue) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые карточки во время плавного закрытия формы
    validFormAdd.disablingButton();
    popupAvatrForm.changeTextButton();

    apiServerRequest.editAvatar(inputsValue.link)
    .then((res) => {
      popupAvatrForm.close();
      userInfo.setUserAvatar(res);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatrForm.refundTextButton('Сохранить'))

  } 
});

popupAvatrForm.setEventListeners();

// функция открытия Edit-формы
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

// открытие попап avatar
userAvatar.addEventListener('click', () => {
  formAddAvatar.reset();
  validFormAvatar.checkFormDuringOpen();
  validFormAvatar.disablingButton();
  popupAvatrForm.open();
});