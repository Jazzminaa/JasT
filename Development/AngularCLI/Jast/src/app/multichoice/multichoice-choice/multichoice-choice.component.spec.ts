import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichoiceChoiceComponent } from './multichoice-choice.component';

describe('MultichoiceChoiceComponent', () => {
  let component: MultichoiceChoiceComponent;
  let fixture: ComponentFixture<MultichoiceChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultichoiceChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultichoiceChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
