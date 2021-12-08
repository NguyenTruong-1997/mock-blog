import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/shared/models/profile.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConnectApiService } from '../../shared/services/connect-api.service';
import { GetUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //#region Properties
  userProfile!: any;
  user!: any;
  username?: string;
  param?: any;
  //#end region

  //#region Constructor
  public constructor(
    private router: Router,
    private userService: ConnectApiService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.userProfile = user?.user;
      this.username = user?.user.username;
      console.log(this.username);
    });
    this.userService
      .onGetProfile(this.userProfile.username)
      .subscribe((user) => {
        this.user = user;
        console.log(user);
      });
    this.route.params.subscribe((params) => {
      this.param = params;
      console.log(this.param);
    });
  }
  links = [
    { url: `./${this.user?.profile.username}`, label: 'My Articles' },
    { url: `./${this.username}/favorites`, label: 'Favorited Articles' },
  ];

  //#end region
}
