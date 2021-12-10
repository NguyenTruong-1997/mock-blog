import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { ConnectApiService } from '../../../../shared/services/connect-api.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
})
export class ProfileFavoritesComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private ConnectApiService: ConnectApiService
  ) {}
  listFavorites: any;
  favorited!: boolean;
  favoritedCount:any = [];
  isLoadingFavorites: boolean = false;
  private routeData: any;
  ngOnInit(): void {
    this.isLoadingFavorites = true;
    this.profileService.currentArticles.pipe(switchMap(articles =>
      this.ConnectApiService.onGetMultiArticlesByFavorited(0,articles)
    ))
    .subscribe((data) => {
      this.listFavorites = data.articles;

      let arr: any= [];
      data.articles.forEach((article: any) => arr.push({Count: article.favoritesCount, status : article.favorited}));
      this.favoritedCount = arr;
      this.isLoadingFavorites =false;
    }, error => {
      console.log(error);
      this.isLoadingFavorites = false;

    });
  }

  onFavoriteArticle(slug: string, index: number){
    return this.ConnectApiService.onFavoriteArticle(slug).subscribe((favorite) => {
      this.favorited = favorite.article.favorited;
      this.favoritedCount[index].Count = favorite?.article.favoritesCount;
      this.favoritedCount[index].status = favorite.article.favorited;
      console.log('favorite');
    })
  }

  onUnfavoriteArticle(slug: string, index: number){
    return this.ConnectApiService.onUnfavoriteArticle(slug).subscribe((favorite) => {
       this.favorited = favorite.article.favorited;
       this.favoritedCount[index].Count = favorite?.article.favoritesCount;
       this.favoritedCount[index].status = favorite.article.favorited;
       console.log(favorite);
     })
}
}
