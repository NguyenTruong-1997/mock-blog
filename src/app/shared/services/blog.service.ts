import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor() { }

  //#end region

  //#region Methods
  public onGetToken() {
    return JSON.parse(localStorage.getItem('CURRENT_USER')!).user.token;
  }

  public isLogin() {
    const currentUser = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
    if (currentUser && currentUser?.user?.token) {
      return true;
    }
    return false;
  }

  //#end region
}
