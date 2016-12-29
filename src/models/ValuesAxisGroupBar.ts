import {ValuesAxisGroup} from "./ValuesAxisGroup";
import {ChartBodyOrthogonal} from "./ChartBodyOrthogonal";

declare var d3: any;

export class ValuesAxisGroupBar extends ValuesAxisGroup {
  constructor(parentChartBody: ChartBodyOrthogonal) {
    super(parentChartBody)
  }
  /* Protected methods */
  protected createD3Scale() : any {
    let domainMin: number = 0;
    let domainMax: number = this.getParentChartBody().getCollectionsMaxVal();
    let rangeMin: number = 0;
    let rangeMax: number = this.parentChartBody.getPlotArea().getHeight();

    let d3Scale: any = d3.scale.linear()
      .domain([domainMin, domainMax])
      .range([rangeMax, rangeMin]);
    return d3Scale;
  }
}
