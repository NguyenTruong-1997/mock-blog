import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor() { }

  //#end region

  //#region Methods
  public ngOnInit(): void { }

  public onSignup(form: NgForm) {
    console.log(form);
    
  }

  //#end region
}
