import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    MatDialogModule,
    MatIconModule
  ]
})
export class AppMaterialModule { }
