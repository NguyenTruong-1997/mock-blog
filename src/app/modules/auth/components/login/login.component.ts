import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isLoading = false;

  @ViewChild('inpFocus') inpFocus!: ElementRef;

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService,
    private roter: Router
    ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.inpFocus.nativeElement.focus();
    })
  }

  public onLogin(form: NgForm) {
    this.isLoading = true;
    const loginSub = this.authService.login(form.value)
      .subscribe(() => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          iconColor: '#0f0e15',
          confirmButtonColor: '#0f0e15',
          title: 'Succesful login!',
          text: 'Welcome back!',
          showConfirmButton: false,
          timer: 1500
        });
        this.roter.navigate(['../home']);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Email or password is invalid!',
          showConfirmButton: false,
          timer: 1500
        })
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
