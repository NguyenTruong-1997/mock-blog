import {
  User,
  FormLogin,
  FormRegistration,
  Registration,
  FormUpdateUser,
  GetUser,
} from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region Properties
  private readonly API_URL = 'https://conduit.productionready.io/api';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  public currentUser = new BehaviorSubject<GetUser | null>(null);
  //#end region

  //#region Constructor
  public constructor(
    private http: HttpClient,
    private blogService: BlogService
  ) {}

  //#end region

  //#region Methods
  private headersAuth() {
    const token = this.blogService.onGetToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
    });
    return headers;
  }

  //login
  public login(form: FormLogin) {
    return this.http
      .post<User>(
        this.API_URL + '/users/login',
        { user: { ...form } },
        { headers: this.headers }
      )
      .pipe(
        tap((res: User) => {
          this.currentUser.next({ user: res });
          localStorage.removeItem('CURRENT_USER');
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
      { user: { ...form } },
      { headers: this.headers }
    );
  }

  //getUser
  public getUser() {
    return this.http.get<User>(this.API_URL + '/user', {
      headers: this.headersAuth()
    });
  }

  //updateUser
  public updateUser(form: FormUpdateUser) {
    return this.http.put<User>(
      this.API_URL + '/user',
      { user: { ...form } },
      { headers: this.headersAuth() }
    );
  }

  //#end region
}
