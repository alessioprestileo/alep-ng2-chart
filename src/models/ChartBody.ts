import { D3Element } from './D3Element';
import { iAlepNg2InputChartColl } from './iAlepNg2InputChartColl';
import { iCollection } from './iCollection';
import { iStylingChart } from "./iStylingChart";
import { Visualization } from "./Visualization";


export abstract class ChartBody extends D3Element {
  private width: number;

  protected collections: iCollection[];
  protected parentVisualization: Visualization;
  protected plotArea: any;

  constructor(parentVisualization: Visualization) {
    super();
    this.parentVisualization = parentVisualization;
    this.setWidth();
    this.collections = this.getCollectionsFromSrc();
  }
  /* Private methods */
  private getCollectionsFromSrc() : iCollection[] {
    let collectionsSrc: iAlepNg2InputChartColl[] = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .collections;

    let collections: iCollection[] = [];
    let maxVal: number = 0;
    let minVal: number = 0;
    let dataPoints: any;
    let name: string;
    let labels: string[];
    let values: number[];
    for (let i = 0; i < collectionsSrc.length; i++) {
      dataPoints = collectionsSrc[i].dataSet.dataPoints;
      name = collectionsSrc[i].label;
      labels = [];
      values = [];
      for (let label in dataPoints) {
        maxVal = (dataPoints[label] > maxVal) ?
          dataPoints[label] :
          maxVal;
        minVal = (dataPoints[label] < minVal) ?
          dataPoints[label] :
          minVal;
        labels.push(label);
        values.push(dataPoints[label]);
      }
      collections.push(
        {
          labels: labels,
          maxVal: maxVal,
          minVal: minVal,
          name: name,
          values: values
        }
      );
    }
    return collections;
  }
  private setWidth() : void {
    let styling: iStylingChart = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let visualizationWidth: number = this.parentVisualization.getWidth();

    let marginLeft: number = styling.chartBody.marginLeft[0];
    let marginRight: number = styling.chartBody.marginRight[0];
    this.width = visualizationWidth - marginLeft - marginRight;
  }
  /* Protected methods */
  protected createD3Selection() : any {
    let d3SelectionParentVisualization: any = this.parentVisualization
      .getD3Selection();
    let xPos: number = this.getXPos();
    let yPos: number = this.getYPos();

    let d3Selection: any = d3SelectionParentVisualization
      .append('g')
      .attr('class', 'chart-body')
      .attr(
        'transform',
        `translate(${xPos} ${yPos})`);
    return d3Selection;
  }
  /* Public methods */
  public getCollections() : iCollection[] {
    return this.collections;
  }
  public getCollectionsMaxVal() : number {
    let collections: iCollection[] = this.collections;

    let maxVal: number = collections[0].values[0];
    for (let collection of collections) {
      for (let val of collection.values) {
        if (val > maxVal) {
          maxVal = val;
        }
      }
    }
    return maxVal;
  }
  public getCollectionsMinVal() : number {
    let collections: iCollection[] = this.collections;

    let minVal: number = collections[0].values[0];
    for (let collection of collections) {
      for (let val of collection.values) {
        if (val < minVal) {
          minVal = val;
        }
      }
    }
    return minVal;
  }
  public getParentVisualization() : Visualization {
    return this.parentVisualization;
  }
  public getPlotArea() : any {
    return this.plotArea;
  }
  public getWidth() : number {
    return this.width;
  }
  public getXPos() : number {
    let styling: iStylingChart = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getStyling();

    let xPos: number = styling.chartBody.marginLeft[0];
    return xPos;
  }
  public getYPos() : number {
    let styling: iStylingChart = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getStyling();

    let yPos: number = styling.chartBody.marginTop[0];
    return yPos;
  }
}
