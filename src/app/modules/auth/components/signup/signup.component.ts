import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'success',
          iconColor: '#0f0e15',
          confirmButtonColor: '#0f0e15',
          title: 'Conglaturation!',
          text: 'Succesful login!'
        });
        this.roter.navigate(['../auth/login']);
      }, (err) => {
        console.log(err);
        
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Email has already been taken!'
        })
      }, () => {
        this.isLoading = false;
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
