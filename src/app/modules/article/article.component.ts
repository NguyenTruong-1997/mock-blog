import { Article } from './../../shared/models/article.model';
import { ConnectApiService } from './../../shared/services/connect-api.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from './../../shared/models/article.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Profile } from 'src/app/shared/models/profile.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public subscriptions = new Subscription();
  //#region Properties
  public article!: Article;
  public follow: boolean = false;
  public articleComment: Comment[] = [];
  public currentUser = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
  public isLoading!: boolean;
  public isLoadingComment!: boolean;
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
    this.isLoading = true;

    const getData = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.getAPI.onGetArticleBySlug(params.slug);
        }),
        switchMap((data) => {
          this.article = data.article;
          return this.getAPI.onGetComment(data.article.slug);
        })
      )
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.articleComment = data.comments;
        },
        (err) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            iconColor: '#d33',
            confirmButtonColor: '#0f0e15',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );

    this.subscriptions.add(getData);
  }

  addComment(comment: NgForm) {
    this.isLoadingComment = true;
    const getAddComment = this.getAPI
      .onAddComment({ body: comment.value.comment }, this.article.slug)
      .subscribe(
        (data: any) => {
          this.articleComment.push(data.comment);
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            iconColor: '#d33',
            confirmButtonColor: '#0f0e15',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
        () => {
          this.isLoadingComment = false;
        }
      );

      this.subscriptions.add(getAddComment);
  }

  deleteComment(id: any) {
    const index = this.articleComment.findIndex((comment) => comment.id === id);
    const getDeleteComment = this.getAPI.onDeleteComment(this.article.slug, id).subscribe(
      (data: any) => {
        this.articleComment.splice(index);
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );

    this.subscriptions.add(getDeleteComment);
  }
  //#end region
  favoriteArticle() {
    const getFavoriteArticle = this.getAPI.onFavoriteArticle(this.article.slug).subscribe(
      (data: any) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );

    this.subscriptions.add(getFavoriteArticle);
  }

  unFavoriteArticle() {
    const getUnFavoriteArticle = this.getAPI.onUnfavoriteArticle(this.article.slug).subscribe(
      (data: any) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );

    this.subscriptions.add(getUnFavoriteArticle);
  }

  followArticle() {
    const getFollowArticle = this.getAPI.onFollowUser(this.article.author.username).subscribe(
      (follow: { profile: Profile }) => {
        this.article.author = follow.profile!;
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );

    this.subscriptions.add(getFollowArticle);
  }

  unfollowArticle() {
    const getUnfollowArticle = this.getAPI.onUnfollowUser(this.article.author.username).subscribe(
      (follow: { profile: Profile }) => {
        this.article.author = follow.profile!;
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          iconColor: '#d33',
          confirmButtonColor: '#0f0e15',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );

    this.subscriptions.add(getUnfollowArticle);
  }

  updateArticle() {
    this.router.navigate(['../../editor/', this.article.slug]);
  }

  deleteArticles() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      iconColor: '#0f0e15',
      showCancelButton: true,
      confirmButtonColor: '#0f0e15',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const getDeleteArticle = this.getAPI.onDeleteArticle(this.article?.slug).subscribe(
          (data: any) => {
            this.router.navigate(['home']);
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              iconColor: '#d33',
              confirmButtonColor: '#0f0e15',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
        this.subscriptions.add(getDeleteArticle);
      }


    });

  }
}
