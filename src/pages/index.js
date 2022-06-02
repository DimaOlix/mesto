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


// добавление карточек при загрузке из массива
const addCardLoad = new Section({ items: initialCards, 
  renderer: (item, selector) => {
    const card = new Card(item, selector, { handleCardClick: (evt) => {
      popupImage.open(evt);
    } 
  });
    const cardElement = card.getCard();
    
    addCardLoad.addItem(cardElement);
  }
}, '.elements__container');

addCardLoad.renderCards()




// экземпляр кдасса попапа с картинкой
const popupImage = new PopupWithImage('.popup_type_photo', '.templateCard');

popupImage.setEventListeners();



// экземпляр класса для редактирования данных пользователя
const popupEditForm = new PopupWithForm('.popup_type_edit', 
  { submitForm: (value) => {
    userInfo.setUserInfo( value['name-input'], value['activity-input'] );
  } 
  });

popupEditForm.setEventListeners();




// экземпляр класса для добавления карточек пользователем
const popupAddForm = new PopupWithForm('.popup_type_add', 
{ submitForm: (inputsValue) => {
  
    const addCardSubmit = new Section({
      items: [{
        name: inputsValue['place-input'], 
        link: inputsValue['link-input']
      }],
      // принимает карточку и отрисовывает ее
      renderer: (item, selector) => {
        // создает и возвращает карточку
        const card = new Card( item, selector, { handleCardClick: (evt) => {
          popupImage.open(evt);
        } 
      });   
        const cardUser = card.getCard();        
        addCardSubmit.addItem(cardUser);
      }
    }, '.elements__container');
    
    addCardSubmit.renderCards();
   
  } });  

popupAddForm.setEventListeners();



// открытие Edit-формы
function openEditForm() {

  const userInfoList = userInfo.getUserInfo();
  
  nameInput.value = userInfoList.userName;
  activityInput.value = userInfoList.userActivity;

  validFormEdit.disablingButtonDuringOpen();
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
  validFormAdd.disablingButtonDuringOpen();
  popupAddForm.open();
});
