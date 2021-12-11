import { Component, OnInit } from '@angular/core';
import {  switchMap } from 'rxjs/operators';
import { ConnectApiService } from 'src/app/shared/services/connect-api.service';

import { Article } from '../../../../shared/models/article.model';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  results: Article[] = [];
  loading: boolean = true;

  constructor(
    private connectApiService: ConnectApiService,
    private homeService: HomeService
  ) {}


  ngOnInit(): void {
    this.homeService.tag.pipe(
      switchMap((name:any) => {
        if(name.type === "all"){
          console.log(name.type);          
          return this.connectApiService.onGetGlobalFeedArticles(0);
        }else if(name.type === "feed"){
          console.log(name.type);
          return this.connectApiService.onGetMyFeedArticles(0);
        }else {
          return this.connectApiService.onGetMultiArticlesByTag(0,name.filters);
        }
      })
    ).subscribe(res => {
      this.loading = false;
      this.results = res!.articles;
    })
    
  }

  tonggleFavorite(article: any,i:number) {
    if (article.favorited) {
      this.connectApiService
        .onUnfavoriteArticle(article.slug)
        .subscribe((res) => 
        {
          this.results[i].favoritesCount = res.article.favoritesCount;
          this.results[i].favorited = res.article.favorited;
        }
         );
      console.log("del");
    } else {
      this.connectApiService
      .onFavoriteArticle(article.slug)
      .subscribe((res) => 
      {
        this.results[i].favoritesCount = res.article.favoritesCount;
        this.results[i].favorited = res.article.favorited;
      });
    console.log("post");
    }
  }

}
