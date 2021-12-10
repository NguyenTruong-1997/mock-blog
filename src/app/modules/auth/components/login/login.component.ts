import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isLoading = false;

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService,
    private roter: Router
    ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void { }

  public onLogin(form: NgForm) {
    this.isLoading = true;
    const loginSub = this.authService.login(form.value)
      .subscribe(() => {
        this.isLoading = false;
        this.roter.navigate(['../home']);
      }, (err) => {
        this.isLoading = false;
        // alert('Email or password ' + err?.error?.errors['email or password'][0]);
        console.log(err);
        
      })

    this.subscriptions.add(loginSub);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
