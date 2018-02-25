import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayOverviewComponent } from './multiplay-overview.component';

describe('MultiplayOverviewComponent', () => {
  let component: MultiplayOverviewComponent;
  let fixture: ComponentFixture<MultiplayOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplayOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
