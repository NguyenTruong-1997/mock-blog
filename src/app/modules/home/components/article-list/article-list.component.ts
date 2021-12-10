import { Component, OnInit } from '@angular/core';
import { ConnectApiService } from 'src/app/shared/services/connect-api.service';

import { Article } from '../../../../shared/models/article.model';
import { HomeService } from '../../service/home.service';

// import {}
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  results: Article[] = [];
  loading: boolean = true;
  touchedFavorite: boolean = false;
  countFavorite: any[] = [];
  stateFavorite : boolean = false;

  constructor(
    private connectApiService: ConnectApiService,
    private homeService: HomeService
  ) {}


  ngOnInit(): void {
    this.homeService.tag.pipe(
      concatMap()
    )
    
    
    
    
    subscribe((res: any) => {
      if (res.type === 'all') {
        this.connectApiService.onGetGlobalFeedArticles(0).subscribe((data) => {
          if (data) {
            this.loading = false;
            this.results = data.articles;
            console.log(data.articles);
            
            if(this.countFavorite.length === 0) {
              this.results.forEach(countF => {
                this.countFavorite.push({count : countF.favoritesCount , status : countF.favorited , slug : countF.slug})
              })
              console.log(this.countFavorite);
            }
          }
        });
      } else if (res.type === 'feed') {
        this.connectApiService.onGetMyFeedArticles(0).subscribe((data) => {
          if (data) {
            this.loading = false;
            this.results = data.articles;
            console.log(this.results);
          }
        });
      }
    });

    this.homeService.tagName.subscribe((res) => {
      this.connectApiService
        .onGetMultiArticlesByTag(0, res)
        .subscribe((data) => {
          this.results = data.articles;
        });
    });
  }

  tonggleFavorite(article: any,i:number) {
    if ( this.countFavorite[i].status) {
      this.homeService
        .onFavoriteArticleDel(article.slug)
        .subscribe((res) => 
        {
          let index = this.countFavorite.findIndex(el => el.slug === article.slug)
          this.countFavorite[index] = {count : res.article.favoritesCount , status : false, slug : article.slug }
          console.log(this.countFavorite , index);
        }
         );
      console.log("del");
    } else {
      this.homeService
        .onFavoriteArticlePost(article.slug)
        .subscribe((res) => 
        {
          let index = this.countFavorite.findIndex(el => el.slug === article.slug)
          this.countFavorite[index] = {count : res.article.favoritesCount , status : true , slug : article.slug }
          console.log(this.countFavorite , index);
        });
      console.log("post");
    }
  }

  onDestroy() {
    this.loading = true;
  }
}
