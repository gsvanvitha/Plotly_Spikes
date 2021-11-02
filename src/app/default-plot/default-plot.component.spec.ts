import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPlotComponent } from './default-plot.component';

describe('DefaultPlotComponent', () => {
  let component: DefaultPlotComponent;
  let fixture: ComponentFixture<DefaultPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
