import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import Survey from '../models/survey';
import { FormGroup, AbstractControl, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Task from '../models/task';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  fg = new FormGroup({});
  surveys: Survey[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private task: Task,
    private dialogRef: MatDialogRef<TaskComponent>,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) {
    // add param in url to be able to back
    this.router.navigate([], {
      fragment: 'task',
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit() {
    console.log(this.task);
    const apisurvey = this.api.getSurvey(this.task.type);
    if (apisurvey) {
      apisurvey.subscribe(
        survey => {
          survey.id = this.task.id;
          // set last value
          if (this.task.value) {
            survey.questions.forEach((question, i) => {
              question.value = this.task.value[i];
            });
          }
          console.log(survey, this.fg);
          this.surveys.push(survey);
        }
      );
    }
  }

  ngOnDestroy() {
    this.close();
  }

  private close(completed: boolean = false) {
    const value = {};
    Object.keys(this.fg.value).forEach(k => {
      value[k] = {
        value: this.fg.value[k],
        progress: completed ? 100 : this.getProgress(k)
      };
    });
    this.dialogRef.close(value);
  }

  getProgress(index: string) {
    const fa = (this.fg.controls[index] as FormArray);
    let invalid = 0;
    fa.controls.forEach(x => {
      // for checkbox 
      if (x.value instanceof Array && x.value.filter(x => x).length === 0) {
        invalid++;
      }
      if (x.invalid) {
        invalid++;
      }
    });
    return Math.round((fa.length - invalid) * 100 / fa.length);
  }

  onSubmit() {
    let scrolled = false;
    Object.keys(this.fg.controls).forEach(i => {
      const fa = this.fg.controls[i] as FormArray;

      fa.controls.forEach((control: FormControl | FormArray, y) => {
        // scroll to first invalid input
        if (!scrolled && control.status === 'INVALID') {
          scrolled = true;
          control.markAsTouched();
          this.scrolltoId('label-' + i + '-' + y);
        }
      });

      if (!scrolled) {
        this.close(true);
      }
    });

    console.log(this.fg);
  }

  scrolltoId(id: string) {
    const input = document.getElementById(id);
    if (input) {
      input.focus({ preventScroll: true });
      input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
}
