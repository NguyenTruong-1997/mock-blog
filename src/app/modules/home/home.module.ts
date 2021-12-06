import { RouterModule } from '@angular/router';
import { HomeService } from './service/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ArticleComponent } from './components/article/article.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    ArticleComponent,
    TagListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ],
  providers: [HomeService]
})
export class HomeModule { }
