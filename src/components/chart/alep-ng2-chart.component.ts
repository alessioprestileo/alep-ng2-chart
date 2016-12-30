import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy,
  OnInit, ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { Chart } from '../../models/Chart';
import { iAlepNg2InputChart } from '../../models/iAlepNg2InputChart';
import { iStylingChart } from '../../models/iStylingChart';

declare var d3: any;

interface iDefaultChartStylings {
  barStyling: iStylingChart,
  donutStyling: iStylingChart,
  lineStyling: iStylingChart,
  pieStyling: iStylingChart
}

@Component({
  selector: 'alep-ng2-chart',
template: `
<div #alepNg2ChartContainer
     class="alep-ng2-chart-container">
</div>

`,
styles: [
`.alep-ng2-chart-container {
  height: 100%;
  width: 100%;
}
`],
})
export class AlepNg2ChartComponent implements OnDestroy, OnInit {
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.emOnWindowResize.emit();
  }
  @Input() private emUpdateChart: EventEmitter<any>;
  @Input() private inputChart: iAlepNg2InputChart;
  @Input() private inputChartStyling: Object = {};
  @ViewChild(
    'alepNg2ChartContainer'
  ) private alepNg2ChartContainerChild: ElementRef;
  private chartContainerId: number;
  private chartStyling: iStylingChart;
  private defaultChartStylings: iDefaultChartStylings = {
    barStyling: {
      backgroundColor: ['white'],
      chartBody: {
        hAxis: {
          fontSize: [9, 15],
          gridLines: {
            opacity: [0.3],
            stroke: ['none'],
            strokeWidth: [1]
          },
          label: {
            fontSize: [12, 20],
            fontWeight: ['normal'],
            marginTop: [0]
          },
          stroke: ['black'],
          strokeWidth: [2],
          ticks: {
            labelsAngle: [-30],
            opacity: [1],
            stroke: ['black'],
            strokeWidth: [1]
          }
        },
        marginLeft: [10],
        marginRight: [10, 30, 30],
        marginTop: [30],
        plotArea: {
          aspectRatio: [1, 1, 2],
          bar: {
            barGap: [1, 2, 2],
            dataGroupPadding: [2, 6, 6],
            selectionOutline: {
              color: ['black'],
              opacity: [0.7],
              width: [0]
            }
          },
          dataPoint: null,
          paletteRange: [
            [
              '#F15854',
              '#5DA5DA',
              '#FAA43A',
              '#60BD68',
              '#F17CB0',
              '#B2912F',
              '#B276B2',
              '#DECF3F',
              '#4D4D4D'
            ]
          ],
          path: null,
          slice: null,
        },
        vAxis: {
          fontSize: [9, 15],
          gridLines: {
            opacity: [0.3],
            stroke: ['grey'],
            strokeWidth: [1]
          },
          label: {
            fontSize: [12, 20],
            fontWeight: ['normal']
          },
          marginLeft: [10],
          stroke: ['black'],
          strokeWidth: [2],
          ticks: {
            opacity: [1],
            stroke: ['black'],
            strokeWidth: [1]
          }
        }
      },
      largeScreenSize: 767,
      legend: {
        legendEntry:{
          symbol: {
            height:  [12, 15, 15],
            width:  [28, 36, 36],
          },
          text:{
            fontSize: [10],
            fontWeight: ['normal'],
            marginLeft: [10]
          }
        },
        marginBottom: [10],
        marginTop: [10]
      },
      mediumScreenSize: 450,
      subtitle: {
        fontSize: [12, 20],
        fontWeight: ['normal'],
        marginTop: [10],
      },
      title: {
        fontSize: [15, 25],
        fontWeight: ['bold'],
        marginTop: [10],
      },
      tooltip: {
        backgroundColor: ['#1a1a1a'],
        borderColor: ['none'],
        borderRadius: [8],
        borderWidth: [0],
        fadeInDuration: [200],
        fadeOutDuration: [500],
        fontSize: [12],
        fontColor: ['white'],
        opacity: [1],
        paddingBottom: [5],
        paddingLeft: [5],
        paddingRight: [5],
        paddingTop: [5]
      }
    },
    donutStyling: {
      backgroundColor: ['white'],
      chartBody: {
        hAxis: null,
        marginLeft: [10, 20,200],
        marginRight: [10, 20,200],
        marginTop: [30],
        plotArea: {
          aspectRatio: [1, 1, 1],
          bar: null,
          dataPoint: null,
          paletteRange: [
            [
              '#F15854',
              '#5DA5DA',
              '#FAA43A',
              '#60BD68',
              '#F17CB0',
              '#B2912F',
              '#B276B2',
              '#DECF3F',
              '#4D4D4D'
            ]
          ],
          path: null,
          slice: {
            innerRadius: null,
            selectionOutline: {
              color: ['black'],
              opacity: [0.7],
              width: [2]
            },
            outerRadius: null
          },
        },
        vAxis: null
      },
      largeScreenSize: 767,
      legend: {
        legendEntry:{
          symbol: {
            height:  [12, 15, 15],
            width:  [28, 36, 36],
          },
          text:{
            fontSize: [10],
            fontWeight: ['normal'],
            marginLeft: [10]
          }
        },
        marginBottom: [10],
        marginTop: [10]
      },
      mediumScreenSize: 450,
      subtitle: {
        fontSize: [12, 20],
        fontWeight: ['normal'],
        marginTop: [10],
      },
      title: {
        fontSize: [15, 25],
        fontWeight: ['bold'],
        marginTop: [10],
      },
      tooltip: {
        backgroundColor: ['#1a1a1a'],
        borderColor: ['none'],
        borderRadius: [8],
        borderWidth: [0],
        fadeInDuration: [200],
        fadeOutDuration: [500],
        fontSize: [12],
        fontColor: ['white'],
        opacity: [1],
        paddingBottom: [5],
        paddingLeft: [5],
        paddingRight: [5],
        paddingTop: [5]
      }
    },
    lineStyling: {
      backgroundColor: ['white'],
      chartBody: {
        hAxis: {
          fontSize: [9, 15],
          gridLines: {
            opacity: [0.3],
            stroke: ['none'],
            strokeWidth: [1]
          },
          label: {
            fontSize: [12, 20],
            fontWeight: ['normal'],
            marginTop: [0]
          },
          stroke: ['black'],
          strokeWidth: [2],
          ticks: {
            labelsAngle: [-30],
            opacity: [1],
            stroke: ['black'],
            strokeWidth: [1]
          }
        },
        marginLeft: [10],
        marginRight: [10, 30, 30],
        marginTop: [30],
        plotArea: {
          aspectRatio: [1, 1, 2],
          bar: null,
          dataPoint: {
            diameterDeselected: [4],
            diameterSelected: [6]
          },
          paletteRange: [
            [
              '#F15854',
              '#5DA5DA',
              '#FAA43A',
              '#60BD68',
              '#F17CB0',
              '#B2912F',
              '#B276B2',
              '#DECF3F',
              '#4D4D4D'
            ]
          ],
          path: {
            strokeOpacity: [1],
            strokeWidthDeselected: [3],
            strokeWidthSelected: [5],
          },
          slice: null,
        },
        vAxis: {
          fontSize: [9, 15],
          gridLines: {
            opacity: [0.3],
            stroke: ['grey'],
            strokeWidth: [1]
          },
          label: {
            fontSize: [12, 20],
            fontWeight: ['normal']
          },
          marginLeft: [10],
          stroke: ['black'],
          strokeWidth: [2],
          ticks: {
            opacity: [1],
            stroke: ['black'],
            strokeWidth: [1]
          }
        }
      },
      largeScreenSize: 767,
      legend: {
        legendEntry:{
          symbol: {
            height:  [12, 15, 15],
            width:  [28, 36, 36],
          },
          text:{
            fontSize: [10],
            fontWeight: ['normal'],
            marginLeft: [10]
          }
        },
        marginBottom: [10],
        marginTop: [10]
      },
      mediumScreenSize: 450,
      subtitle: {
        fontSize: [12, 20],
        fontWeight: ['normal'],
        marginTop: [10],
      },
      title: {
        fontSize: [15, 25],
        fontWeight: ['bold'],
        marginTop: [10],
      },
      tooltip: {
        backgroundColor: ['#1a1a1a'],
        borderColor: ['none'],
        borderRadius: [8],
        borderWidth: [0],
        fadeInDuration: [200],
        fadeOutDuration: [500],
        fontSize: [12],
        fontColor: ['white'],
        opacity: [1],
        paddingBottom: [5],
        paddingLeft: [5],
        paddingRight: [5],
        paddingTop: [5]
      }
    },
    pieStyling: {
      backgroundColor: ['white'],
      chartBody: {
        hAxis: null,
        marginLeft: [10, 20,200],
        marginRight: [10, 20,200],
        marginTop: [30],
        plotArea: {
          aspectRatio: [1, 1, 1],
          bar: null,
          dataPoint: null,
          paletteRange: [
            [
              '#F15854',
              '#5DA5DA',
              '#FAA43A',
              '#60BD68',
              '#F17CB0',
              '#B2912F',
              '#B276B2',
              '#DECF3F',
              '#4D4D4D'
            ]
          ],
          path: null,
          slice: {
            innerRadius: [0],
            selectionOutline: {
              color: ['black'],
              opacity: [0.7],
              width: [2]
            },
            outerRadius: null
          },
        },
        vAxis: null
      },
      largeScreenSize: 767,
      legend: {
        legendEntry:{
          symbol: {
            height:  [12, 15, 15],
            width:  [28, 36, 36],
          },
          text:{
            fontSize: [10],
            fontWeight: ['normal'],
            marginLeft: [10]
          }
        },
        marginBottom: [10],
        marginTop: [10]
      },
      mediumScreenSize: 450,
      subtitle: {
        fontSize: [12, 20],
        fontWeight: ['normal'],
        marginTop: [10],
      },
      title: {
        fontSize: [15, 25],
        fontWeight: ['bold'],
        marginTop: [10],
      },
      tooltip: {
        backgroundColor: ['#1a1a1a'],
        borderColor: ['none'],
        borderRadius: [8],
        borderWidth: [0],
        fadeInDuration: [200],
        fadeOutDuration: [500],
        fontSize: [12],
        fontColor: ['white'],
        opacity: [1],
        paddingBottom: [5],
        paddingLeft: [5],
        paddingRight: [5],
        paddingTop: [5]
      }
    }
  };
  private emOnWindowResize: EventEmitter<any> = new EventEmitter();
  private subOnWindowResize: Subscription;
  private subUpdateChart: Subscription;
  private validTypes: string[] = [
    'Bar',
    'Donut',
    'Line',
    'Pie'
  ];

  constructor() {
  }

  ngOnInit() {
    this.createSubs();
    this.setChartContainerId();
    if (this.inputIsValid()) {
      this.assignIdToChartContainer();
      this.setChartStyling();
      this.createChart();
    }
  }
  ngOnDestroy() {
    this.cancelSubs();
    this.destroyCanvas();
  }

  /* Private methods */
  private assignIdToChartContainer() : void {
    let chartContainerId: number = this.chartContainerId;

    this.alepNg2ChartContainerChild.nativeElement.setAttribute(
      'container-id',
      chartContainerId
    );
  }
  private cancelSubs() : void {
    this.subOnWindowResize.unsubscribe();
    this.subUpdateChart.unsubscribe();
  }
  private checkChartType(chartType: string, validTypes: string[]) : void {
    let typeIndex: number = validTypes.indexOf(chartType);
    if (typeIndex === -1) {
      throw new Error(`Chart type '${chartType}' is not a valid type.`);
    }
  }
  private createChart() : void {
    let chartContainerId: number = this.chartContainerId;
    let inputChart: iAlepNg2InputChart = this.inputChart;
    let styling: iStylingChart = this.chartStyling;

    new Chart(
      chartContainerId,
      d3.select(`.alep-ng2-chart-container[container-id="${chartContainerId}"]`),
      inputChart,
      styling
    );
  }
  private createSubs(): void {
    let emOnWindowResize: EventEmitter<any> = this.emOnWindowResize;
    let emUpdateChart: EventEmitter<any> = this.emUpdateChart;

    if (emUpdateChart) {
      this.subUpdateChart = this.emUpdateChart.subscribe(() => {
        if (this.inputIsValid()) {
          this.updateChart();
        }
      });
    }
    this.subOnWindowResize = emOnWindowResize.subscribe(() => {
      if (this.inputIsValid()) {
        this.updateChart();
      }
    });
  }
  private destroyCanvas() : void {
    let chartContainer: HTMLElement =
      this.alepNg2ChartContainerChild.nativeElement;

    let canvas: SVGSVGElement = chartContainer.getElementsByTagName('svg')[0];
    chartContainer.removeChild(canvas);
  }
  private getScreenSizeIndex(styling: iStylingChart) : number {
    let index: number;
    let width: number = window.innerWidth;
    if (width < styling.mediumScreenSize) {
      index = 0;
    }
    else if (width >= styling.mediumScreenSize &&
      width < styling.largeScreenSize) {
      index = 1;
    }
    else {
      index = 2;
    }
    return index;
  }
  private getChartStylingForCurrentScreenSize(
    responsiveStyling: iStylingChart
  ) : iStylingChart {
    let screenSizeIndex: number = this.getScreenSizeIndex(responsiveStyling);
    let result: Object = {};
    this.getChartStylingForCurrentScreenSize_recursivePart(
      responsiveStyling,
      result,
      screenSizeIndex
    );
    return (<iStylingChart>result);
  }
  private getChartStylingForCurrentScreenSize_recursivePart(
    styling: iStylingChart,
    result: Object,
    screenSizeIndex: number
  ) : void {
    for (let prop in styling) {
      if (styling[prop] === null) {
        continue;
      }
      else if (this.isObject(styling[prop])) {
        result[prop] = {};
        this.getChartStylingForCurrentScreenSize_recursivePart(
          styling[prop],
          result[prop],
          screenSizeIndex
      );
      }
      else {
        if (styling[prop].length === 0) {
          result[prop] = [null];
        }
        else if (styling[prop].length < (screenSizeIndex + 1)) {
          result[prop] = [styling[prop][styling[prop].length - 1]];
        }
        else {
          result[prop] = [styling[prop][screenSizeIndex]];
        }
      }
    }
  }
  private inputIsValid() : boolean {
    let type: string = this.inputChart.type;
    let validTypes: string[] = this.validTypes;

    try {
      this.checkChartType(type, validTypes);
      return true;
    }
    catch (error) {
      console.log('Error: ', error.message, '\n', error.stack);
      return false;
    }
  }
  private isObject(entity: any) : boolean {
    return Object.prototype.toString.call(entity) === '[object Object]';
  }
  private mergeChartStylings (
    inputStyling: Object,
    defaultStyling: iStylingChart
  ) : iStylingChart {
    let result: Object = {};
    this.mergeChartStylings_recursivePart(inputStyling, defaultStyling, result);
    return (<iStylingChart>result);
  }
  private mergeChartStylings_recursivePart(
    inputStyling: Object,
    defaultStyling: iStylingChart,
    result: Object
  ) : void {
    for (let prop in defaultStyling) {
      if (inputStyling[prop]) {
        if (this.isObject(defaultStyling[prop])) {
          result[prop] = {};
          this.mergeChartStylings_recursivePart(
            inputStyling[prop],
            defaultStyling[prop],
            result[prop]
          )
        }
        else {
          result[prop] = inputStyling[prop];
        }
      }
      else {
        result[prop] = defaultStyling[prop];
      }
    }
  }
  private processInputChartStyling() : iStylingChart {
    let chartType: string = this.inputChart.type;
    let defaultStylings: iDefaultChartStylings = this.defaultChartStylings;
    let inputStyling: Object = this.inputChartStyling;

    let defaultStyling: iStylingChart;
    switch(chartType) {
      case 'Bar':
        defaultStyling = defaultStylings.barStyling;
        break;
      case 'Donut':
        defaultStyling = defaultStylings.donutStyling;
        break;
      case 'Line':
        defaultStyling = defaultStylings.lineStyling;
        break;
      case 'Pie':
        defaultStyling = defaultStylings.pieStyling;
        break;
    }
    let mergedStyling: iStylingChart = this.mergeChartStylings(
      inputStyling,
      defaultStyling
    );
    return this.getChartStylingForCurrentScreenSize(mergedStyling);
  }
  private setChartStyling() : void {
    this.chartStyling = this.processInputChartStyling();
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
    this.destroyCanvas();
    this.setChartStyling();
    this.createChart();
  }
}
