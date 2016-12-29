import { iCollection } from "./iCollection";
import { iStylingChart } from "./iStylingChart";
import { Legend } from "./Legend";
import { Visualization } from "./Visualization";

export class LegendCircular extends Legend {
  constructor(parentVisualization: Visualization) {
    super(parentVisualization);
    this.setPosition();
    this.d3Selection = this.createD3Selection();
    this.createEntries();
  }
  /* Protected methods */
  protected getEntryLabels() : string[] {
    let collection: iCollection = this.parentVisualization
      .getChartBody()
      .getCollections()[0];

    return collection.labels;
  }
  protected setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  protected setXPos() : void {
    let chartBodyXPos: number = this.parentVisualization
      .getChartBody()
      .getXPos();
    let plotAreaWidth: number = this.parentVisualization
      .getChartBody()
      .getPlotArea()
      .getWidth();
    let plotAreaXPos: number = this.parentVisualization
      .getChartBody()
      .getPlotArea()
      .getXPos();

    this.xPos = chartBodyXPos + plotAreaXPos - plotAreaWidth / 2;
  }
  protected setYPos() : void {
    let chartBodyYPos: number = this.parentVisualization
      .getChartBody()
      .getYPos();
    let ChartBodyHeight: number = this.parentVisualization
      .getChartBody()
      .getHeight();
    let styling: iStylingChart = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getStyling();

    let legendMarginTop: number = styling.legend.marginTop[0];
    this.yPos = chartBodyYPos + ChartBodyHeight + legendMarginTop;
  }
}
