import { RouterModule } from '@angular/router';
import { HomeService } from './service/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { ArticleFeedComponent } from './components/article-feed/article-feed.component';
import { DebounceClickDirective } from '../../shared/directives/debounce.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    HomeComponent,
    ArticleListComponent,
    TagListComponent,
    ArticleFeedComponent,
    DebounceClickDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    LoadingSpinnerModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  providers: [HomeService],
})
export class HomeModule {}
