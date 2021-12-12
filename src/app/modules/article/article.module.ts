import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':slug', component: ArticleComponent }]),
    MatInputModule,
    FormsModule,
    LoadingSpinnerModule,
    MatPaginatorModule
  ],
})
export class ArticleModule {}
