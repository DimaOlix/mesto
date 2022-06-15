import './index.css';


import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithСonfirmation from '../components/PopupWithСonfirmation.js';
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
  userAvatar,
} from '../utils/utils.js';

const apiCards = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
  )

apiCards.getInfo()
.then((res) => {
  console.log(res)
  res.forEach((elem) => {
    if(elem.likes._id === '52bbf82811a0c0fa24ba931d') {
    like.classList.add('element__like_active');

  }
  });
  addCard.renderCards(res);
})
.catch((err) => console.log(err));

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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  activitySelector: '.profile__activity'
});



const apiHandleLikeCard = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/cards/',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
  )


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


// создание карточек со слушителями
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



function renderCard(items, card) {
  if(items.length > 1) {
    addCard.addItem(card);
  } else {
    addCard.addUserItem(card);
  }
}

const apiUserInfo = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/users/me',
  '0cd5671f-d9e2-44a6-902a-4db007f7a8f2'
  )

apiUserInfo.getInfo()
.then((res) => {
  userInfo.setUserInfoLoad(res, userAvatar);
})
.catch();

// добавление карточек при загрузке страницы
const addCard = new Section( {
  renderer: (items, item, selector) => {
    const cardElement = creatureCard(item, selector);
    renderCard(items, cardElement);
  }
}, '.elements__container');

  



// экземпляр класса для подтверждения удаления карточки
const popupСonfirmationForm = new PopupWithСonfirmation('.popup_type_confirmation');

popupСonfirmationForm.setEventListeners();













// создание наследников класса валидации формы
const validFormEdit = new FormValidator(allSelectorsForm, formEditElement);
const validFormAdd = new FormValidator(allSelectorsForm, formAddElement);

validFormEdit.enableValidation();
validFormAdd.enableValidation();




// экземпляр кдасса попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_photo', '.templateCard');

popupImage.setEventListeners();

// экземпляр класса для редактирования данных пользователя
const popupEditForm = new PopupWithForm('.popup_type_edit', 
  { submitForm: (value) => {
  // метод disablingButton для устранения возможности добавлять 
  // пустые поля в profile во время плавного закрытия формы
      validFormEdit.disablingButton();

      apiEditUserInfo.editUserInfo(value['input-name'], value['input-activity'])
      .then((res) => {
        userInfo.setUserInfo( res.name, res.about );
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
    
    apiAddCard.addCard(inputsValue.place, inputsValue.link)
    .then((res) => {

      addCard.renderCards([res]);    
    }) 
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