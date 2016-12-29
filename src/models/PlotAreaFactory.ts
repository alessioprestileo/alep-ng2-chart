import { ChartBody } from "./ChartBody";
import { PlotAreaBar } from "./PlotAreaBar";
import { PlotAreaDonut } from "./PlotAreaDonut";
import { PlotAreaLine } from "./PlotAreaLine";
import { PlotAreaPie } from "./PlotAreaPie";

export abstract class PlotAreaFactory {
  public static createPlotArea(parentChartBody: ChartBody) : any {
    let chartType: string = parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .type;

    switch(chartType) {
      case 'Bar':
        return new PlotAreaBar(parentChartBody);
      case 'Donut':
        return new PlotAreaDonut(parentChartBody);
      case 'Line':
        return new PlotAreaLine(parentChartBody);
      case 'Pie':
        return new PlotAreaPie(parentChartBody);
    }
  }
}
