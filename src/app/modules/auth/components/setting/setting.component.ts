import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('inpFocus') inpFocus!: ElementRef;

  public subscriptions = new Subscription();

  public settingForm!: FormGroup;

  public isLoading = false;

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService,
    private roter: Router,
    private formBuilder: FormBuilder
  ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.isLoading = true;
    this.settingForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
      image: [
        '',
        Validators.compose([
        Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
      ],
      bio: [
        ''
      ],
    });
    const getUserSub = this.authService.getUser()
      .subscribe((res: GetUser) => {
        this.settingForm = this.formBuilder.group({
          username: [
            res.user.username,
            Validators.compose([
              Validators.required
            ]),
          ],
          image: [
            res.user.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg',
            Validators.compose([
            Validators.required,
            Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
            ])
          ],
          email: [
            res.user.email,
            Validators.compose([
              Validators.required,
              Validators.email
            ]),
          ],
          bio: [
            res.user.bio
          ],
        });
        this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })

    this.subscriptions.add(getUserSub);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.inpFocus.nativeElement.focus();
    })
  }

  public get handle(): { [key: string]: AbstractControl } {
    return this.settingForm.controls;
  }

  public onSetting(form: FormGroup) {
    Swal.fire({
      icon: 'question',
      iconColor: '#0f0e15',
      confirmButtonColor: '#0f0e15',
      showCancelButton: true,
      cancelButtonColor: '#0f0e15',
      title: 'Are you sure?!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        const settingSub = this.authService.updateUser(form.value)
          .subscribe((res: GetUser) => {
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              iconColor: '#0f0e15',
              confirmButtonColor: '#0f0e15',
              title: 'Conglaturation!',
              text: 'Succesful update setting!',
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
              text: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1500
            })
          })

        this.subscriptions.add(settingSub);
      }
    });
  }

  public onLogout() {
    Swal.fire({
      icon: 'question',
      iconColor: '#0f0e15',
      confirmButtonColor: '#0f0e15',
      showCancelButton: true,
      cancelButtonColor: '#0f0e15',
      title: 'Are you sure to logout?!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          iconColor: '#0f0e15',
          confirmButtonColor: '#0f0e15',
          title: 'Goodbye!',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.removeItem('CURRENT_USER');
        this.authService.currentUser.next(null);
        this.roter.navigate(['../home']);
      }
    });
  }

  public ngOnDestroy(): void {
    if(this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
