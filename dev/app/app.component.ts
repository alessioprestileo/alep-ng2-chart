import { Component, OnInit } from '@angular/core';

import { iAlepNg2InputChart } from './shared/models/iAlepNg2InputChart'

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private chartInput: iAlepNg2InputChart;

  constructor() {
  }

  ngOnInit() {
    this.setChartInput();
  }

  private setChartInput() : void {
    this.chartInput = {
      id: 2,
      collections: [
        {
          id: 3,
          dataSet: {
            "ticker": 'Portland, OR from 2016/09/12 to 2016/09/18',
            "field": 'Max temperature (°F)',
            "dataPoints": {
              "Monday": 78.4,
              "Tuesday": 80.2,
              "Wednesday": 84.7,
              "Thursday": 82.8,
              "Friday": 86.2,
              "Saturday": 71.8,
              "Sunday": 72.0,
            }
          },
          label: 'Max daily temperature',
          name: 'Max daily temperature (Fahrenheit) in Portland, OR from ' +
          '2016/09/12 to 2016/09/18'
        },
        {
          id: 5,
          dataSet: {
            "ticker": 'Portland, OR from 2016/09/12 to 2016/09/18',
            "field": 'Min temperature (°F)',
            "dataPoints": {
              "Monday": 50.4,
              "Tuesday": 48.6,
              "Wednesday": 50.4,
              "Thursday": 55.8,
              "Friday": 62.2,
              "Saturday": 63.1,
              "Sunday": 53.2,
            }
          },
          label: 'Min daily temperature',
          name: 'Min daily temperature (Fahrenheit) in Portland, OR from ' +
          '2016/09/12 to 2016/09/18'
        },
        {
          id: 7,
          dataSet: {
            "ticker": 'Portland, OR from 2016/09/12 to 2016/09/18',
            "field": 'Avg temperature (°F)',
            "dataPoints": {
              "Monday": 64.7,
              "Tuesday": 66.7,
              "Wednesday": 66.6,
              "Thursday": 65.1,
              "Friday": 67.6,
              "Saturday": 64.7,
              "Sunday": 65.0,
            }
          },
          label: 'Avg daily temperature',
          name: 'Avg daily temperature (Fahrenheit) in Portland, OR from ' +
          '2016/09/12 to 2016/09/18'
        }
      ],
      hAxisLabel: 'Days',
      name: 'Max, min and avg temp-(°F)-daily-Portland, OR-2016/09/12 to ' +
      '2016/09/18',
      subtitle: 'from 2016/09/12 to 2016/09/18',
      title: 'Max, min, and avg daily temperature (°F) in Portland, OR',
      type: 'Line',
      vAxisLabel: 'Temperature (°F)'
    };
  }
}
