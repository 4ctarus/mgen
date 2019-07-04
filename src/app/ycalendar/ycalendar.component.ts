import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const DAY = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

@Component({
  selector: 'app-ycalendar',
  templateUrl: './ycalendar.component.html',
  styleUrls: ['./ycalendar.component.scss']
})
export class YcalendarComponent implements OnInit {
  days: Day[] = [];
  @Output() dayChanged = new EventEmitter<boolean>();

  constructor(private sanitize: DomSanitizer) { }

  ngOnInit() {
    const date = new Date();
    for (let i = 0; i < 10; i++) {
      const dateiso = date.toISOString();
      this.days.push({
        d: dateiso.substr(0, 10),
        date: dateiso.substr(8, 2),
        day: DAY[date.getDay()]
      });
      date.setDate(date.getDate() + 1);
    }
    this.days[0].active = true;
  }

  selectDay(index: number) {
    this.days.forEach(day => {
      delete day.active;
    });
    this.days[index].active = true;
    this.dayChanged.emit(true);
  }

  /*getRandomBorderRadius() {
    const br = [[], []];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        br[i].push(Math.floor(Math.random() * (70 - 30)) + 30);
      }
    }
    console.log(br[0].join('% ') + '% / ' + br[1].join('% ') + '%');
    return this.sanitize.bypassSecurityTrustStyle(br[0].join('% ') + '% / ' + br[1].join('% ') + '%');
  }*/
}

interface Day {
  active?: boolean;
  date: string;
  d: string;
  day: string;
}
