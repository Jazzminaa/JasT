import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiplayComponent } from './add-multiplay.component';

describe('AddMultiplayComponent', () => {
  let component: AddMultiplayComponent;
  let fixture: ComponentFixture<AddMultiplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultiplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
