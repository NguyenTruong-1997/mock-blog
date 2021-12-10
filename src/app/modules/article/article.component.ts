import { Article } from './../../shared/models/article.model';
import { ConnectApiService } from './../../shared/services/connect-api.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from './../../shared/models/article.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  article!: Article;
  follow: boolean = false;
  articleComment: Comment[] = [];
  currentUser = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
  //#end region

  //#region Constructor
  public constructor(
    private getAPI: ConnectApiService,
    private route: ActivatedRoute,
    private router: Router
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
    this.getAPI
      .onAddComment({ body: comment.value.comment }, this.article.slug)
      .subscribe((data: any) => {
        this.articleComment.push(data.comment);
      });
  }

  deleteComment(id: any) {
    const index = this.articleComment.findIndex((comment) => comment.id === id);
    this.getAPI
      .onDeleteComment(this.article.slug, id)
      .subscribe((data: any) => {
        this.articleComment.splice(index);
      });
  }
  //#end region
  favoriteArticle() {
    this.getAPI.onFavoriteArticle(this.article.slug).subscribe((data: any) => {
      this.article = data.article;
    });
  }

  unFavoriteArticle() {
    this.getAPI
      .onUnfavoriteArticle(this.article.slug)
      .subscribe((data: any) => {
        this.article = data.article;
      });
  }

  followArticle() {
    this.getAPI
      .onFollowUser(this.article.author.username)
      .subscribe((follow: { profile: Profile }) => {
        this.article.author = follow.profile!;
      });
  }

  unfollowArticle() {
    this.getAPI
      .onUnfollowUser(this.article.author.username)
      .subscribe((follow: { profile: Profile }) => {
        this.article.author = follow.profile!;
      });
  }

  updateArticle() {
    this.router.navigate(['../../editor/', this.article.slug]);
  }

  deleteArticles() {
    this.getAPI.onDeleteArticle(this.article.slug).subscribe((data: any) => {
      this.router.navigate(['home']);
    });
  }
}
