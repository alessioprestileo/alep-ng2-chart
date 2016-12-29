import { ChartBody } from "./ChartBody";
import { ChartBodyCircular } from "./ChartBodyCircular";
import { iCollection } from "./iCollection";
import { iStylingChart } from "./iStylingChart";
import { PlotArea } from "./PlotArea";
import { Tooltip } from "./Tooltip";

declare var d3: any;

export abstract class PlotAreaCircular extends PlotArea {
  protected innerRadius: number;
  protected outerRadius: number;
  protected parentChartBody: ChartBodyCircular;

  constructor(parentChartBody: ChartBody) {
    super();
    this.parentChartBody = (<ChartBodyCircular>parentChartBody);
    this.d3ScaleColorPalette = this.createD3ScaleColorPalette(
      this.getD3ScaleColorPaletteDomainLength(),
      this.getD3ScaleColorPaletteRange()
    );
  }
  /* Private methods */
  private getD3ScaleColorPaletteDomainLength() : number {
    return this.parentChartBody.getCollections()[0].labels.length;
  }
  private getD3ScaleColorPaletteRange() : string[] {
    let range: string[] = this.parentChartBody
      .getParentVisualization()
      .getParentCanvas()
      .getParentChart()
      .getStyling()
      .chartBody.plotArea.paletteRange[0];
    return range;
  }
  /* Protected methods */
  protected abstract setRadii() : void;
  protected setDimensions() : void {
    this.setWidth();
    this.setHeight();
  }
  protected setHeight() : void {
    this.height = this.width;
  }
  protected setWidth() : void {
    this.width = this.parentChartBody.getWidth();
  }
  protected setXPos() : void {
    this.xPos = this.width / 2
  }
  protected setYPos() : void {
    this.yPos = this.width / 2
  }
  /* Public methods */
  public drawData() : void {
    let collection: iCollection = this.parentChartBody.getCollections()[0];
    let d3ScaleColorPalette: any = this.d3ScaleColorPalette;
    let d3Selection: any = this.d3Selection;
    let innerRadius = this.innerRadius;
    let outerRadius = this.outerRadius;
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

    let newLine: string = '<br/>';
    let sliceArc: any = d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    let pieLayout: any = d3.layout.pie()
      .sort(null)
      .value(function(d) {return d});
    let d3SelectionSlice: any = d3Selection.selectAll(".slice")
      .data(pieLayout(collection.values))
      .enter()
      .append("g")
      .attr("class", "slice");
    d3SelectionSlice.append("path")
      .attr("class", "arc")
      .attr("d", sliceArc)
      .style("fill", function(d, index) {return d3ScaleColorPalette(index)})
      .on('mouseover', function(d, index) {
        // Add shadow
        this.setAttribute(
          'stroke',
          styling.chartBody.plotArea
            .slice
            .selectionOutline
            .color[0]
        );
        this.setAttribute(
          'stroke-opacity',
          styling.chartBody.plotArea
            .slice
            .selectionOutline
            .opacity[0]
        );
        this.setAttribute(
          'stroke-width',
          styling.chartBody.plotArea
            .slice
            .selectionOutline
            .width[0]
        );
        // Define tooltip info
        tooltip.getD3Selection().html(
          collection.name + newLine +
          collection.labels[index] + ': ' + d.value
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
    // If slice is selected, deselect it when user touches on body
    d3.select('body')[0][0]
      .addEventListener('touchstart', function() {
        // Deselect slice if selected
        let length: number = d3SelectionSlice[0].length;
        for (let i = 0; i < length; i++) {
          let sliceArcSelection: any = d3SelectionSlice[0][i]
            .querySelector('.arc');
          if (sliceArcSelection.getAttribute('stroke') !== 'none') {
            sliceArcSelection.setAttribute('stroke', 'none');
            break;
          }
        }
      });
  }
}
