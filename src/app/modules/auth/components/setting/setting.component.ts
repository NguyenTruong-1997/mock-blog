import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor() { }

  //#end region

  //#region Methods
  public ngOnInit(): void { }

  public onSetting(form: NgForm) {
    
  }

  //#end region
}
