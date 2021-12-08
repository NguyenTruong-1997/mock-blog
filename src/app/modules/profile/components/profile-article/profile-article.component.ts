import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit {
  param: any;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.param = params;
    });

    this.profileService.currentArticles.next(this.param);
  }
}
