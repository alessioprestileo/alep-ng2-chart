import { ChartBody } from "./ChartBody";
import { LabelsAxisGroupFactory } from "./LabelsAxisGroupFactory";
import { PlotAreaFactory } from "./PlotAreaFactory";
import { ValuesAxisGroup } from "./ValuesAxisGroup";
import { ValuesAxisGroupFactory } from "./ValuesAxisGroupFactory";
import { Visualization } from "./Visualization";

export class ChartBodyOrthogonal extends ChartBody {
  protected labelsAxis: any;
  protected valuesAxisLeft: ValuesAxisGroup;
  protected valuesAxisRight: ValuesAxisGroup = null;

  constructor(parentVisualization: Visualization) {
    super(parentVisualization);
    this.d3Selection = this.createD3Selection();
    this.plotArea = PlotAreaFactory.createPlotArea(this);
    this.valuesAxisLeft = ValuesAxisGroupFactory.createValuesAxis(this);
    this.labelsAxis = LabelsAxisGroupFactory.createLabelsAxis(this);
    this.plotArea.drawData();
  }
  /* Public methods */
  public getLabelsAxis(): any {
    return this.labelsAxis;
  }
  public getValuesAxisLeft(): ValuesAxisGroup {
    return this.valuesAxisLeft;
  }
  public getValuesAxisRight(): ValuesAxisGroup {
    return this.valuesAxisRight;
  }
}
