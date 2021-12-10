import {
  FormLogin,
  FormRegistration,
  Registration,
  FormUpdateUser,
  GetUser,
} from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region Properties
  private readonly API_URL = 'https://conduit.productionready.io/api';

  public currentUser = new BehaviorSubject<GetUser | null>(null);
  //#end region

  //#region Constructor
  public constructor(
    private http: HttpClient
  ) {}

  //#end region

  //#region Methods

  //login
  public login(form: FormLogin) {
    return this.http
      .post<GetUser>(
        this.API_URL + '/users/login',
        { user: { ...form } }
      )
      .pipe(
        tap((res: GetUser) => {
          this.currentUser.next(res);
          localStorage.setItem('CURRENT_USER', JSON.stringify(res));
        })
      );
  }

  //auto login
  public autoLogin() {
    if (localStorage.getItem('CURRENT_USER')) {
      const user = JSON.parse(localStorage.getItem('CURRENT_USER')!);
      this.currentUser.next(user);
    }
  }

  //registration
  public registration(form: FormRegistration) {
    return this.http.post<Registration>(
      this.API_URL + '/users',
      { user: { ...form } }
    )
  }

  //getUser
  public getUser() {
    return this.http.get<GetUser>(this.API_URL + '/user');
  }

  //updateUser
  public updateUser(form: FormUpdateUser) {
    return this.http.put<GetUser>(
      this.API_URL + '/user',
      { user: { ...form } }
    )
    .pipe(
      tap((res: GetUser) => {
        this.currentUser.next(res);
        localStorage.removeItem('CURRENT_USER');
        localStorage.setItem('CURRENT_USER', JSON.stringify(res));
      })
    )
  }

  //#end region
}
