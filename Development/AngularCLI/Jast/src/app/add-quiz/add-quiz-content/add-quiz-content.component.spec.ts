import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizContentComponent } from './add-quiz-content.component';

describe('AddQuizContentComponent', () => {
  let component: AddQuizContentComponent;
  let fixture: ComponentFixture<AddQuizContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuizContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
