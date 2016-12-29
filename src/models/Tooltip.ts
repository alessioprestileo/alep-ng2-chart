import {iStylingChart} from "./iStylingChart";

declare var d3: any;

export class Tooltip {
  private chartContainerId: number;
  private d3Selection: any;
  private parentD3SelectionDocumentBody: any;
  private styling: iStylingChart;

  constructor(
    parentD3SelectionDocumentBody: any,
    chartContainerId: number,
    styling: iStylingChart
  ) {
    this.parentD3SelectionDocumentBody = parentD3SelectionDocumentBody;
    this.chartContainerId = chartContainerId;
    this.styling = styling;
    this.d3Selection = this.createD3Selection();
    this.fadeOutOnBodyTouchstart();
  }
  /* Private methods */
  private createD3Selection() {
    let chartContainerId: number = this.chartContainerId;
    let parentD3SelectionDocumentBody: any = this.parentD3SelectionDocumentBody;
    let styling: iStylingChart = this.styling;

    let tooltipSelection: any = parentD3SelectionDocumentBody
      .append('div')
      .attr('class', 'alep-ng2-chart-tooltip')
      .style({
        'background': styling.tooltip.backgroundColor[0],
        'border-color': styling.tooltip.borderColor[0],
        'border-radius': styling.tooltip.borderRadius[0] + 'px',
        'color': styling.tooltip.fontColor[0],
        'font-size': styling.tooltip.fontSize[0] + 'px',
        'left': '0px',
        'opacity': 0,
        'padding-bottom': styling.tooltip.paddingBottom[0] + 'px',
        'padding-left': styling.tooltip.paddingLeft[0] + 'px',
        'padding-right': styling.tooltip.paddingRight[0] + 'px',
        'padding-top': styling.tooltip.paddingTop[0] + 'px',
        'top': '0px',
        'position': 'absolute'
      });
    tooltipSelection[0][0].setAttribute(
      'tooltip-id', chartContainerId
    );
    return tooltipSelection;
  }
  private fadeOutOnBodyTouchstart() : void {
    let d3Selection: any = this.d3Selection;
    let styling: iStylingChart = this.styling;

    let fadeOutDuration: number = styling.tooltip
      .fadeOutDuration[0];
    d3.select('body')[0][0]
      .addEventListener('touchstart', function() {
        // Fade out tooltip if active
        if (
          d3Selection.style('opacity') ===
          styling.tooltip.opacity[0].toString()
        ) {
          d3Selection.transition()
            .duration(fadeOutDuration)
            .style('opacity', 0);
        }
      });
  }
  /* Public methods */
  public getD3Selection() : any {
    return this.d3Selection;
  }
  public hide() : void {
    let styling: iStylingChart = this.styling;

    let fadeOutDuration: number = styling.tooltip.fadeOutDuration[0];
    this.d3Selection.transition()
      .duration(fadeOutDuration)
      .style('opacity', 0);
  }
  public show(d3SelectionPlotArea: any) : void {
    let d3Selection: any = this.d3Selection;
    let styling: iStylingChart = this.styling;

    let fadeInDuration: number = styling.tooltip.fadeInDuration[0];
    let width: number = d3Selection[0][0].offsetWidth;
    d3Selection
      .style('left', function() {
        let plotAreaMarginLeft: number = d3SelectionPlotArea[0][0]
          .getBoundingClientRect().left;
        let plotAreaWidth: number = d3SelectionPlotArea[0][0]
          .getBoundingClientRect().width;
        let result: string =
          (d3.event.pageX - plotAreaMarginLeft) < plotAreaWidth / 2 ?
          d3.event.pageX + 'px' :
          (d3.event.pageX - width) + 'px';
        return result;
      })
      .style('top', (d3.event.pageY - 4 * 12) + 'px');
    d3Selection.transition()
      .duration(fadeInDuration)
      .style(
        'opacity',
        styling.tooltip.opacity[0]
      );
  }
}
