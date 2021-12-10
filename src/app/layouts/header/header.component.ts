import { User } from './../../shared/models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isLogin: boolean = false;

  public currenUser!: User;

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService,
    private blogService: BlogService
  ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void { 
    const currentUserSub = this.authService.currentUser.subscribe((user: GetUser | null) => {
      this.isLogin = !user ? false : true;
    })

    if(this.blogService.isLogin()) {
      const getUserSub = this.authService.getUser().subscribe((user: GetUser) => {
        this.currenUser = user.user;
      }, (err) => {
        console.log(err);
      })
  
      this.subscriptions.add(getUserSub);
    }
    
    this.subscriptions.add(currentUserSub);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
