export abstract class D3Element {
  protected d3Selection: any;

  constructor() {}
  /* Protected methods */
  protected abstract createD3Selection() : any

  /* Public methods */
  public abstract getXPos() : number;
  public abstract getYPos() : number;
  public getD3Selection() : any {
    return this.d3Selection;
  }
  public getHeight() : number {
    return this.d3Selection[0][0].getBBox().height;
  }
  public getWidth() : number {
    return this.d3Selection[0][0].getBBox().width;
  }

}
