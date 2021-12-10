import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/shared/models/profile.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConnectApiService } from '../../shared/services/connect-api.service';
import { GetUser } from '../../shared/models/user.model';
import { ProfileService } from './service/profile.service';
import { switchMap } from 'rxjs/operators';
import { GetProfile } from '../../shared/models/profile.model';

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
  follow!: boolean ;
  //#end region

  //#region Constructor
  public constructor(
    private userService: ConnectApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.userProfile = user?.user;
      this.username = user?.user.username;
    });
    this.route.params.subscribe((params) => {
      this.profileService.currentArticles.next(params.username);
    })
    this.route.params.pipe(switchMap((params) =>
      this.userService.onGetProfile(params.username))
    ).subscribe((user) => {
        this.user = user;
        console.log(user);
        this.follow = user.profile.following;


      })

  }
  links = [
    { url: `./`, label: 'My Articles' },
    { url: `./favorites`, label: 'Favorited Articles' },
  ];

  onFollowUser(){
    this.userService.onFollowUser(this.user.profile.username).subscribe(follow =>
      this.follow = follow.profile.following)
  }
  onUnfollowUser(){
    this.userService.onUnfollowUser(this.user.profile.username).subscribe(unfollow =>
      this.follow = unfollow.profile.following)
  }
}
