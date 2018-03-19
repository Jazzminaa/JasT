import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultichoiceComponent } from './add-multichoice.component';

describe('AddMultichoiceComponent', () => {
  let component: AddMultichoiceComponent;
  let fixture: ComponentFixture<AddMultichoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultichoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultichoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
