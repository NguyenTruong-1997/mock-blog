import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap } from 'rxjs/operators';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ConnectApiService } from 'src/app/shared/services/connect-api.service';

import { Article } from '../../../../shared/models/article.model';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})

export class ArticleListComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  results: Article[] = [];
  loading: boolean = true;
  offset: number = 0;
  limit: number = 5;
  length: number = 0;
  listConfig:any = {};
  checkOffset:boolean = false;

  constructor(
    private connectApiService: ConnectApiService,
    private homeService: HomeService,
    private blogService : BlogService
  ) {}

  ngOnInit(): void {
    this.homeService.tag
      .pipe(
        switchMap((name: any) => {
          if (name.type === 'all') {
            this.loading = true;
            this.listConfig = name;
            console.log(name.type);
            return this.connectApiService.onGetGlobalFeedArticles(
              this.limit,
              this.offset
            );
          } else if (name.type === 'feed') {
            this.loading = true;
            this.listConfig = name;
            console.log(name.type);
            return this.connectApiService.onGetMyFeedArticles(
              this.limit,
              this.offset
            );
          } else {
            this.loading = true;
            this.offset = 0
            this.listConfig = name;
            return this.connectApiService.onGetMultiArticlesByTag(
              this.limit,
              this.offset,
              name.filters
            );
          }
        })
      )
      .subscribe((res) => {
        this.paginator.firstPage();
        this.loading = false;
        this.results = res!.articles;
        this.length = res.articlesCount;
      });
  }

  tonggleFavorite(article: any, i: number) {
    if(this.blogService.isLogin()){
      if (article.favorited) {
        this.connectApiService
          .onUnfavoriteArticle(article.slug)
          .subscribe((res) => {
            this.results[i].favoritesCount = res.article.favoritesCount;
            this.results[i].favorited = res.article.favorited;
          });
        console.log('del');
      } else {
        this.connectApiService
          .onFavoriteArticle(article.slug)
          .subscribe((res) => {
            this.results[i].favoritesCount = res.article.favoritesCount;
            this.results[i].favorited = res.article.favorited;
          });
        console.log('post');
      }
    }
    else {
      
    }
  }
  handlePage(e: any) {
    if(this.listConfig.type === 'all') {
      this.offset = e.pageSize * e.pageIndex;
      this.limit = e.pageSize;
      this.connectApiService
        .onGetGlobalFeedArticles(this.limit, this.offset)
        .subscribe((res: any) => {
          this.results = res.articles;
        },
        (err) => {
          if (err.error instanceof Error) {
            console.log(`'An error occurred:', ${err.error.message}`);
          } else {
            console.log(
              `Backend returned code ${err.status}, body was: ${err.error}`
            );
          }
        }
        );
    }
    else if(this.listConfig.type === 'feed') {
      this.offset = e.pageSize * e.pageIndex;
      this.limit = e.pageSize;
      this.connectApiService
        .onGetMyFeedArticles(this.limit, this.offset)
        .subscribe((res: any) => {
          this.results = res.articles;
        },
        (err) => {
          if (err.error instanceof Error) {
            console.log(`'An error occurred:', ${err.error.message}`);
          } else {
            console.log(
              `Backend returned code ${err.status}, body was: ${err.error}`
            );
          }
        });
    }
    else if(this.listConfig.filters) {
      this.offset = e.pageSize * e.pageIndex;
      this.limit = e.pageSize;
      this.connectApiService
        .onGetMultiArticlesByTag(this.limit, this.offset, this.listConfig.filters)
        .subscribe((res: any) => {
          this.results = res.articles;
        },
        (err) => {
          if (err.error instanceof Error) {
            console.log(`'An error occurred:', ${err.error.message}`);
          } else {
            console.log(
              `Backend returned code ${err.status}, body was: ${err.error}`
            );
          }
        });
      }
      window.scrollTo(0, 0);
  }
}
