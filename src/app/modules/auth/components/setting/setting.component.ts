import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

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
          imageURL: res?.user?.image || '',
          username: res?.user?.username || '',
          email: res?.user?.email || '',
          bio: res?.user?.bio || '',
          password: ''
        })
      })

      this.subscriptions.add(getUserSub);
    })
  }

  public onSetting(form: NgForm) {
    this.isLoading = true;
    const settingSub = this.authService.updateUser(form.value)
      .subscribe(res => {
        this.isLoading = false;
        this.authService.currentUser.next({ user: res });
        this.roter.navigate(['../home']);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
        
      })

    this.subscriptions.add(settingSub);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
