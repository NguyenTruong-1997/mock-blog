import { 
  User, 
  FormLogin, 
  FormRegistration, 
  Registration, 
  FormUpdateUser, 
  UpdateUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //#region Properties
  private readonly API_URL = 'https://conduit.productionready.io/api';

  public currentUser = new BehaviorSubject<User | null>(null)
  //#end region

  //#region Constructor
  public constructor(private http: HttpClient) { }

  //#end region

  //#region Methods

  //login
  public login(form: FormLogin) {
    return this.http.post<User>(this.API_URL + '/api/users/login', {user: { ...form }})
      .pipe(
        tap((res: User) => {
          this.currentUser.next(res);
          localStorage.setItem('CURRENT_USER', JSON.stringify(res));
        })
      );
  }

  //auto login
  public autoLogin() {
    if(localStorage.getItem('CURRENT_USER')) {
      const user = JSON.parse(localStorage.getItem('CURRENT_USER')!);
      this.currentUser.next(user);
    }
  }

  //registration
  public registration(form: FormRegistration) {
    return this.http.post<Registration>(this.API_URL + '/api/users', {user: { ...form }});
  }

  public updateUser(form: FormUpdateUser) {
    return this.http.put<UpdateUser>(this.API_URL + '/api/users', {user: { ...form }});
  }

  //#end region
}
