import { Component, Input, OnInit } from '@angular/core';
import { ConnectApiService } from 'src/app/shared/services/connect-api.service';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  tags: any = [];
  tagsLoaded = false;
  listConfig: any = {
    type: 'all',
    filters: {},
  };

  constructor(
    private homeService: HomeService,
    private connectApiService: ConnectApiService,

  ) {}

  ngOnInit(): void {
    this.homeService.tag.subscribe((res) => {
      this.listConfig = res;
    });

    this.connectApiService.onGetTags().subscribe(res => {
      this.tags = res.tags;
      
    })
  }

  setListTo(type: string = '', filters: any) {
    this.homeService.setTag({ type: type, filters: filters });
  }
}
