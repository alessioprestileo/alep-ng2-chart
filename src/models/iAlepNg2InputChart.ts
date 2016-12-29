import { iAlepNg2InputChartColl } from './iAlepNg2InputChartColl'

export interface iAlepNg2InputChart {
  collections: iAlepNg2InputChartColl[];
  hAxisLabel: string;
  id: number;
  name: string;
  subtitle: string;
  title: string;
  type: string;
  vAxisLabel: string;
}
