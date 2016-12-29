import { ChartBody } from "./ChartBody";
import { iCollection } from "./iCollection";
import { iStylingChart } from "./iStylingChart";
import { PlotAreaOrthogonal } from "./PlotAreaOrthogonal";
import { Tooltip } from "./Tooltip";

declare var d3: any;

export class PlotAreaLine extends PlotAreaOrthogonal {
  constructor(parentChartBody: ChartBody) {
    super(parentChartBody);
  }
  /* Public methods */
  public drawData() : void {
    this.setD3Selection();
    let collections: iCollection[] = this.parentChartBody.getCollections();
    let d3ScaleColorPalette: any = this.d3ScaleColorPalette;
    let d3Selection: any = this.d3Selection;
    let styling: iStylingChart = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let tooltip: Tooltip = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getTooltip();
    let d3ScaleLabelsAxis: any = this.parentChartBody
      .getLabelsAxis()
      .getD3Scale();
    let d3ScaleValuesAxis: any = this.parentChartBody
      .getValuesAxisLeft()
      .getD3Scale();

    let newLine: string = '<br/>';
    let dataPointDiameter: string = styling.chartBody.plotArea
        .dataPoint
        .diameterDeselected[0] + 'px';
    let dataPointDiameterSelected: string = styling.chartBody.plotArea
        .dataPoint
        .diameterSelected[0] + 'px';
    let strokeWidth: string =
      styling.chartBody.plotArea.path.strokeWidthDeselected[0]
        .toString() + 'px';
    let strokeWidthSelected: string =
      styling.chartBody.plotArea.path.strokeWidthSelected[0]
        .toString() + 'px';
    let strokeOpacity: number =
      styling.chartBody.plotArea.path.strokeOpacity[0];
    let length_Collections: number = collections.length;
    let values: number[];
    for (let i = 0; i < length_Collections; i++) {
      values = collections[i].values;
      let lineGenerator: any = d3.svg.line()
        .x(function(d, index) {return d3ScaleLabelsAxis(index)})
        .y(function(d) { return d3ScaleValuesAxis(d)})
        .interpolate('linear');
      let collection: any = d3Selection
        .append('g')
        .attr('class', 'collection');
      // Path
      let path: any = collection
        .append('path')
        .attr({
          class: 'path',
          d: lineGenerator(values)
        })
        .style({
          fill: 'none',
          stroke: d3ScaleColorPalette(i),
          'stroke-opacity': strokeOpacity,
          'stroke-width': strokeWidth
        })
        .on('mouseover', function(d) {
          this.style.strokeWidth = strokeWidthSelected
        })
        .on('mouseout', function(d) {
          this.style.strokeWidth = strokeWidth
        });
      // Data points
      let dataPointsSelection: any = collection.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr({
          'class': 'dataPoint',
          'cx': function(d, index) {return d3ScaleLabelsAxis(index)},
          'cy': function(d) { return d3ScaleValuesAxis(d)},
          'fill': d3ScaleColorPalette(i),
          'r': dataPointDiameter
        })
        .on('mouseover', function(d, index) {
          // Increase radius
          this.setAttribute('r', dataPointDiameterSelected);
          // Define tooltip info
          tooltip.getD3Selection().html(
            collections[i].name + newLine +
            collections[i].labels[index] + ': ' + d
          );
          // Show tooltip
          tooltip.show(d3Selection);
        })
        .on('mouseout', function(d) {
          // Decrease radius
          this.setAttribute('r', dataPointDiameter);
          // Fade out tooltip
          tooltip.hide();
        });
      // If data point is selected, deselect it when user touches on body
      d3.select('body')[0][0]
        .addEventListener('touchstart', function() {
          // Deselect data point if selected
          let length: number = dataPointsSelection[0].length;
          for (let i = 0; i < length; i++) {
            if (
              dataPointsSelection[0][i].getAttribute('r') ===
              dataPointDiameterSelected
            ) {
              dataPointsSelection[0][i].setAttribute('r', dataPointDiameter);
              break;
            }
          }
        });
    }
  }
}
