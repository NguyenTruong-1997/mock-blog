import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor(
    private authService: AuthService
  ) { }

  //#end region

  //#region Methods
  public ngOnInit(): void { 
    this.authService.autoLogin();
  }

  //#end region
}
