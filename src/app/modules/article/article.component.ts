import { Article, SingleArticle } from './../../shared/models/article.model';
import { ConnectApiService } from './../../shared/services/connect-api.service';
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
  articleList!: Article;
  //#end region

  //#region Constructor
  public constructor(private getAPI: ConnectApiService) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.getAPI
      .onGetArticleBySlug('Create-a-new-implementation-1')
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.articleList = data.article as Article;
        }
      });

    this.getAPI
      .onGetComment('Create-a-new-implementation-1')
      .subscribe((data) => {
        console.log(data);
      });
  }

  //#end region
  changeFollow() {
    this.follow = !this.follow;
  }

  changeFavorite() {
    this.favorites = !this.favorites;
  }
}
