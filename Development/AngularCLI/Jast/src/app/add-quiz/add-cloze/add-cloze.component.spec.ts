import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClozeComponent } from './add-cloze.component';

describe('AddClozeComponent', () => {
  let component: AddClozeComponent;
  let fixture: ComponentFixture<AddClozeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClozeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClozeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
