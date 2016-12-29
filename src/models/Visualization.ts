import { Canvas } from './Canvas';
import { ChartBodyFactory } from "./ChartBodyFactory";
import { D3Element } from './D3Element';
import { iStylingChart } from "./iStylingChart";
import { LegendFactory } from "./LegendFactory";
import { Subtitle } from "./Subtitle";

export class Visualization extends D3Element{
  private chartBody: any;
  private legend: any;
  private parentCanvas: Canvas;
  private width: number;
  private xPos: number;
  private yPos: number;

  constructor(parentCanvas: Canvas) {
    super();
    this.parentCanvas = parentCanvas;
    this.setWidth();
    this.setPosition();
    this.d3Selection = this.createD3Selection();
    this.chartBody = ChartBodyFactory.createChartBody(this);
    this.legend = LegendFactory.createLegend(this);
  }
  /* Private methods */
  private setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  private setWidth() : void {
    this.width = this.parentCanvas.getWidth();
  }
  private setXPos() : void {
    this.xPos = 0;
  }
  private setYPos() : void {
    let chartSubtitle: Subtitle = this.parentCanvas
      .getParentChart()
      .getSubtitle();

    let yPos: number =
      chartSubtitle.getYPos() +
      chartSubtitle.getHeight();
    this.yPos = yPos;
  }
  /* Protected methods */
  protected createD3Selection() : any {
    let d3SelectionParentCanvas: any = this.parentCanvas.getD3Selection();
    let xPos: number = this.xPos;
    let yPos: number = this.yPos;

    let d3Selection: any = d3SelectionParentCanvas
      .append('g')
      .attr('class', 'visualization')
      .attr(
        'transform',
        `translate(${xPos} ${yPos})`);
    return d3Selection;
  }
  /* Public methods */
  public getChartBody(): any {
    return this.chartBody;
  }
  public getHeight() : number {
    let chartBodyHeight: number = this.chartBody.getHeight();
    let legendHeight: number = this.legend.getHeight();
    let styling: iStylingChart = this.parentCanvas
      .getParentChart()
      .getStyling();

    let chartBodyMarginTop: number = styling.chartBody.marginTop[0];
    let legendMarginBottom: number = styling.legend.marginBottom[0];
    let legendMarginTop: number = styling.legend.marginTop[0];
    let height: number =
      chartBodyMarginTop +
      chartBodyHeight +
      legendHeight +
      legendMarginBottom +
      legendMarginTop;
    return height;
  }
  public getParentCanvas(): any {
    return this.parentCanvas;
  }
  public getWidth() : number {
    return this.width;
  }
  public getXPos() : number {
    return 0;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
