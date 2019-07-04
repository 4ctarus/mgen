import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import Survey from '../models/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input() survey: Survey;
  @Input() fg: FormGroup;
  fai = new FormArray([]);

  constructor() { }

  ngOnInit() {
    this.survey.questions.forEach(question => {
      const required = question.required ? Validators.required : null;
      if (question.multiple) {
        this.fai.push(
          new FormArray(
            question.choices.map(x => new FormControl(question.value && question.value.includes(x.value))), required));
      } else {
        this.fai.push(new FormControl(question.value, required));
      }
    });
    this.fg.addControl('' + this.survey.id, this.fai);
  }
}
