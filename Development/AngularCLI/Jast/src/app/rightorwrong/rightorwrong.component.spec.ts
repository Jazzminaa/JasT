import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightorwrongComponent } from './rightorwrong.component';

describe('RightorwrongComponent', () => {
  let component: RightorwrongComponent;
  let fixture: ComponentFixture<RightorwrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightorwrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightorwrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
