import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiztypeinfoComponent } from './quiztypeinfo.component';

describe('QuiztypeinfoComponent', () => {
  let component: QuiztypeinfoComponent;
  let fixture: ComponentFixture<QuiztypeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiztypeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiztypeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
