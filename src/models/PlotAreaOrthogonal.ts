import { ChartBody } from "./ChartBody";
import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { PlotArea } from "./PlotArea";
import {iStylingChart} from "./iStylingChart";

export abstract class PlotAreaOrthogonal extends PlotArea {
  protected aspectRatio: number;
  protected parentChartBody: ChartBodyOrthogonal;

  constructor(parentChartBody: ChartBody) {
    super();
    this.parentChartBody = (<ChartBodyOrthogonal>parentChartBody);
    this.d3ScaleColorPalette = this.createD3ScaleColorPalette(
      this.getD3ScaleColorPaletteDomainLength(),
      this.getD3ScaleColorPaletteRange()
    );
    this.setPosition();
    this.setDimensions();
  }
  /* Private methods */
  private getD3ScaleColorPaletteDomainLength() : number {
    return this.parentChartBody.getCollections().length;
  }
  private getD3ScaleColorPaletteRange() : string[] {
    let range: string[] = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling()
      .chartBody.plotArea.paletteRange[0];
    return range;
  }
  private setAspectRatio() : void {
    this.aspectRatio = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling()
      .chartBody
      .plotArea
      .aspectRatio[0];
  }
  /* Protected methods */
  protected setD3Selection() : void {
    this.d3Selection = this.createD3Selection();
  }
  protected setDimensions() : void {
    this.setAspectRatio();
    this.setWidth();
    this.setHeight();
  }
  protected setHeight() : void {
    this.height = this.width / this.aspectRatio;
  }
  protected setWidth() : void {
    let chartBodyWidth: number = this.parentChartBody.getWidth();
    let xPos: number = this.xPos;

    this.width = chartBodyWidth - xPos;
  }
  protected setXPos() : void {
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();

    let valuesAxisGroupWidth: number =
      styling.chartBody.marginLeft[0] +
      styling.chartBody.vAxis.label.fontSize[0] +
      styling.chartBody.vAxis.marginLeft[0] +
      styling.chartBody.vAxis.fontSize[0] * 2;
    this.xPos = valuesAxisGroupWidth;
  }
  protected setYPos() : void {
    this.yPos = 0;
  }
  /* Public methods */
  public abstract drawData() : void;
  public getHeight() : number {
    return this.height;
  }
  public getWidth() : number {
    return this.width;
  }
  public getXPos() : number {
    return this.xPos;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
