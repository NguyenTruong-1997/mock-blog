import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Article, FormCreateArticle, SingleArticle } from 'src/app/shared/models/article.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConnectApiService } from 'src/app/shared/services/connect-api.service';
import { ProfileService } from '../../service/profile.service';
@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit {
  param: any;
  listArticle!: any;
  Article!: boolean;
  favorited!: boolean;
  favoritedCount:any = [];
  isLoadingArticle: boolean = false;
  constructor(
    private profileService: ProfileService,
    private connectedService: ConnectApiService,
  ) {}

  ngOnInit(): void {
    this.isLoadingArticle = true;
    const subscription = this.profileService.currentArticles.pipe(switchMap(articles =>
      this.connectedService.onGetMultiArticlesByAuthor(0,articles)
    ))
    .subscribe((data : any) => {
      this.listArticle = data.articles;
      console.log(data.articles);
      let arr: any= [];
      data.articles.forEach((article: any) => arr.push({Count: article.favoritesCount, status : article.favorited}));
      this.favoritedCount = arr;
      this.isLoadingArticle = false;
      subscription.unsubscribe();
    }, error => {
      console.log(error);
      this.isLoadingArticle = false;

    })
  }

  onFavoriteArticle(slug: string, index: number){
    return this.connectedService.onFavoriteArticle(slug).subscribe((favorite) => {
      this.favorited = favorite.article.favorited;
      this.favoritedCount[index].Count = favorite?.article.favoritesCount;
      this.favoritedCount[index].status = favorite.article.favorited;
      console.log('favorite');
    })
  }

  onUnfavoriteArticle(slug: string, index: number){
    return this.connectedService.onUnfavoriteArticle(slug).subscribe((favorite) => {
       this.favorited = favorite.article.favorited;
       this.favoritedCount[index].Count = favorite?.article.favoritesCount;
       this.favoritedCount[index].status = favorite.article.favorited;
       console.log(favorite);
     })

   }
  }

