import { Canvas } from "./Canvas";
import { iStylingChart } from "./iStylingChart";
import { Title } from "./Title";
import { WrappableD3TextElement } from "./WrappableD3TextElement";

export class Subtitle extends WrappableD3TextElement {
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
    let title: Title = this.parentCanvas.getParentChart().getTitle();

    let yPos: number =
      title.getHeight() +
      title.getYPos() +
      styling.subtitle.marginTop[0];
    this.yPos = yPos;
  }
  /* Protected methods */
  protected createD3Selection() : any {
    let parentCanvas: Canvas = this.parentCanvas;
    let styling: iStylingChart = this.parentCanvas
      .getParentChart()
      .getStyling();

    let text: string = parentCanvas.getParentChart().getInputChart().subtitle;
    let width: number = this.parentCanvas.getWidth();
    let xPos: number = this.getXPos();
    let yPos: number = this.getYPos();

    let d3Selection: any = parentCanvas.getD3Selection().append('text')
      .text(text)
      .attr('class', 'chart-subtitle')
      .attr({
        'transform': `translate(${xPos} ${yPos})`,
        'x': width / 2,
        'y': styling.subtitle.fontSize[0]
      })
      .style({
        'font-size': styling.subtitle.fontSize[0] + 'px',
        'font-weight': styling.subtitle.fontWeight[0],
        'text-anchor': 'middle'
      });
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
