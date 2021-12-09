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
  public ngOnInit(): void {
    const currentUserSub = this.authService.currentUser.subscribe(
      (user: GetUser | null) => {
        this.currenUser = user?.user;
        this.isLogin = !user ? false : true;
        this.username = user?.user.username;
      }
    );

    this.subscriptions.add(currentUserSub);
  }

  public ngOnDestroy(): void {
    if (this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
