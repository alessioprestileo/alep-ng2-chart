import { LegendCircular } from "./LegendCircular";
import { LegendOrthogonal } from "./LegendOrthogonal";
import { Visualization } from "./Visualization";

export abstract class LegendFactory {
  public static createLegend(parentVisualization: Visualization) : any {
    let chartType: string = parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .type;

    switch(chartType) {
      case 'Bar':
        return new LegendOrthogonal(parentVisualization);
      case 'Donut':
        return new LegendCircular(parentVisualization);
      case 'Line':
        return new LegendOrthogonal(parentVisualization);
      case 'Pie':
        return new LegendCircular(parentVisualization);
    }
  }
}
