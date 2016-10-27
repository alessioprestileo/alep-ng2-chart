import { Component, OnInit } from '@angular/core';

import { iChart } from './shared/models/iChart'

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private chartInput: { config: Object, graphDef: Object, type: string } = {
    config: {},
    graphDef: {},
    type: null,
  };
  private chartObject: iChart;

  constructor() {
  }

  ngOnInit() {
    this.setChartInput();
    this.setChartObject();
  }

  private setChartInput() : void {
    this.chartInput.graphDef = {
      categories : ['uvCharts', 'Matisse', 'SocialByWay'],
      dataset : {
        'uvCharts' : [
          { name : '2008', value: 15},
          { name : '2009', value: 28},
          { name : '2010', value: 42},
          { name : '2011', value: 88},
          { name : '2012', value: 100},
          { name : '2013', value: 143}
        ],
        'Matisse' : [
          { name : '2008', value: 15 * 1.2},
          { name : '2009', value: 28 * 1.2},
          { name : '2010', value: 42 * 1.2},
          { name : '2011', value: 88 * 1.2},
          { name : '2012', value: 100 * 1.2},
          { name : '2013', value: 143 * 1.2}
        ],
        'SocialByWay' : [
          { name : '2008', value: 15 * 0.8},
          { name : '2009', value: 28 * 0.8},
          { name : '2010', value: 42 * 0.8},
          { name : '2011', value: 88 * 0.8},
          { name : '2012', value: 100 * 0.8},
          { name : '2013', value: 143 * 0.8}
        ]
      }
    };
  }
  private setChartObject() : void {
    this.chartObject = {
      collections: [
        {
          dataSet: {
            dataPoints: {
              '2008': 15,
              '2009': 28,
              '2010': 42,
              '2011': 88,
              '2012': 100,
              '2013': 143
            },
            field: 'uvCharts',
            ticker: 'Projects'
          },
          id: 1,
          name: 'Collection_1'
        },
        {
          dataSet: {
            dataPoints: {
              '2008': 15 * 1.2,
              '2009': 28 * 1.2,
              '2010': 42 * 1.2,
              '2011': 88 * 1.2,
              '2012': 100 * 1.2,
              '2013': 143 * 1.2
            },
            field: 'Matisse',
            ticker: 'Projects'
          },
          id: 2,
          name: 'Collection_2'
        }
      ],
      hAxisLabel: 'Years',
      id: 1,
      name: 'Chart_1',
      title: 'Number of developers per project from 2008 to 2013',
      subTitle: 'Source: Internal database',
      type: 'Line',
      vAxisLabel: 'N. of Developers'
    }
  }
}
