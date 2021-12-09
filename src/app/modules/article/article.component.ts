import { Article } from './../../shared/models/article.model';
import { ConnectApiService } from './../../shared/services/connect-api.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from './../../shared/models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Profile } from 'src/app/shared/models/profile.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  //#region Properties
  profile!: Profile;
  article!: Article;
  follow: boolean = false;
  articleComment: Comment[] = [];
  currentUser = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
  //#end region

  //#region Constructor
  public constructor(
    private getAPI: ConnectApiService,
    private route: ActivatedRoute
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onGetArticleBySlug(params.slug);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.article = data.article;
        }
      });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onGetComment(params.slug);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.articleComment = data.comments;
        }
      });
  }

  addComment(comment: NgForm) {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onAddComment(
            { body: comment.value.comment },
            params.slug
          );
        })
      )
      .subscribe((data: any) => {
        this.articleComment.push(data.comment);
      });
  }

  deleteComment(id: any) {
    const index = this.articleComment.findIndex((comment) => comment.id === id);
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onDeleteComment(params.slug, id);
        })
      )
      .subscribe((data: any) => {
        this.articleComment.splice(index);
      });
  }
  //#end region
  changeFollow() {
    this.follow = !this.follow;
  }

  favoriteArticle() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onFavoriteArticle(params.slug);
        })
      )
      .subscribe((data: any) => {
        this.article = data.article;
      });
  }

  unFavoriteArticle() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onUnfavoriteArticle(params.slug);
        })
      )
      .subscribe((data: any) => {
        this.article = data.article;
      });
  }

  followArticle(userName: string) {
    this.getAPI.onFollowUser(userName).subscribe((follow) => {
      this.profile = follow.profile;
      console.log(this.profile);
    });
  }

  unfollowArticle(userName: string) {
    this.getAPI.onUnfollowUser(userName).subscribe((follow) => {
      this.profile = follow.profile;
      console.log(this.profile);
    });
  }
}
