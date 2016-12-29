import { D3Element } from "./D3Element";
import { iStylingChart } from "./iStylingChart";
import { Visualization } from "./Visualization";

export abstract class Legend extends D3Element {
  protected parentVisualization: Visualization;
  protected xPos: number;
  protected yPos: number;

  constructor(parentVisualization: Visualization) {
    super();
    this.parentVisualization = parentVisualization;

  }
  /* Protected methods */
  protected abstract getEntryLabels() : string[];
  protected createD3Selection() : any {
    let parentVisualization: Visualization = this.parentVisualization;
    let xPos: number = this.xPos;
    let yPos: number = this.yPos;

    let d3Selection: any = parentVisualization.getD3Selection()
      .append('g')
      .attr('class', 'chart-legend')
      .attr('transform', `translate(${xPos} ${yPos})`);
    return d3Selection;
  }
  protected createEntries() : void {
    let d3SelectionLegendGroup: any = this.d3Selection;
    let labels: string[] = this.getEntryLabels();
    let styling: iStylingChart = this.parentVisualization
      .getParentCanvas()
      .getParentChart()
      .getStyling();
    let d3ScaleColorPalette: any = this.parentVisualization
      .getChartBody()
      .getPlotArea()
      .getD3ScaleColorPalette();

    for (let i = 0; i < labels.length; i++) {
      let marginTop: number = styling.legend.marginTop[0];
      let fontSize: number = styling.legend.legendEntry
        .text
        .fontSize[0];
      let textMarginLeft: number = styling.legend.legendEntry
        .text
        .marginLeft[0];
      let symbolHeight: number = styling.legend.legendEntry
        .symbol
        .height[0];
      let symbolWidth: number = styling.legend.legendEntry
        .symbol
        .width[0];
      let legendEntryHeight: number = Math.max(symbolHeight, fontSize);
      let legendEntryVPos: number = i * (marginTop + legendEntryHeight);
      let legendEntry: any = d3SelectionLegendGroup
        .append('g')
        .attr('class', 'legend-entry')
        .attr(
          'transform',
          `translate(0 ${legendEntryVPos})`
        );
      legendEntry
        .append('rect')
        .attr('class', 'legend-entry-symbol')
        .attr({
          'fill': d3ScaleColorPalette(i),
          'height': symbolHeight,
          'width': symbolWidth
        });
      legendEntry
        .append('text')
        .attr('class', 'legend-entry-text')
        .text(labels[i])
        .attr({
          'font-size': fontSize,
          'transform':
            `translate(${symbolWidth + textMarginLeft} ${symbolHeight})`
        });
    }
  }
  /* Public methods */
  public getXPos() : number {
    return this.xPos;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
