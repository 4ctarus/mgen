import { Injectable } from '@angular/core';
import { TimeTask } from '../models/task';
import { HttpClient } from '@angular/common/http';
import Survey from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSurvey(type: number) {
    switch (type) {
      case 13:
      case 17:
        return;

      default:
        return this.http.get<Survey>(`./assets/survey/${type}.json`);
        break;
    }
  }

  getPeriods() {
    return this.http.get<{data: any[]}>(`./assets/test/periods.json`);
  }

  toTimeTask(data: any[], date: Date): TimeTask {
    const tt: TimeTask = {};
    const sdate = date.toISOString().substr(0, 10).replace(/-/g, '');
    data.forEach(period => {
      const dateFrom = period.date_from.replace(/-/g, '');
      const dateTo = period.date_to.replace(/-/g, '');
      // TODO: check date day
      if (sdate > dateFrom && sdate < dateTo) {
        // add
        const hour = period.hour_from.substr(0, 2);
        if (!tt.hasOwnProperty(hour)) {
          tt[hour] = [];
        }
        tt[hour].push({
          id: period.id,
          type: period.title,
          progress: 0
        });
      }
    });
    console.log(tt);
    return tt;
  }
}
