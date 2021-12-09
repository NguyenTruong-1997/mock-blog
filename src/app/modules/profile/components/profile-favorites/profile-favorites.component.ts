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
  listFavorites: any
  private routeData: any;
  ngOnInit(): void {

    this.profileService.currentArticles.pipe(switchMap(articles =>
      this.ConnectApiService.onGetMultiArticlesByFavorited(0,articles)
    ))
    .subscribe((data) => {
      this.listFavorites = data.articles;
    });
  }
}
