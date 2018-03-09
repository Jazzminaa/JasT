import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QandainputComponent } from './qandainput.component';

describe('QandainputComponent', () => {
  let component: QandainputComponent;
  let fixture: ComponentFixture<QandainputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QandainputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QandainputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
