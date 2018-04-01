import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizComponent } from './my-quiz.component';

describe('MyQuizComponent', () => {
  let component: MyQuizComponent;
  let fixture: ComponentFixture<MyQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
