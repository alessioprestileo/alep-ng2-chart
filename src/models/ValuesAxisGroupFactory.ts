import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { ValuesAxisGroupBar } from "./ValuesAxisGroupBar";
import { ValuesAxisGroupLine } from "./ValuesAxisGroupLine";


export abstract class ValuesAxisGroupFactory {
  public static createValuesAxis(parentChartBody: ChartBodyOrthogonal) : any {
    let chartType: string = parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .type;
    switch(chartType) {
      case 'Bar':
        return new ValuesAxisGroupBar(parentChartBody);
      case 'Line':
        return new ValuesAxisGroupLine(parentChartBody);
    }
  }
}
