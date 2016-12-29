import { ChartBodyCircular } from "./ChartBodyCircular";
import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { Visualization } from "./Visualization";

export abstract class ChartBodyFactory {
  public static createChartBody (parentVisualization: Visualization) : any {
    let chartType: string = parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .type;
    switch(chartType) {
      case 'Bar':
        return new ChartBodyOrthogonal(parentVisualization);
      case 'Donut':
        return new ChartBodyCircular(parentVisualization);
      case 'Line':
        return new ChartBodyOrthogonal(parentVisualization);
      case 'Pie':
        return new ChartBodyCircular(parentVisualization);
    }
  }
}
