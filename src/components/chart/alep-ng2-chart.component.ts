import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnInit, ViewChild
} from '@angular/core'

import { iChart } from '../../models/iChart'

declare var uv: any;

@Component({
  selector: 'alep-ng2-chart',
template: `
<div>
  <div class="alep-ng2-chart-caption">
    {{caption}}
  </div>
    <div class="alep-ng2-chart-subCaption">
        {{subCaption}}
    </div>
  <div #alepNg2ChartContainer class="alep-ng2-chart-container">
  </div>
</div>

`,
styles: [
`.alep-ng2-chart-caption {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
.alep-ng2-chart-container {
  height: 100%;
  width: 100%;
}
.alep-ng2-chart-subCaption {
  font-size: 1.5rem;
  text-align: center;
}
@media (min-width: 376px) and (max-width: 767px) {
  .alep-ng2-chart-caption {
    font-size: 1.2rem;
  }
  .alep-ng2-chart-subCaption {
    font-size: 0.8rem;
  }
}
@media (max-width: 375px) {
  .alep-ng2-chart-caption {
    font-size: 0.7rem;
  }
  .alep-ng2-chart-subCaption {
    font-size: 0.5rem;
  }
}`],
})
export class AlepNg2ChartComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.emOnResize.emit();
  }
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
    meta: {}
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
  @ViewChild(
      'alepNg2ChartContainer'
  ) private alepNg2ChartContainerChild: ElementRef;
  private caption: string;
  private chartContainerId: number;
  private chartObject: any;
  private emOnResize: EventEmitter<any> = new EventEmitter();
  private finalConfig: Object = {};
  private finalGraphDef: Object = {};
  private finalType: string;
  private hasValidInput: boolean = true;
  private subCaption: string;
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
    this.emOnResize.subscribe(() => this.updateChart());
    this.setChartContainerId();
    this.buildChart();
  }

  private buildChart() : void {
    this.processInputs(
        this.inputConfig, this.inputGraphDef, this.inputType,
        this.inputChartObject, this.chartContainerId
    );
    try {
      this.checkInputValidity(this.finalType, this.validTypes);
    }
    catch (error) {
      this.hasValidInput = false;
      console.log('Error: ', error.message, '\n', error.stack);
    }
    if (this.hasValidInput === true) {
      this.prepareContainer(this.chartContainerId);
      this.preFormat();
      this.createChart(this.finalConfig, this.finalGraphDef, this.finalType);
      this.postFormat();
    }
  }
  private checkInputValidity(finalType: string, validTypes: string[]) : void {
    let typeIndex: number = validTypes.indexOf(finalType);
    if (typeIndex === -1) {
      throw new Error(`Chart type '${finalType}' is not a valid type.`);
    }
  }
  private createChart(
      finalConfig: Object, finalGraphDef: Object, finalType: string
  ) : void {
    this.chartObject = uv.chart(
        finalType,
        finalGraphDef,
        finalConfig
    );
  }
  private isMobile() : boolean {
    let result : boolean;
    result = window.innerWidth <= 768 ?
        true :
        false;
    return result;
  }
  private preFormat() : void {
    if (this.isMobile()) {
      this.finalConfig['axis'] = {};
      this.finalConfig['axis']['fontsize'] = 25;
      this.finalConfig['label'] = {};
      this.finalConfig['label']['fontsize'] = 20;
    }
    else {
      this.finalConfig['axis'] = {};
      this.finalConfig['axis']['fontsize'] = 14;
      this.finalConfig['label'] = {};
      this.finalConfig['label']['fontsize'] = 11;
    }
  }
  private postFormat() : void {
    let container: HTMLElement = this.alepNg2ChartContainerChild.nativeElement;
    let legendElements: any = container
        .getElementsByClassName('uv-chart-div')[0]
        .getElementsByClassName('uv-frame')[0]
        .getElementsByClassName('uv-panel')[0]
        .getElementsByClassName('uv-legend')[0]
        .getElementsByTagName('g');
    let dy: number;
    for (let i = 0; i < legendElements.length; i++) {
      let dx: number = 150 * (i % 2);
      dy = 30 * Math.floor(i / 2);
      legendElements[i].setAttribute('transform', `translate(${dx},${dy})`);
      legendElements[i].getElementsByTagName('rect')[0]
          .setAttribute('height', '20');
      legendElements[i].getElementsByTagName('rect')[0]
          .setAttribute('width', '20');
      legendElements[i].getElementsByTagName('text')[0]
          .setAttribute('dx', '25');
      legendElements[i].getElementsByTagName('text')[0]
          .setAttribute('dy', '0.85em');
      legendElements[i].getElementsByTagName('text')[0]
          .style.fontSize = '25px';
    }
    let newHeight: number = 600 + dy;
    let frame: any = container
        .getElementsByClassName('uv-chart-div')[0]
        .getElementsByClassName('uv-frame')[0];
    frame.setAttribute('viewBox', `0 0 600 ${newHeight}`);
    console.log('frame height = ', frame.getAttribute('height'));
  }
  private prepareContainer(chartContainerId: number) : void {
    this.alepNg2ChartContainerChild.nativeElement.setAttribute(
        'id', chartContainerId
    );
  }
  /*
   Merge input properties received, overriding the properties defined using the
   uvCharts API with the corresponding properties defined using the iChart
   interface. Define CSS selector for the chart container.
   Copy caption and subcaption data and take them out of the influence of the
   uvCHarts API.
   * */
  private processInputs(
      inputConfig: Object, inputGraphDef: Object, inputType: string,
      inputChart: iChart, chartContainerId: number
  ) : void {
    // Copy properties defined with uvCharts API
    for (let prop in inputConfig) {
      this.finalConfig[prop] = inputConfig[prop];
    }
    for (let prop in inputGraphDef) {
      this.finalGraphDef[prop] = inputGraphDef[prop];
    }
    this.finalType = inputType;
    // Absorb properties defined with iChart interface
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
    // Define chart container by using CSS selector
    this.finalConfig['meta']['position'] =
        '.alep-ng2-chart-container[id="' + chartContainerId + '"]';
    // Export caption and subcaption data and remove them from the influence of
    // the uvCHarts API
    this.caption = this.finalConfig['meta']['caption'];
    this.finalConfig['meta']['caption'] = '';
    this.subCaption = this.finalConfig['meta']['subcaption'];
    this.finalConfig['meta']['subcaption'] = '';
  }
  private setChartContainerId() : void {
    if (!window['alep-ng2-chart']) {
      window['alep-ng2-chart'] = {};
      if (!window['alep-ng2-chart']['nextChartContainerId']) {
        window['alep-ng2-chart']['nextChartContainerId'] = 1;
      }
    }
    let containerId: number =
        window['alep-ng2-chart']['nextChartContainerId'] ++;
    this.chartContainerId = containerId;
  }
  private updateChart() : void {
    delete this.chartObject;
    let parent: HTMLElement = this.alepNg2ChartContainerChild.nativeElement;
    let child: HTMLElement = parent.getElementsByTagName('div')[0];
    parent.removeChild(child);
    this.buildChart();
  }
}
