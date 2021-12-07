import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isLogin: boolean = false;

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService
  ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void { 
    const currentUserSub = this.authService.currentUser.subscribe(user => {
      this.isLogin = !user ? false : true;
    })

    this.subscriptions.add(currentUserSub);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
