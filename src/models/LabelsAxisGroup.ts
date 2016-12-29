import { ChartBodyOrthogonal } from "./ChartBodyOrthogonal";
import { D3Element } from "./D3Element";
import { iStylingChart } from "./iStylingChart";

declare var d3: any;

export abstract class LabelsAxisGroup extends D3Element {
  protected d3Scale: any;
  protected d3SelectionAxis: any;
  protected d3SelectionLabel: any;
  protected parentChartBody: ChartBodyOrthogonal;
  protected xPos: number;
  protected yPos: number;

  constructor(parentChartBody: ChartBodyOrthogonal) {
    super();
    this.parentChartBody = parentChartBody;
    this.setPosition();
    this.d3Selection = this.createD3Selection();
  }
  /* Protected methods */
  protected appendAxis() : any {
    let d3SelectionAxisGroup: any = this.d3Selection;
    let d3Scale: any = this.d3Scale;
    let labels: string[] = this.parentChartBody.getCollections()[0].labels;
    let plotAreaHeight: number = this.parentChartBody.getPlotArea().getHeight();
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();

    let d3Axis: any = d3.svg.axis()
      .scale(d3Scale)
      .ticks(labels.length)
      .orient('bottom');
    let d3SelectionAxis: any = d3SelectionAxisGroup
      .append('g')
      .call(d3Axis)
      .attr('class', 'axis');
    let fontSize: number = styling.chartBody.vAxis.fontSize[0];
    let labelsAngle: number = styling.chartBody.hAxis.ticks.labelsAngle[0];
    let stroke: string;
    let strokeWidth: string;
    let tickOpacity: number;
    let tickStroke: string;
    let tickStrokeWidth: number;
    let gridOpacity: number;
    let gridStroke: string;
    let gridStrokeWidth: number;
    // Create tick labels
    d3SelectionAxis.selectAll('.tick text')
      .data(labels)
      .text((d) => {return d})
      .style({
        'font-size': fontSize,
        'text-anchor': 'end'
      })
      .attr({
        'dy': 0,
        'transform':
          `translate(0 ${fontSize}) rotate(${labelsAngle})`,
        'y': 0
      });
    // Styling axis
    stroke = styling.chartBody.hAxis.stroke[0];
    strokeWidth = styling.chartBody.hAxis.strokeWidth[0].toString() + 'px';
    d3SelectionAxis.select('.domain')
      .style({
        'fill': 'none',
        'stroke': stroke,
        'stroke-width': strokeWidth
      });
    // Styling tick lines
    tickOpacity = styling.chartBody.hAxis
      .ticks
      .opacity[0];
    tickStroke = styling.chartBody.hAxis
      .ticks
      .stroke[0];
    tickStrokeWidth =
      styling.chartBody.hAxis.ticks.strokeWidth[0];
    d3SelectionAxis.selectAll('.tick line')
      .attr('class', 'tick-line')
      .attr('y2', 6)
      .style({
        'opacity': tickOpacity,
        'stroke': tickStroke,
        'stroke-width': tickStrokeWidth
      });
    // Styling grid lines
    gridOpacity = styling.chartBody.hAxis
      .gridLines
      .opacity[0];
    gridStroke = styling.chartBody.hAxis
      .gridLines
      .stroke[0];
    gridStrokeWidth =
      styling.chartBody.hAxis.gridLines.strokeWidth[0];
    d3SelectionAxis.selectAll('.tick')
      .append('line')
      .attr('class', 'grid-line')
      .attr('y2', -plotAreaHeight)
      .style({
        'opacity': gridOpacity,
        'stroke': gridStroke,
        'stroke-width': gridStrokeWidth
      });
    return d3SelectionAxis;
  }
  protected appendLabel() : any {
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let plotAreaWidth: number = this.parentChartBody.getPlotArea().getWidth();
    let plotAreaHeight: number = this.parentChartBody.getPlotArea().getHeight();
    let axisGroupHeight: number = this.getHeight() - plotAreaHeight;
    let d3SelectionAxisGroup: any = this.d3Selection;
    let text: string = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getInputChart()
      .hAxisLabel;

    let marginTop: number = styling.chartBody.hAxis
      .label
      .marginTop[0];
    let fontSize: number = styling.chartBody.hAxis
      .label
      .fontSize[0];
    let fontWeight: string = styling.chartBody.hAxis
      .label
      .fontWeight[0];
    let x: number = plotAreaWidth / 2;
    let y: number = axisGroupHeight + fontSize;
    let d3SelectionLabel = d3SelectionAxisGroup
      .append('g')
      .attr('class', 'label')
      .append('text')
      .text(text)
      .attr({
        'dy': marginTop,
        'text-anchor': 'middle',
        'x': x,
        'y': y
      })
      .style({
        'font-size': fontSize,
        'font-weight': fontWeight
      });
    return d3SelectionLabel;
  }
  protected createD3Scale(domainMin: number, domainMax: number) : any {
    let rangeMin : number = 0;
    let rangeMax : number = this.parentChartBody
      .getPlotArea()
      .getWidth();

    let hScale: any = d3.scale.linear()
      .domain([domainMin, domainMax])
      .range([rangeMin, rangeMax]);
    return hScale;
  }
  protected createD3Selection() : any {
    let parentChartBody = this.parentChartBody;
    let xPos: number = this.xPos;
    let yPos: number = this.yPos;

    let d3Selection: any = parentChartBody.getD3Selection()
      .append('g')
      .attr('class', 'horAxis')
      .attr('transform', `translate(${xPos} ${yPos})`);
    return d3Selection;
  }
  protected setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  protected setXPos() : void {
    this.xPos = this.parentChartBody.getPlotArea().getXPos();
  }
  protected setYPos() : void {
    this.yPos = this.parentChartBody.getPlotArea().getHeight();
  }
  /* Public methods */
  public getD3Scale() : any {
    return this.d3Scale;
  }
  public getXPos() : number {
    return this.xPos;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
