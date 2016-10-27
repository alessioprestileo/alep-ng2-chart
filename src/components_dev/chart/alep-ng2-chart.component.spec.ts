/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlepNg2ChartComponent } from './alep-ng2-chart.component';

describe('AlepNg2ChartComponent', () => {
  let component: AlepNg2ChartComponent;
  let fixture: ComponentFixture<AlepNg2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlepNg2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlepNg2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
