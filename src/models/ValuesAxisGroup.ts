import { D3Element } from "./D3Element";
import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { iStylingChart } from "./iStylingChart";

declare var d3: any;

export abstract class ValuesAxisGroup extends D3Element {
  private d3SelectionAxis: any;
  private d3SelectionLabel: any;
  private d3Scale: any;

  protected parentChartBody: ChartBodyOrthogonal;

  constructor(parentChartBody: ChartBodyOrthogonal) {
    super();
    this.parentChartBody = parentChartBody;
    this.d3Selection = this.createD3Selection();
    this.d3Scale = this.createD3Scale();
    this.d3SelectionAxis = this.appendAxis();
    this.d3SelectionLabel = this.appendLabel();
  }
  /* Private methods */
  private appendAxis() : any {
    let d3Scale: any = this.d3Scale;
    let d3Selection: any = this.d3Selection;
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let xPos: number = this.getWidth();
    let yPos: number = this.getYPos();
    let plotAreaWidth: number = this.getParentChartBody()
      .getPlotArea()
      .getWidth();

    let d3Axis: any = d3.svg.axis()
      .scale(d3Scale)
      .orient('left');
    let d3SelectionAxis: any = d3Selection
      .append('g')
      .call(d3Axis)
      .attr({
        'class': 'axis',
        'transform': `translate(${xPos} ${yPos})`
      });
    // Styling axis
    let stroke: string = styling.chartBody.vAxis.stroke[0];
    let strokeWidth: string =
      styling.chartBody.vAxis.strokeWidth[0].toString() + 'px';
    d3SelectionAxis.select('.domain')
      .style({
        'fill': 'none',
        'stroke': stroke,
        'stroke-width': strokeWidth
      });
    // Styling tick lines
    let tickOpacity: number = styling.chartBody.vAxis.ticks.opacity[0];
    let tickStroke: string = styling.chartBody.vAxis.ticks.stroke[0];
    let tickStrokeWidth: number =
      styling.chartBody.vAxis.ticks.strokeWidth[0];
    d3SelectionAxis.selectAll('.tick line')
      .attr('class', 'tick-line')
      .attr('x2', -6)
      .style({
        'opacity': tickOpacity,
        'stroke': tickStroke,
        'stroke-width': tickStrokeWidth
      });
    // Styling tick labels
    let fontSize: number = styling.chartBody.vAxis.fontSize[0];
    d3SelectionAxis.selectAll('.tick text')
      .style({
        'font-size': fontSize
      });
    // Styling grid lines
    let gridOpacity: number = styling.chartBody.vAxis.gridLines.opacity[0];
    let gridStroke: string = styling.chartBody.vAxis.gridLines.stroke[0];
    let gridStrokeWidth: number =
      styling.chartBody.vAxis.gridLines.strokeWidth[0];
    d3SelectionAxis.selectAll('.tick')
      .append('line')
      .attr('class', 'grid-line')
      .attr('x2', plotAreaWidth)
      .style({
        'opacity': gridOpacity,
        'stroke': gridStroke,
        'stroke-width': gridStrokeWidth
      });
    return d3SelectionAxis;
  }
  private appendLabel() : any {
    let d3Selection : any = this.d3Selection;
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let text: string = this.getParentChartBody()
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .vAxisLabel;
    let yPos: number = this.parentChartBody
        .getPlotArea()
        .getHeight() / 2;

    let xPos: number = styling.chartBody.marginLeft[0];
    let fontSize: number = styling.chartBody.vAxis
      .label
      .fontSize[0];
    let fontWeight: string = styling.chartBody.vAxis
      .label
      .fontWeight[0];
    let dy: number = 0.75 * fontSize;
    let d3SelectionLabel = d3Selection
      .append('g')
      .attr('class', 'label')
      .append('text')
      .text(text)
      .attr({
        'dy': dy,
        'text-anchor': 'middle',
        'transform': `rotate(-90 ${xPos} ${yPos})`,
        'x': xPos,
        'y': yPos
      })
      .style({
        'font-size': fontSize,
        'font-weight': fontWeight
      });
    return d3SelectionLabel;
  }
  /* Protected methods */
  protected abstract createD3Scale() : any;
  protected createD3Selection() : any {
    let d3SelectionAxisGroup: any = this.parentChartBody.getD3Selection()
      .append('g')
      .attr('class', 'vertAxis');
    return d3SelectionAxisGroup;
  }
  /* Public methods */
  public getD3Scale() : any {
    return this.d3Scale;
  }
  public getParentChartBody() : ChartBodyOrthogonal {
    return this.parentChartBody;
  }
  public getWidth() : number {
    return this.parentChartBody
      .getPlotArea()
      .getXPos();
  }
  public getXPos() : number {
    return 0;
  }
  public getYPos() : number {
    return 0;
  }
}
