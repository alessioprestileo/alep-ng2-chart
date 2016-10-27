import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { AlepNg2ChartComponent } from './alep-ng2-chart.component';

@NgModule({
  declarations: [
    AlepNg2ChartComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AlepNg2ChartComponent
  ],
  providers: [ ]
})
export class AlepNg2ChartModule { }
