import { ChartBody } from "./ChartBody";
import { iStylingChart } from "./iStylingChart";
import { PlotAreaCircular } from "./PlotAreaCircular";

export class PlotAreaPie extends PlotAreaCircular {
  constructor(parentChartBody: ChartBody) {
    super(parentChartBody);
    this.setDimensions();
    this.setRadii();
    this.setPosition();
    this.d3Selection = this.createD3Selection();
  }

  protected setRadii() : void {
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let width: number = this.width;
    this.outerRadius = styling.chartBody.plotArea.slice.outerRadius ?
      styling.chartBody.plotArea.slice.outerRadius[0] :
      width / 2;
    this.innerRadius = 0;
  }
}
