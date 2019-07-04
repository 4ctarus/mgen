import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  _progress = 0;
  @Input() set progress(progress: number) {
    this._progress = progress > 100 ? 100 : progress < 0 ? 0 : progress;
  }

  constructor() { }

  ngOnInit() {
  }

}
