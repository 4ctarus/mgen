import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Task from 'src/app/models/task';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Survey from 'src/app/models/survey';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) f: NgForm;
  survey: Survey;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<SurveyComponent>,
    private api: ApiService,
    private router: Router) {
    // add param in url to be able to back
    this.router.navigate([], {
      fragment: 'survey',
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit() {
    // get task type survey
    const apisurvey = this.api.getSurvey(this.task.type);
    if (apisurvey) {
      apisurvey.subscribe(
        survey => {
          survey.id = this.task.id;
          // set first value to bind on it
          if (!this.task.value) {
            this.task.value = {};
            survey.questions.forEach((question, i) => {
              this.task.value[i] = question.value ?
                question.value :
                question.multiple ?
                  Object.assign({}, (question.choices || []).map(x => null)) :
                  null;
            });
          }
          this.survey = survey;
          console.log(survey, this.task);
        }
      );
    }
  }

  ngOnDestroy() {
    this.close();
  }

  onSubmit() {
    console.log(this.f, this.task);

    let scrolled = false;
    Object.keys(this.f.controls).forEach(i => {
      const control = this.f.controls[i] as FormControl;

      if (!scrolled && control.status === 'INVALID') {
        scrolled = true;
        control.markAsTouched();
        this.scrolltoId('label-' + this.task.id + '-' + i);
      }
    });
    if (!scrolled) {
      this.close(true);
    }
  }

  private close(completed: boolean = false) {
    this.router.navigate([]);
    if (this.f) {
      this.task.progress = completed ? 100 : this.getProgress();
    }
    this.dialogRef.close(this.task);
  }

  private getProgress(): number {
    let invalid = 0;
    const fc = Object.keys(this.f.controls);

    fc.forEach(i => {
      const control = this.f.controls[i];
      // for checkbox
      if (control.value instanceof Array && control.value.filter(x => x).length === 0) {
        invalid++;
      }
      if (control.invalid) {
        invalid++;
      }
    });
    return Math.round((fc.length - invalid) * 100 / fc.length);
  }

  private scrolltoId(id: string) {
    const input = document.getElementById(id);
    if (input) {
      input.focus({ preventScroll: true });
      input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
}
