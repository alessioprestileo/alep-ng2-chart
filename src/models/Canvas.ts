import { Chart } from './Chart';
import { D3Element } from './D3Element';

export class Canvas extends D3Element {
  private parentChart: Chart;
  private width: number;

  constructor(parentChart: Chart) {
    super();
    this.parentChart = parentChart;
    this.d3Selection = this.createD3Selection();
    this.setWidth();
  }
  /* Private methods */
  private setWidth() : void {
    let d3SelectionParentChartContainer: any = this.parentChart
      .getD3SelectionParentContainer();

    this.width = d3SelectionParentChartContainer[0][0].offsetWidth;
  }
  /* Protected methods */
  protected createD3Selection() : any {
    let d3SelectionParentChartContainer: any = this.parentChart
      .getD3SelectionParentContainer();

    let canvasWidth: number = d3SelectionParentChartContainer[0][0].offsetWidth;
    let d3Selection = d3SelectionParentChartContainer
      .append('svg')
      .attr('class', 'canvas')
      .style('height', window.innerHeight)
      .style('width', canvasWidth);
    // Get correct value for canvasWidth. For some reason the correct value
    // is given only after appending the canvas, and only if the height of the
    // canvas is a large enough value.
    canvasWidth = d3SelectionParentChartContainer[0][0].offsetWidth;
    // Update canvas width
    d3Selection.style('width', canvasWidth);
    return d3Selection;
  }
  /* Public methods */
  public getParentChart(): Chart {
    return this.parentChart;
  }
  public getWidth() : number {
    return this.width;
  }
  public getXPos() : number {
    return 0;
  }
  public getYPos() : number {
    return 0;
  }
}
