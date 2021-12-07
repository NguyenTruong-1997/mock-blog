import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor() { }

  //#end region

  //#region Methods
  public ngOnInit(): void { }

  public onLogin(form: NgForm) {
    console.log(form);
    
  }

  //#end region
}
