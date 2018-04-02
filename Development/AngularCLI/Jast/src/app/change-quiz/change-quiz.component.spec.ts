import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQuizComponent } from './change-quiz.component';

describe('ChangeQuizComponent', () => {
  let component: ChangeQuizComponent;
  let fixture: ComponentFixture<ChangeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
