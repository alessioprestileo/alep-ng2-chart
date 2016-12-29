import { ChartBody } from "./ChartBody";
import { iStylingChart } from "./iStylingChart";
import { PlotAreaCircular } from "./PlotAreaCircular";

export class PlotAreaDonut extends PlotAreaCircular {
  constructor(parentChartBody: ChartBody) {
    super(parentChartBody);
    this.setDimensions();
    this.setRadii();
    this.setPosition();
    this.d3Selection = this.createD3Selection();
  }
  /* Protected methods */
  protected setRadii() : void {
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let width: number = this.width;

    let outerRadius: number = styling.chartBody.plotArea.slice.outerRadius ?
      styling.chartBody.plotArea.slice.outerRadius[0] :
    width / 2;
    this.outerRadius = outerRadius;
    this.innerRadius = styling.chartBody.plotArea.slice.innerRadius ?
      styling.chartBody.plotArea.slice.innerRadius[0] :
    outerRadius / 3;
  }
}
