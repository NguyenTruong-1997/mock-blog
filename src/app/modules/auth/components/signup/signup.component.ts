import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
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

  public onSignup(form: NgForm) {
    this.isLoading = true;
    const signupSub = this.authService.registration(form.value)
      .subscribe(() => {
        this.isLoading = false;
        this.roter.navigate(['./login']);
      }, (err) => {
        this.isLoading = false;
        alert('Email or username ' + err.error.errors['email'][0]);
      })

    this.subscriptions.add(signupSub);
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
