export {
  popupPhotoContainer, 
  popupPhotoElement, 
  popupPhotoTitle, 
  // openPopup,
  // сlosePopup,
  // closePopapEsc
};

const popupPhotoContainer = document.querySelector('.popup_type_photo');
const popupPhotoElement = document.querySelector('.popup__photo-element');
const popupPhotoTitle = document.querySelector('.popup__title-photo');

// открытие Popup
// function openPopup(elem) {
//   elem.classList.add('popup_opened');
//   document.addEventListener('keyup', closePopapEsc);
// }

// закрытие Popup
// function сlosePopup(elem) {
//   elem.classList.remove('popup_opened');
//   document.removeEventListener('keyup', closePopapEsc);
// }

// закрытие попап по нажатию ESC
// function closePopapEsc(evt) {  
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     сlosePopup(popup);
//   }
// }
