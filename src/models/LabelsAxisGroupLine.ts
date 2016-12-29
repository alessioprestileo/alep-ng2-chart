import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { LabelsAxisGroup } from "./LabelsAxisGroup";

export class LabelsAxisGroupLine extends LabelsAxisGroup {
  constructor(parentChartBody: ChartBodyOrthogonal) {
    super(parentChartBody);
    this.d3Scale = this.createD3Scale(
      this.getD3ScaleDomainMin(),
      this.getD3ScaleDomainMax()
    );
    this.d3SelectionAxis = this.appendAxis();
    this.d3SelectionLabel = this.appendLabel();
  }
  /* Private methods */
  private getD3ScaleDomainMax() : number {
    let domainMax: number = this.parentChartBody
      .getCollections()[0]
      .labels.length -
      1;
    return domainMax;
  }
  private getD3ScaleDomainMin() : number {
    let domainMin: number = 0;
    return domainMin;
  }
}
