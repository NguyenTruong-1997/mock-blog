import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        Swal.fire('success');
        this.roter.navigate(['../home']);
      }, (err) => {
        // alert('Email or password ' + err?.error?.errors['email or password'][0]);
        console.log(err);
        
      },() => {
        this.isLoading = false;
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
