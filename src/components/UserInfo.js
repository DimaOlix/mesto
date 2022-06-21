export default class UserInfo {

  constructor({nameSelector, activitySelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userActivity = document.querySelector(activitySelector);
    this._fieldUserAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent, 
      userActivity: this._userActivity.textContent
    };
  }

  setUserInfo(userName, userActivity) {
    this._userName.textContent = userName;
    this._userActivity.textContent = userActivity;
  }

  setUserInfoLoad(userInfo) {
    this._userName.id = userInfo._id;
    this._userName.textContent = userInfo.name;
    this._userActivity.textContent = userInfo.about;
    this._fieldUserAvatar.style.backgroundImage  = `url(${userInfo.avatar})`;
  }

  setUserAvatar(userAvatar) {
    this._fieldUserAvatar.style.backgroundImage = `url(${userAvatar.avatar})`;    
  }
}