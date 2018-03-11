import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRightorwrongComponent } from './add-rightorwrong.component';

describe('AddRightorwrongComponent', () => {
  let component: AddRightorwrongComponent;
  let fixture: ComponentFixture<AddRightorwrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRightorwrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRightorwrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
