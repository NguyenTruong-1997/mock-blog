import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ArticleComponent }]),
    MatInputModule,
  ],
})
export class ArticleModule {}
