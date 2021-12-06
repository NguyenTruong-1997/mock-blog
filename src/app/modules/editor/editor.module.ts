import { RouterModule } from '@angular/router';
import { EditorService } from './service/editor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: EditorComponent }
    ])
  ],
  providers: [EditorService]
})
export class EditorModule { }
