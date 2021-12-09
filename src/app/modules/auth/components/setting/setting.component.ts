import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetUser } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  @ViewChild('settingForm') settingForm!: NgForm;

  public isLoading = false;

  public imagePath = '';
  public userName = '';
  public shortBio = '';
  public currentEmail = '';

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService,
    private roter: Router
  ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = true;
      const getUserSub = this.authService.getUser().subscribe((res: GetUser) => {
        this.imagePath = res.user.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg';
        this.userName = res.user.username || '',
        this.currentEmail = res.user.email || '',
        this.shortBio = res.user.bio || ''
      }, (err) => {
        console.log(err);
      }, () => {
        this.isLoading = false;
      })

      this.subscriptions.add(getUserSub);
    })
  }

  public onSetting(form: NgForm) {
    this.isLoading = true;
    const settingSub = this.authService.updateUser(form.value)
      .subscribe((res: GetUser) => {
        Swal.fire('success');
        this.roter.navigate(['../home']);
      }, (err) => {
        console.log(err);
        alert('Something went wrong!');
      },() => {
        this.isLoading = false;
      })

    this.subscriptions.add(settingSub);
  }

  public onLogout() {
    alert('Are your sure to logout');
    localStorage.removeItem('CURRENT_USER');
    this.authService.currentUser.next(null);
    this.roter.navigate(['../home']);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
