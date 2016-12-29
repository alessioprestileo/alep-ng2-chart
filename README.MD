# alep-ng2-chart

## Installation

To install this Angular2 component, run:

```bash
$ npm install alep-ng2-chart --save
```

## Dependencies

This component depends on:

- **D3.js** (https://d3js.org/)

## Usage

Inputs:

  @Input() private emUpdateChart: EventEmitter<any>;
  @Input() private inputChart: iAlepNg2InputChart;
  @Input() private inputChartStyling: Object = {};

- **emUpdateChart: EventEmitter<any>** (optional) = reference to an event emitter that signals when to update the chart.
- **inputChart: iAlepNg2InputChart** (required) = object defined in dist/models/iAlepNg2InputChart.d.ts.
- **inputChartStyling: Object** (optional) = object that can have any of the properties defined in dist/models/iStylingChart.d.ts. Every property given in this input will override the corresponding property in the default styling object in a merge procedure. Any non-specified property will have the default value. 

## Development

Source code can be found at:

https://github.com/alessioprestileo/alep-ng2-chart.git

## License

MIT © [Alessio Prestileo](alessioprestileo@gmail.com)
