import {
  Component, Input, OnInit,
} from '@angular/core'

import { iChart } from '../../models/iChart'

declare var uv: any;

@Component({
  selector: 'alep-ng2-chart',
  templateUrl: 'alep-ng2-chart.component.html',
  styleUrls: ['alep-ng2-chart.component.css']
})
export class AlepNg2ChartComponent implements OnInit {
  /*
    Inputs properties defined using the uvCharts API
    (http://imaginea.github.io/uvCharts/documentation.html)
   ****************************************************************************/
  @Input() private inputConfig: Object = {
    effects: {
      duration: 300,
      hovercolor: '#ffff00'
    },
    graph: {
      orientation: 'Vertical',
      palette: 'Soft',
      responsive: true
    },
    meta: {
      position: '.app-uvChart'
    }
  };
  @Input() private inputGraphDef: Object;
  @Input() private inputType: string = 'Bar';
  /****************************************************************************/
  /*
    Input properties defined using the iChart interface. When this object is
    given, its properties override the corresponding properties defined using
    the uvCharts API
  *****************************************************************************/
  @Input() private inputChartObject: iChart;
  /****************************************************************************/
  private chartObject: any;
  private finalConfig: Object = {};
  private finalGraphDef: Object = {};
  private finalType: string;
  private hasValidInput: boolean = true;
  private validTypes: string[] = [
    'Bar',
    'Line',
    'Area',
    'StackedBar',
    'StackedArea',
    'Pie',
    'PercentBar',
    'PercentArea',
    'Donut',
    'StepUpBar',
    'PolarArea',
    'Waterfall',
  ];

  constructor() {
  }

  ngOnInit() {
    this.mergeInputs();
    try {
      this.checkInputValidity();
    }
    catch (error) {
      this.hasValidInput = false;
      console.log('Error: ', error.message, '\n', error.stack);
    }
    if (this.hasValidInput === true) {
      this.createChart();
    }
  }

  /*
    Merge input properties overriding the properties defined using the uvCharts
    API with the corresponding properties defined using the iChart interface
  * */
  private mergeInputs() : void {
    // Copy properties defined with uvCharts API
    for (let prop in this.inputConfig) {
      this.finalConfig[prop] = this.inputConfig[prop];
    }
    for (let prop in this.inputGraphDef) {
      this.finalGraphDef[prop] = this.inputGraphDef[prop];
    }
    this.finalType = this.inputType;
    // Absorb properties defined with iChart interface
    let inputChart: iChart = this.inputChartObject;
    if (inputChart) {
      // Override Type
      this.finalType = inputChart.type;
      // Override graphDef
      this.finalGraphDef['categories'] = [];
      this.finalGraphDef['dataset'] = {};
      for (let collection of inputChart.collections) {
        this.finalGraphDef['categories'].push(collection.dataSet.field);
        this.finalGraphDef['dataset'][collection.dataSet.field] =[];
        for (let label in collection.dataSet.dataPoints) {
          this.finalGraphDef['dataset'][collection.dataSet.field].push(
            {
              name: label,
              value: collection.dataSet.dataPoints[label]
            }
          );
        }
      }
      // Override config
      this.finalConfig['meta']['caption'] = inputChart.title;
      this.finalConfig['meta']['hlabel'] = inputChart.hAxisLabel;
      this.finalConfig['meta']['subcaption'] = inputChart.subTitle;
      this.finalConfig['meta']['vlabel'] = inputChart.vAxisLabel;
    }
  }
  private checkInputValidity() : void {
    let typeIndex: number = this.validTypes.indexOf(this.finalType);
    if (typeIndex === -1) {
      throw new Error(`Chart type '${this.finalType}' is not a valid type.`);
    }
  }
  private createChart() : void {
    this.chartObject = uv.chart(
      this.finalType,
      this.finalGraphDef,
      this.finalConfig
    );
  }
}
