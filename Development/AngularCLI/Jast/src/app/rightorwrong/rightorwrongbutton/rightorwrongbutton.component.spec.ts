import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightorwrongbuttonComponent } from './rightorwrongbutton.component';

describe('RightorwrongbuttonComponent', () => {
  let component: RightorwrongbuttonComponent;
  let fixture: ComponentFixture<RightorwrongbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightorwrongbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightorwrongbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
