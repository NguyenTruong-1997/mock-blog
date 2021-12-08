import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetUser } from 'src/app/shared/models/user.model';

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
      const getUserSub = this.authService.currentUser
      .subscribe(res => {
        this.settingForm.setValue({
          image: res?.user?.image || '',
          username: res?.user?.username || '',
          email: res?.user?.email || '',
          bio: res?.user?.bio || ''
        })
      })

      this.subscriptions.add(getUserSub);
    })
  }

  public onSetting(form: NgForm) {
    this.isLoading = true;
    const settingSub = this.authService.updateUser(form.value)
      .subscribe((res: GetUser) => {
        this.isLoading = false;
        this.roter.navigate(['../home']);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
        alert('Something went wrong!');
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
