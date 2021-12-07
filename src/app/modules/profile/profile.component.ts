import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  //#region Properties

  //#end region

  //#region Constructor
  public constructor(private router: Router) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {}
  links = [
    { url: './username', label: 'My Articles' },
    { url: './username/favorites', label: 'Favorited Articles' },
  ];

  //#end region
}
