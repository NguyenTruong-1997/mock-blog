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
  length!: number;
  offset: number = 0;
  limit: number=5

  ngOnInit(): void {
    this.isLoadingFavorites = true;
    this.profileService.currentArticles.pipe(switchMap(articles =>
      this.ConnectApiService.onGetMultiArticlesByFavorited(this.limit ,this.offset,articles)
    ))
    .subscribe((data) => {
      this.listFavorites = data.articles;
      this.length = data.articlesCount;
      this.isLoadingFavorites =false;
    }, error => {
      console.log(error);
      this.isLoadingFavorites = false;

    });
  }

  handlePage(e:any){
    this.offset = e.pageIndex * e.pageSize;
    this.limit = e.pageSize;
    this.profileService.currentArticles.pipe(switchMap(articles =>
      this.ConnectApiService.onGetMultiArticlesByFavorited(this.limit ,this.offset,articles)
    ))
    .subscribe((data : any) => {
      this.listFavorites = data.articles;
     })
     window.scrollTo(0, 500);
  }

  onFavoriteArticle(slug: string, index: number){
    return this.ConnectApiService.onFavoriteArticle(slug).subscribe((favorite) => {
      this.listFavorites[index].favorited = favorite.article.favorited;
      this.listFavorites[index].favoritesCount = favorite.article.favoritesCount;
    })
  }

  onUnfavoriteArticle(slug: string, index: number){
    return this.ConnectApiService.onUnfavoriteArticle(slug).subscribe((favorite) => {
      this.listFavorites[index].favorited = favorite.article.favorited;
      this.listFavorites[index].favoritesCount = favorite.article.favoritesCount;
     })
}
}
