import { ConnectApiService } from './../../shared/services/connect-api.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { SingleArticle } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  //#region Properties
  public subscriptions = new Subscription();

  public isEdit = false;

  public isLoading = false;

  public articleTitle = '';
  public articleDescription = '';
  public articleBody = '';
  public articleTagList = '';

  public slug: string = '';

  //#end region

  //#region Constructor
  public constructor(
    private route: ActivatedRoute,
    private api: ConnectApiService,
    private router: Router
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    const paramsSub = this.route.params
      .pipe(
        filter((params) => params.slug != null),
        switchMap((params: Params) => {
          this.isEdit = params.slug != null;
          this.isLoading = true;
          return this.api.onGetArticleBySlug(params.slug);
        })
      )
      .subscribe(
        (res: SingleArticle) => {
          this.articleTitle = res.article.title;
          this.articleDescription = res.article.description;
          this.articleBody = res.article.body;
          this.articleTagList = res.article.tagList.join(',');
          this.slug = res.article.slug;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );

    this.subscriptions.add(paramsSub);
  }

  public onSubmit(form: NgForm) {
    this.isLoading = true;

    if (this.isEdit) {
      const editArticleSub = this.api
        .onUpdateArticle(
          {
            ...form.value,
            tagList: form.value.tagList.split(','),
          },
          this.slug
        )
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.router.navigate([`../article/`, res.article.slug]);
          },
          (err) => {
            alert('Title ' + err.error.errors.title);
            this.isLoading = false;
          }
        );
      this.subscriptions.add(editArticleSub);
      return;
    }

    const createArticleSub = this.api
      .onCreateArticle({
        ...form.value,
        tagList: form.value.tagList.split(','),
      })
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate([`../article/`, res.article.slug]);
        },
        (err) => {
          alert('Title ' + err.error.errors.title);
          this.isLoading = false;
        }
      );

    this.subscriptions.add(createArticleSub);
  }

  public ngOnDestroy(): void {
    if (this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
