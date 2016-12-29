import { iCollection } from "./iCollection";
import { iStylingChart } from "./iStylingChart";
import { Legend } from "./Legend";
import { Visualization } from "./Visualization";

export class LegendOrthogonal extends Legend {
  constructor(parentVisualization: Visualization) {
    super(parentVisualization);
    this.setPosition();
    this.d3Selection = this.createD3Selection();
    this.createEntries();
  }
  /* Protected methods */
  protected getEntryLabels() : string[] {
    let collections: iCollection[] = this.parentVisualization
      .getChartBody()
      .getCollections();

    let labels: string[] = [];
    for (let collection of collections) {
      labels.push(collection.name);
    }
    return labels;
  }
  protected setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  protected setXPos() : void {
    let chartBodyXPos: number = this.parentVisualization
      .getChartBody()
      .getXPos();
    let plotAreaXPos: number = this.parentVisualization
      .getChartBody()
      .getPlotArea()
      .getXPos();

    this.xPos = chartBodyXPos + plotAreaXPos;
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
