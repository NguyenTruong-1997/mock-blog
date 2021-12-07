import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileService } from './service/profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileFavoritesComponent } from './components/profile-favorites/profile-favorites.component';
import { ProfileArticleComponent } from './components/profile-article/profile-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticleComponent,
    ProfileFavoritesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        children: [
          { path: ':username', component: ProfileArticleComponent },
          { path: ':username/favorites', component: ProfileFavoritesComponent },
          { path: '', redirectTo: 'username', pathMatch: 'full' },
        ],
      },
    ]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
