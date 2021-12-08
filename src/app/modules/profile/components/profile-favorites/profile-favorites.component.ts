import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}
  private routeData: any;
  ngOnInit(): void {
    this.profileService.currentArticles.subscribe((articles) => {
      console.log(articles);
    });
  }
}
