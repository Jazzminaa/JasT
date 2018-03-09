import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayclozeComponent } from './playcloze.component';

describe('PlayclozeComponent', () => {
  let component: PlayclozeComponent;
  let fixture: ComponentFixture<PlayclozeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayclozeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayclozeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
