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
        Swal.fire({
          icon: 'success',
          iconColor: '#0f0e15',
          confirmButtonColor: '#0f0e15',
          title: 'Conglaturation!',
          text: 'Succesful login!'
        });
        this.roter.navigate(['../home']);
      }, (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Email or password is invalid!'
        })
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
