export default class UserInfo {

  _name;
  _activity;

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
}