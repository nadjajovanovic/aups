import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProizvodComponent } from './dialog-proizvod.component';

describe('DialogProizvodComponent', () => {
  let component: DialogProizvodComponent;
  let fixture: ComponentFixture<DialogProizvodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProizvodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProizvodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
