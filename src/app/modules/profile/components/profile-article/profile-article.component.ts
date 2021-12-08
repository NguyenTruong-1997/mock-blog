import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.username);
    });
  }
}
