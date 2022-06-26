import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanProizvodnjeComponent } from './plan-proizvodnje.component';

describe('PlanProizvodnjeComponent', () => {
  let component: PlanProizvodnjeComponent;
  let fixture: ComponentFixture<PlanProizvodnjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanProizvodnjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanProizvodnjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
