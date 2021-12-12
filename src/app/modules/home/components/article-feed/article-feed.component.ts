import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.scss'],
})
export class ArticleFeedComponent implements OnInit {
  listConfig: any = {
    type: 'all',
    filters: '',
  };

  constructor(private homeService: HomeService,private blogService: BlogService,
    private router: Router) {}

  ngOnInit(): void {
    this.homeService.tag.subscribe((res) => {
      this.listConfig = res;
    });
  }

  setListTo(type: string = '', filters?: '') {
    if (type === 'feed' && !this.blogService.isLogin()) {
      this.router.navigateByUrl('auth/login');
      return;
    }
    this.homeService.setTag({ type: type, filters: filters });
  }
}
