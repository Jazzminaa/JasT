import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMultichoiceComponent } from './play-multichoice.component';

describe('PlayMultichoiceComponent', () => {
  let component: PlayMultichoiceComponent;
  let fixture: ComponentFixture<PlayMultichoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMultichoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMultichoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
