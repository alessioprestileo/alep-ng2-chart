import { ChartBody } from "./ChartBody";
import { iCollection } from "./iCollection";
import { iStylingChart } from "./iStylingChart";
import { PlotAreaOrthogonal } from "./PlotAreaOrthogonal";
import { Tooltip } from "./Tooltip";

declare var d3: any;

export class PlotAreaBar extends PlotAreaOrthogonal {
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
    let length_Collections: number = collections.length;
    let barGap: number = styling.chartBody.plotArea
      .bar.
      barGap[0];
    let totDataPoints: number = collections[0].labels.length;
    let dataGroupPadding: number =
      styling.chartBody.plotArea.bar.dataGroupPadding[0];
    let dataGroupWidth: number = this.width / totDataPoints;
    let barWidth: number =
      (dataGroupWidth -
        2 * dataGroupPadding -
        barGap * (length_Collections - 1)
      ) / length_Collections;
    let values: number[];
    for (let i = 0; i < length_Collections; i++) {
      values = collections[i].values;
      let d3SelectionCollection: any = d3Selection
        .append('g')
        .attr('class', 'collection');
      let d3SelectionBar: any = d3SelectionCollection.selectAll('.bar')
        .data(values)
        .enter()
        .append('rect')
        .attr({
          'class': 'bar',
          'x': function(d, index) {
            let result: number =
              d3ScaleLabelsAxis(index) +
              dataGroupPadding +
              barGap * i +
              barWidth * i;
            return result;
          },
          'y': function(d) { return d3ScaleValuesAxis(d)},
          'fill': d3ScaleColorPalette(i),
          'height': function(d) {
            return (d3ScaleValuesAxis(0) - d3ScaleValuesAxis(d))
          },
          'width': barWidth + 'px'
        })
        .on('mouseover', function(d, index) {
          // Add shadow
          this.setAttribute(
            'stroke',
            styling.chartBody.plotArea
              .bar
              .selectionOutline
              .color[0]
          );
          this.setAttribute(
            'stroke-opacity',
            styling.chartBody.plotArea
              .bar
              .selectionOutline
              .opacity[0]
          );
          this.setAttribute(
            'stroke-width',
            styling.chartBody.plotArea
              .bar
              .selectionOutline
              .width[0] ||
            barGap * 2
          );
          // Define tooltip info
          tooltip.getD3Selection().html(
            collections[i].name + newLine +
            collections[i].labels[index] + ': ' + d
          );
          // Show tooltip
          tooltip.show(d3Selection);
        })
        .on('mouseout', function(d) {
          // Remove shadow
          this.setAttribute('stroke', 'none');
          // Fade out tooltip
          tooltip.hide();
        });
      // If bar is selected, deselect it when user touches on body
      d3.select('body')[0][0]
        .addEventListener('touchstart', function() {
          // Deselect bar if selected
          let length: number = d3SelectionBar[0].length;
          for (let i = 0; i < length; i++) {
            if (d3SelectionBar[0][i].getAttribute('stroke') !== 'none') {
              d3SelectionBar[0][i].setAttribute('stroke', 'none');
              break;
            }
          }
        });
    }
  }
}
