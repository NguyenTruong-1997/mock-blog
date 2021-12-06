import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from './service/profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileFavoritesComponent } from './components/profile-favorites/profile-favorites.component';
import { ProfileArticleComponent } from './components/profile-article/profile-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticleComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProfileArticleComponent },
      { path: ':username', component: ProfileArticleComponent },
      { path: ':username/favorites', component: ProfileFavoritesComponent }
    ])
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
