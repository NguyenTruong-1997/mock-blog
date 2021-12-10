import { RouterModule } from '@angular/router';
import { EditorService } from './service/editor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { CandeactiveService } from 'src/app/shared/services/candeactive.service';



@NgModule({
  declarations: [
    EditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingSpinnerModule,
    RouterModule.forChild([
      { path: '', component: EditorComponent, canDeactivate: [CandeactiveService] },
      { path: ':slug', component: EditorComponent, canDeactivate: [CandeactiveService] }
    ])
  ],
  providers: [EditorService, CandeactiveService]
})
export class EditorModule { }
