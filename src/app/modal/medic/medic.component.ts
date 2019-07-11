import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Task from 'src/app/models/task';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.scss']
})
export class MedicComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<MedicComponent>,
    private router: Router,
    private location: Location) {
      // add param in url to be able to back
      this.router.navigate([], {
        fragment: 'medic',
        queryParamsHandling: 'merge'
      });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.close();
  }

  private close(completed: boolean = false) {
    this.location.back();

    if (this.task.medic.total === this.task.medic.actual) {
      this.task.progress = 100;
    }
    this.dialogRef.close(this.task);
  }

  onSubmit() {
    this.close();
  }
}
