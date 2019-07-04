import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  radius = 16;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;
  _progress = 0;
  @Input() set progress(progress: number) {
    this._progress = progress > 100 ? 100 : progress < 0 ? 0 : progress;
    const value = this._progress / 100;
    this.dashoffset = this.circumference * (1 - value);
  }

  constructor() {
    this.progress = 20;
  }

  ngOnInit() { }
}
