import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { LabelsAxisGroup } from "./LabelsAxisGroup";
import { iStylingChart } from "./iStylingChart";

export class LabelsAxisGroupBar extends LabelsAxisGroup {
  constructor(parentChartBody: ChartBodyOrthogonal) {
    super(parentChartBody);
    this.d3Scale = this.createD3Scale(
      this.getD3ScaleDomainMin(),
      this.getD3ScaleDomainMax()
    );
    this.d3SelectionAxis = this.appendAxis();
    this.adjustTickLabelsPosition();
    this.d3SelectionLabel = this.appendLabel();
  }
  /* Private methods */
  private adjustTickLabelsPosition() : void {
    let labels: string[] = this.parentChartBody.getCollections()[0].labels;
    let plotAreaWidth: number = this.parentChartBody.getPlotArea().getWidth();
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let d3SelectionTickLabels: any = this.d3SelectionAxis
      .selectAll('.tick text');

    let totDataPoints: number = labels.length;
    let dataGroupWidth: number = plotAreaWidth / totDataPoints;
    let labelsHorShift: number = dataGroupWidth / 2;
    let fontSize: number = styling.chartBody.vAxis.fontSize[0];
    let labelsAngle: number = styling.chartBody.hAxis
      .ticks
      .labelsAngle[0];
    d3SelectionTickLabels.attr(
      'transform',
      `translate(${labelsHorShift} ${fontSize}) rotate(${labelsAngle})`
    );
  }
  private getD3ScaleDomainMax() : number {
    let domainMax: number = this.parentChartBody
        .getCollections()[0]
        .labels.length;
    return domainMax;
  }
  private getD3ScaleDomainMin() : number {
    let domainMin: number = 0;
    return domainMin;
  }
}
