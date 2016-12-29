export interface iStylingChart {
  backgroundColor: string[],
  chartBody: {
    hAxis: {
      fontSize: number[],
      gridLines: {
        opacity: number[],
        stroke: string[],
        strokeWidth: number[]
      },
      label: {
        fontSize: number[],
        fontWeight: string[],
        marginTop: number[]
      },
      stroke: string[],
      strokeWidth: number[],
      ticks: {
        labelsAngle: number[],
        opacity: number[],
        stroke: string[],
        strokeWidth: number[]
      }
    },
    marginLeft: number[],
    marginRight: number[],
    marginTop: number[],
    plotArea: {
      aspectRatio: number[],
      bar: {
        barGap: number[],
        dataGroupPadding: number[],
        selectionOutline: {
          color: string[],
          opacity: number[],
          width: number[]
        }
      },
      dataPoint: {
        diameterDeselected: number[],
        diameterSelected: number[]
      },
      paletteRange: string[][],
      path: {
        strokeOpacity: number[],
        strokeWidthDeselected: number[],
        strokeWidthSelected: number[]
      },
      slice: {
        innerRadius: number[],
        selectionOutline: {
          color: string[],
          opacity: number[],
          width: number[]
        },
        outerRadius: number[]
      },
    },
    vAxis: {
      fontSize: number[],
      gridLines: {
        opacity: number[],
        stroke: string[],
        strokeWidth: number[]
      },
      label: {
        fontSize: number[],
        fontWeight: string[]
      },
      marginLeft: number[],
      stroke: string[],
      strokeWidth: number[],
      ticks: {
        opacity: number[],
        stroke: string[],
        strokeWidth: number[]
      }
    }
  },
  largeScreenSize: number,
  legend: {
    legendEntry:{
      symbol: {
        height:  [number],
        width:  [number],
      },
      text:{
        fontSize: [number],
        fontWeight: string[],
        marginLeft: [number]
      }
    },
    marginBottom: [number],
    marginTop: [number]
  },
  mediumScreenSize: number,
  subtitle: {
    fontSize: [number],
    fontWeight: string[],
    marginTop: [number]
  },
  title: {
    fontSize: [number],
    fontWeight: string[],
    marginTop: [number],
  },
  tooltip: {
    backgroundColor: string[],
    borderColor: string[],
    borderRadius: number[],
    borderWidth: number[],
    fadeInDuration: number[],
    fadeOutDuration: number[],
    fontSize: number[],
    fontColor: string[],
    opacity: number[],
    paddingBottom: number[],
    paddingLeft: number[],
    paddingRight: number[],
    paddingTop: number[]
  },
}
interface iStylingChart_New {
  backgroundColor: string[],
  chartBody: iStylingChartBody,
  largeScreenSize: number,
  legend: iStylingLegend,
  mediumScreenSize: number,
  subtitle: iStylingSubtitle,
  title: iStylingTitle,
  tooltip: iStylingTooltip
}
interface iStylingChartBody {
  marginLeft: number[],
  marginRight: number[],
  marginTop: number[]
  plotArea: iStylingPlotArea
}
interface iStylingChartBodyCircular extends iStylingChartBody {

}
interface iStylingChartBodyOrthogonal extends iStylingChartBody {
  labelsAxis: iStylingLabelsAxis,
  valuesAxis: iStylingValuesAxis
}
interface iStylingLabelsAxis {
  fontSize: number[],
  gridLines: {
    opacity: number[],
    stroke: string[],
    strokeWidth: number[]
  },
  label: {
    fontSize: number[],
    fontWeight: string[],
    marginTop: number[]
  },
  stroke: string[],
  strokeWidth: number[],
  ticks: {
    labelsAngle: number[],
    opacity: number[],
    stroke: string[],
    strokeWidth: number[]
  }
}
interface iStylingLegend {
  legendEntry:{
    symbol: {
      height:  [number],
      width:  [number],
    },
    text:{
      fontSize: [number],
      fontWeight: string[],
      marginLeft: [number]
    }
  },
  marginBottom: [number],
  marginTop: [number]
}
interface iStylingPlotArea {
  aspectRatio: number[],
  paletteRange: string[][]
}
interface iStylingPlotAreaBar extends iStylingPlotArea {
  barGap: number[],
  dataGroupPadding: number[],
  selectionOutline: {
    color: string[],
    opacity: number[],
    width: number[]
  }
}
interface iStylingPlotAreaDonut extends iStylingPlotArea {
  innerRadius: number[],
  selectionOutline: {
    color: string[],
    opacity: number[],
    width: number[]
  },
  outerRadius: number[]
}
interface iStylingPlotAreaLine extends iStylingPlotArea {
  dataPoint: {
    diameterDeselected: number[],
    diameterSelected: number[]
  },
  path: {
    strokeOpacity: number[],
    strokeWidthDeselected: number[],
    strokeWidthSelected: number[]
  }
}
interface iStylingPlotAreaPie extends iStylingPlotArea {
  selectionOutline: {
    color: string[],
    opacity: number[],
    width: number[]
  },
  outerRadius: number[]
}
interface iStylingSubtitle {
  fontSize: [number],
  fontWeight: string[],
  marginTop: [number]
}
interface iStylingTitle {
  fontSize: [number],
  fontWeight: string[],
  marginTop: [number]
}
interface iStylingTooltip {
  backgroundColor: string[],
  borderColor: string[],
  borderRadius: number[],
  borderWidth: number[],
  fadeInDuration: number[],
  fadeOutDuration: number[],
  fontSize: number[],
  fontColor: string[],
  opacity: number[],
  paddingBottom: number[],
  paddingLeft: number[],
  paddingRight: number[],
  paddingTop: number[]
}
interface iStylingValuesAxis {
  fontSize: number[],
  gridLines: {
    opacity: number[],
    stroke: string[],
    strokeWidth: number[]
  },
  label: {
    fontSize: number[],
    fontWeight: string[]
  },
  marginLeft: number[],
  stroke: string[],
  strokeWidth: number[],
  ticks: {
    opacity: number[],
    stroke: string[],
    strokeWidth: number[]
  }
}
