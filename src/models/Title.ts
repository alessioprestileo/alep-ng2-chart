import { Canvas } from "./Canvas";
import { iStylingChart } from "./iStylingChart";
import { WrappableD3TextElement } from './WrappableD3TextElement'

export class Title extends WrappableD3TextElement {
  private parentCanvas: Canvas;
  private xPos: number;
  private yPos: number;

  constructor(parentCanvas: Canvas) {
    super();
    this.parentCanvas = parentCanvas;
    this.setPosition();
    this.d3Selection = this.createD3Selection();
  }
  /* Private methods */
  private setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  private setXPos() : void {
    this.xPos = 0;
  }
  private setYPos() : void {
    let styling: iStylingChart = this.parentCanvas
      .getParentChart()
      .getStyling();

    let yPos: number = styling.title.marginTop[0];
    this.yPos = yPos;
  }
  /* Protected methods */
  protected createD3Selection() : any {
    let parentCanvas: Canvas = this.parentCanvas;
    let styling: iStylingChart = this.parentCanvas
      .getParentChart()
      .getStyling();
    let text: string = this.parentCanvas.getParentChart().getInputChart()
      .title;
    let width: number = this.parentCanvas.getWidth();
    let xPos: number = this.getXPos();
    let yPos: number = this.getYPos();

    let d3Selection: any = parentCanvas.getD3Selection().append('text')
      .attr('class', 'chart-title')
      .attr('transform', `translate(${xPos} ${yPos})`)
      .attr('x', width / 2)
      .attr('y', styling.title.fontSize[0])
      .text(text)
      .style('font-size', styling.title.fontSize[0] + 'px')
      .style('font-weight', styling.title.fontWeight[0])
      .style('text-anchor', 'middle');
    this.wrap(d3Selection, width);
    return d3Selection;
  }
  /* Public methods */
  public getXPos() : number {
    return this.xPos;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
