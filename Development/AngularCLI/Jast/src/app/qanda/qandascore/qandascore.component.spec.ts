import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QandascoreComponent } from './qandascore.component';

describe('QandascoreComponent', () => {
  let component: QandascoreComponent;
  let fixture: ComponentFixture<QandascoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QandascoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QandascoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
