import { Article, SingleArticle } from './../../shared/models/article.model';
import { ConnectApiService } from './../../shared/services/connect-api.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from './../../shared/models/article.model';

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
  articleComment: Comment[] = [];
  //#end region

  //#region Constructor
  public constructor(private getAPI: ConnectApiService) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.getAPI
      .onGetArticleBySlug('Welcome-to-RealWorld-project-1')
      .subscribe((data) => {
        if (data) {
          this.articleList = data.article as Article;
          console.log(this.articleList);
        }
      });

    this.getAPI
      .onGetComment('Welcome-to-RealWorld-project-1')
      .subscribe((data) => {
        if (data) {
          this.articleComment = data.comments as Comment[];
        }
      });

    // this.getAPI.onAddComment();
  }

  //#end region
  changeFollow() {
    this.follow = !this.follow;
  }

  changeFavorite() {
    this.favorites = !this.favorites;
  }
}
