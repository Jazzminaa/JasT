import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeinputComponent } from './clozeinput.component';

describe('ClozeinputComponent', () => {
  let component: ClozeinputComponent;
  let fixture: ComponentFixture<ClozeinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClozeinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozeinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
