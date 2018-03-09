import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayqandaComponent } from './playqanda.component';

describe('PlayqandaComponent', () => {
  let component: PlayqandaComponent;
  let fixture: ComponentFixture<PlayqandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayqandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayqandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
