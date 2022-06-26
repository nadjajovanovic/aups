import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSastojciComponent } from './dialog-sastojci.component';

describe('DialogSastojciComponent', () => {
  let component: DialogSastojciComponent;
  let fixture: ComponentFixture<DialogSastojciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSastojciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSastojciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
