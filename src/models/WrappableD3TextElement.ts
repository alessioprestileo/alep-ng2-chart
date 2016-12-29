import { D3Element } from './D3Element';

export abstract class WrappableD3TextElement extends D3Element {
  constructor() {
    super();
  }

  protected wrap(d3SelectionText: any, width: number) : void {
    let words = d3SelectionText.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = d3SelectionText.attr("x"),
      y = d3SelectionText.attr("y"),
      dy = 0,
      fontSize = 1 + 'em',
      fontWeight = d3SelectionText.style('font-weight'),
      tSpan = d3SelectionText.text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em")
        .style({
          'font-size': fontSize,
          'font-weight': fontWeight
        });
    while (word = words.pop()) {
      line.push(word);
      tSpan.text(line.join(" "));
      if (tSpan.node().getComputedTextLength() > width) {
        line.pop();
        tSpan.text(line.join(" "));
        line = [word];
        tSpan = d3SelectionText.append("tspan")
          .text(word)
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .style({
            'font-size': fontSize,
            'font-weight': fontWeight
          });
      }
    }
  }
}
