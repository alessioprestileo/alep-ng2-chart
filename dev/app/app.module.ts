import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlepNg2ChartModule } from '../../src/components/chart/alep-ng2-chart.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AlepNg2ChartModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
