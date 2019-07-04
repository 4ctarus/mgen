import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YcalendarComponent } from './ycalendar.component';

describe('YcalendarComponent', () => {
  let component: YcalendarComponent;
  let fixture: ComponentFixture<YcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
