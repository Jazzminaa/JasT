import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMemoryComponent } from './play-memory.component';

describe('PlayMemoryComponent', () => {
  let component: PlayMemoryComponent;
  let fixture: ComponentFixture<PlayMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
