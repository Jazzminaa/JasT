import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRightandWrongComponent } from './play-rightand-wrong.component';

describe('PlayRightandWrongComponent', () => {
  let component: PlayRightandWrongComponent;
  let fixture: ComponentFixture<PlayRightandWrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayRightandWrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayRightandWrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
