import {D3Element} from "./D3Element";
import {ChartBody} from "./ChartBody";

declare var d3: any;

export abstract class PlotArea extends D3Element{
  protected d3ScaleColorPalette: any;
  protected height: number;
  protected parentChartBody: ChartBody;
  protected width: number;
  protected xPos: number;
  protected yPos: number;

  constructor() {
    super();
  }
  /* Protected methods */
  protected createD3ScaleColorPalette(
    domainLength: number,
    colorRange: string[]
  ) : any {
    let domain: number[] = [];
    for (let i = 0; i < domainLength; i++) {
      domain.push(i);
    }
    let d3ScaleColorPalette: any = d3.scale.ordinal()
      .domain(domain)
      .range(colorRange);
    return d3ScaleColorPalette;
  }
  protected createD3Selection() : any {
    let d3SelectionChartBody: any = this.parentChartBody.getD3Selection();
    let xPos: number = this.xPos;
    let yPos: number = this.yPos;

    let d3Selection: any = d3SelectionChartBody
      .append('g')
      .attr('class', 'plotArea')
      .attr('transform', `translate(${xPos} ${yPos})`);
    return d3Selection;
  }
  protected abstract setDimensions() : void;
  protected abstract setHeight() : void;
  protected abstract setWidth() : void;
  protected abstract setXPos() : void;
  protected abstract setYPos() : void;
  protected setPosition() : void {
    this.setXPos();
    this.setYPos();
  }
  /* Public methods */
  public abstract drawData() : void;
  public getD3ScaleColorPalette() : any {
    return this.d3ScaleColorPalette;
  }
  public getHeight() : number {
    return this.height;
  }
  public getWidth() : number {
    return this.width;
  }
  public getXPos() : number {
    return this.xPos;
  }
  public getYPos() : number {
    return this.yPos;
  }
}
