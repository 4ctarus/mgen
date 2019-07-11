import { Component, OnInit, ViewChild } from '@angular/core';
import Task, { TimeTask } from '../models/task';
import { MatDialog } from '@angular/material';
import { ApiService } from '../service/api.service';
import { YcalendarComponent } from '../ycalendar/ycalendar.component';
import { MedicComponent } from '../modal/medic/medic.component';
import { SurveyComponent } from '../modal/survey/survey.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(YcalendarComponent, { static: false }) ycalendarComponent: YcalendarComponent;

  timeTasks: TimeTask = {};
  completed = {
    value: 0,
    total: 0
  };

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.api.getPeriods().subscribe(
      periods => {
        console.log(periods);
        this.timeTasks = this.api.toTimeTask(
          periods.data,
          new Date(this.ycalendarComponent.days.filter(x => x.active)[0].d));
        this.checkCompleted();
      }
    );
  }

  checkCompleted() {
    const flat = [].concat.apply([], Object.values(this.timeTasks));
    this.completed.value = flat.filter(x => x.progress >= 100).length;
    this.completed.total = flat.length;
    console.log(this.completed);
  }

  /*openFormTask(task: Task) {
    if (task.progress >= 100) {
      return;
    }
    const dialogRef = this.dialog.open(TaskComponent, {
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      panelClass: 'custom-dialog',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      Object.keys(result).forEach(key => {
        const value = result[key].value;
        const progress = result[key].progress;

        Object.keys(this.timeTasks).forEach(hour => {
          this.timeTasks[hour].forEach(task => {
            if ('' + task.id === key) {
              task.value = value;
              task.progress = progress;
              console.log('finded', task);
            }
          });
        });
      });

      this.checkCompleted();
    });
  }*/

  openFormTask(task: Task) {
    if (task.progress >= 100) {
      return;
    }
    this.dialog.open(SurveyComponent, {
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      panelClass: 'custom-dialog',
      data: task
    });
  }

  openMedicModal(task: Task) {
    if (task.progress >= 100) {
      return;
    }
    this.dialog.open(MedicComponent, {
      width: '100vw',
      maxWidth: '100vw',
      position: {
        bottom: '0'
      },
      panelClass: 'custom-dialog',
      data: task
    });
  }
}
