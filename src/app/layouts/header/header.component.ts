import { User } from './../../shared/models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isLogin: boolean = false;
  username?: string;

  public currenUser: User | undefined;

  //#end region

  //#region Constructor
  public constructor(private authService: AuthService) {}

  //#end region

  //#region Methods
<<<<<<< HEAD
  public ngOnInit(): void {
    const currentUserSub = this.authService.currentUser.subscribe(
      (user: GetUser | null) => {
        this.currenUser = user?.user;
        this.isLogin = !user ? false : true;
        this.username = user?.user.username;
      }
    );
=======
  public ngOnInit(): void { 
    const currentUserSub = this.authService.currentUser.subscribe((user: GetUser | null) => {
      this.isLogin = !user ? false : true;
    })
    
    const getUserSub = this.authService.getUser().subscribe((user: GetUser) => {
      this.currenUser = user.user;
    })
>>>>>>> 02e3edb37352214001b7e6a2233ba50d44257ae9

    this.subscriptions.add(currentUserSub);
    this.subscriptions.add(getUserSub);
  }

  public ngOnDestroy(): void {
    if (this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
