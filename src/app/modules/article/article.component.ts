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
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetUser } from 'src/app/shared/models/user.model';

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
  public isLogin: boolean = false;
  //#end region

  //#region Constructor
  public constructor(
    private getAPI: ConnectApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    this.isLoading = true;
    this.authService.currentUser.subscribe((user: GetUser | null) => {
      this.isLogin = !user ? false : true;
    })

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
            timer: 1500
          });
        }
      );

    this.subscriptions.add(getData);

    console.log(this.currentUser)
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
            timer: 1500
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
    this.getAPI.onDeleteComment(this.article.slug, id).subscribe(
      (data: any) => {
        this.articleComment.splice(index, 1);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //#end region
  favoriteArticle() {
    if (!this.isLogin) {
      this.router.navigate(['auth/login']);
    } else {
      const getFavoriteArticle = this.getAPI
        .onFavoriteArticle(this.article.slug)
        .subscribe(
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
              timer: 1500
            });
          }
        );

      this.subscriptions.add(getFavoriteArticle);
    }
  }

  unFavoriteArticle() {
    const getUnFavoriteArticle = this.getAPI
      .onUnfavoriteArticle(this.article.slug)
      .subscribe(
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
            timer: 1500
          });
        }
      );

    this.subscriptions.add(getUnFavoriteArticle);
  }

  followArticle() {
    if (!this.isLogin) {
      this.router.navigate(['auth/login']);
    } else {
      const getFollowArticle = this.getAPI
        .onFollowUser(this.article?.author?.username)
        .subscribe(
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
              timer: 1500
            });
          }
        );

      this.subscriptions.add(getFollowArticle);
    }
  }

  unfollowArticle() {
    const getUnfollowArticle = this.getAPI
      .onUnfollowUser(this.article?.author?.username)
      .subscribe(
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
            timer: 1500
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
        const getDeleteArticle = this.getAPI
          .onDeleteArticle(this.article?.slug)
          .subscribe(
            (data: any) => {
              this.router.navigate(['home']);
            },
            (err) => {
              console.log(err);
            }
          );
        this.subscriptions.add(getDeleteArticle);
      }
      Swal.fire({
        icon: 'success',
        iconColor: '#0f0e15',
        confirmButtonColor: '#0f0e15',
        title: 'Delete!',
        text: "Your file has been deleted sucessfully",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
