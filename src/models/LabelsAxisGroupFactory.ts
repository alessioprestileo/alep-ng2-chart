import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { LabelsAxisGroupBar } from "./LabelsAxisGroupBar";
import { LabelsAxisGroupLine } from "./LabelsAxisGroupLine";

export abstract class LabelsAxisGroupFactory {
  public static createLabelsAxis(parentChartBody: ChartBodyOrthogonal) : any {
    let chartType: string = parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .type;
    switch(chartType) {
      case 'Bar':
        return new LabelsAxisGroupBar(parentChartBody);
      case 'Line':
        return new LabelsAxisGroupLine(parentChartBody);
    }
  }
}
