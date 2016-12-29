import { Canvas } from "./Canvas";
import { iAlepNg2InputChart } from "./iAlepNg2InputChart";
import { iStylingChart } from "./iStylingChart";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";
import { Tooltip } from "./Tooltip";
import { Visualization } from "./Visualization";

declare var d3: any;

export class Chart {
  private canvas: Canvas;
  private d3SelectionParentContainer: any;
  private d3SelectionBackground: any;
  private inputChart: iAlepNg2InputChart;
  private styling: iStylingChart;
  private subtitle: Subtitle;
  private title: Title;
  private tooltip: Tooltip;
  private visualization: Visualization;

  constructor(
    chartContainerId: number,
    d3SelectionParentContainer: any,
    inputChart: iAlepNg2InputChart,
    styling: iStylingChart
  ) {
    this.d3SelectionParentContainer = d3SelectionParentContainer;
    this.inputChart = inputChart;
    this.styling = styling;
    this.canvas = new Canvas(this);
    this.d3SelectionBackground = this.createD3SelectionBackground();
    this.title = new Title(this.canvas);
    this.subtitle = new Subtitle(this.canvas);
    this.tooltip = new Tooltip(
      d3.select(`body`),
      chartContainerId,
      styling
    );
    this.visualization = new Visualization(this.canvas);
    this.adjustHeight();
  }
  /* Private methods */
  private adjustHeight() : void {
    let styling: iStylingChart = this.styling;
    let subtitleHeight: number = this.subtitle.getHeight();
    let titleHeight: number = this.title.getHeight();
    let visualizationHeight: number = this.visualization.getHeight();

    let subtitleMarginTop: number = styling.subtitle.marginTop[0];
    let titleMarginTop: number = styling.title.marginTop[0];
    let height: number =
      titleMarginTop +
      titleHeight +
      subtitleMarginTop +
      subtitleHeight +
      visualizationHeight;

    this.canvas.getD3Selection().style('height', height);
    this.d3SelectionBackground.style('height', height);
  }
  private createD3SelectionBackground() : any {
    let parentCanvas: any = this.canvas;
    let styling: iStylingChart = this.styling;

    let d3SelectionBackground: any = parentCanvas.d3Selection
      .append('rect')
      .attr('class', 'background')
      .style('fill', styling.backgroundColor[0])
      .style('width', parentCanvas.getWidth());
    return d3SelectionBackground;
  }
  /* Public methods */
  public getD3SelectionParentContainer() : any {
    return this.d3SelectionParentContainer;
  }
  public getInputChart() : iAlepNg2InputChart {
    return this.inputChart;
  }
  public getStyling() : iStylingChart {
    return this.styling;
  }
  public getSubtitle() : Subtitle {
    return this.subtitle;
  }
  public getTitle() : Title {
    return this.title;
  }
  public getTooltip() : Tooltip {
    return this.tooltip;
  }
}
