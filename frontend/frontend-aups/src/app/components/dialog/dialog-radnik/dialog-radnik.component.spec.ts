import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRadnikComponent } from './dialog-radnik.component';

describe('DialogRadnikComponent', () => {
  let component: DialogRadnikComponent;
  let fixture: ComponentFixture<DialogRadnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRadnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
