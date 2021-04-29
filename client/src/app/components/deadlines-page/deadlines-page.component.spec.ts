import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinesPageComponent } from './deadlines-page.component';

describe('DeadlinesPageComponent', () => {
  let component: DeadlinesPageComponent;
  let fixture: ComponentFixture<DeadlinesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadlinesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
