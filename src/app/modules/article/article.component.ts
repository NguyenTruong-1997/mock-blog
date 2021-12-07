import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  //#region Properties
  follow: boolean = false;
  favorites: boolean = false;
  //#end region

  //#region Constructor
  public constructor() {}

  //#end region

  //#region Methods
  public ngOnInit(): void {}

  //#end region
  changeFollow() {
    this.follow = !this.follow;
  }

  changeFavorite() {
    this.favorites = !this.favorites;
  }
}
