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
} from '../utils/utils.js';

const apiCards = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const apiEditUserInfo = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/users/me',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const apiAddCard = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const apiDeleteCard = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards/',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const apiHandleLikeCard = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards/',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const apiEditAvatar = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)

const apiUserInfo = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/users/me',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
)
  
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    activitySelector: '.profile__activity',
    avatarSelector: '.profile__avatar',
  });

  // получение и установка информации о пользователе
  apiUserInfo.getInfo()
  .then((res) => {
    userInfo.setUserInfoLoad(res);
  })
  .catch();

// запрос данных о лайках на карточках при загрузке
apiCards.getInfo()
.then((res) => {
  res.forEach((elem) => {
    if(elem.likes._id === '52bbf82811a0c0fa24ba931d') {
    like.classList.add('element__like_active');
  }
  });
  addCard.renderCards(res);
})
.catch((err) => console.log(err));

// экземпляр класса для отрисовки карточек
const addCard = new Section( {
  renderer: (items, item, selector) => {
    const cardElement = creatureCard(item, selector);
    renderCard(items, cardElement);
  }
}, '.elements__container');

// выбор добавления карт append/prepend
function renderCard(items, card) {
  if(items.length > 1) {
    addCard.addItem(card);
  } else {
    addCard.addUserItem(card);
  }
}

// функция управления лайком карты
function handleLikeCard(cardItem) {
  const like = cardItem.querySelector('.element__like');
  const likeQuantity = cardItem.querySelector('.element__like-quantity');

  if(!like.classList.contains('element__like_active')) {
    apiHandleLikeCard.setLikeCard(cardItem.id)
    .then( (res) => {
      likeQuantity.textContent = res.likes.length;
      like.classList.add('element__like_active');
    } )
    .catch((err) => console.log(err))
  } else {
    apiHandleLikeCard.removeLikeCard(cardItem.id)
    .then((res) => {
      likeQuantity.textContent = res.likes.length;
      like.classList.remove('element__like_active')
    })
    .catch((err) => console.log(err))
  }
}

// функция создания карточек со слушителями
function creatureCard(item, selector) {
    const card = new Card('52bbf82811a0c0fa24ba931d', item, selector, {
      handleDelete: () => {
        popupСonfirmationForm.setSubmitHandler(() => {
          apiDeleteCard.deleteCard(cardElement.id)
          .then(() => {
            validFormAdd.disablingButton()
            card.deletCard()
          })
          .catch((err) => console.log(err))         
        })
        popupСonfirmationForm.open();
      }
    },
    {
      handleLikeCard: (cardItem) => {
        handleLikeCard(cardItem);
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

      apiEditUserInfo.editUserInfo(value['input-name'], value['input-activity'])
      .then((res) => {
        userInfo.setUserInfo( res.name, res.about );
        popupEditForm.refundTextButton('Сохранить');
      })
      .catch((err) => console.log(err))
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
    
    apiAddCard.addCard(inputsValue.place, inputsValue.link)
    .then((res) => {
      addCard.renderCards([res]);
      popupAddForm.refundTextButton('Создать');
    })
    .catch((err) => console.log(err))
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

    apiEditAvatar.editAvatar(inputsValue.link)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupAvatrForm.refundTextButton('Сохранить');
    })
    .catch((err) => console.log(err)) 
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