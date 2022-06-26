import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlanProizvodnjeComponent } from './dialog-plan-proizvodnje.component';

describe('DialogPlanProizvodnjeComponent', () => {
  let component: DialogPlanProizvodnjeComponent;
  let fixture: ComponentFixture<DialogPlanProizvodnjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlanProizvodnjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlanProizvodnjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
