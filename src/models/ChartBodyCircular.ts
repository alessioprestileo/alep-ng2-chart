import { ChartBody } from "./ChartBody";
import { iStylingChart } from "./iStylingChart";
import { PlotAreaFactory } from "./PlotAreaFactory";
import { Visualization } from "./Visualization";

export class ChartBodyCircular extends ChartBody {

  constructor(parentVisualization: Visualization) {
    super(parentVisualization);
    this.d3Selection = this.createD3Selection();
    this.plotArea = PlotAreaFactory.createPlotArea(this);
    this.plotArea.drawData();
  }
  /* Public methods */
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
