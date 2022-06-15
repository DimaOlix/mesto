export default class UserInfo {

  constructor({nameSelector, activitySelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userActivity = document.querySelector(activitySelector);
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

  setUserInfoLoad(userInfo, userAvatar) {
    this._userName.textContent = userInfo.name;
    this._userActivity.textContent = userInfo.about;
    userAvatar.src = userInfo.avatar;
  }  
}