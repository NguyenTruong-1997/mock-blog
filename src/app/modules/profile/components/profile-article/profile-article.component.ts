import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormCreateArticle } from 'src/app/shared/models/article.model';
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
  Article!: string;
  favorited!: boolean;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private connectedService: ConnectApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileService.currentArticles.pipe(switchMap(articles =>
      this.connectedService.onGetMultiArticlesByAuthor(0,articles)
    ))
    .subscribe((data) => {
      // data.articles.map(article=>{
      //    this.Article = article.slug;
      //   console.log(this.Article);
      //   }
      //  )
      this.listArticle = data.articles;

    });
  }

  onFavoriteArticle(slug: string){
   return this.connectedService.onFavoriteArticle(slug).subscribe((favorite) => {
      console.log(favorite);
      this.favorited = favorite.article.favorited
    })

  }
  }

