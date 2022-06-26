import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRadnaMestaComponent } from './dialog-radna-mesta.component';

describe('DialogRadnaMestaComponent', () => {
  let component: DialogRadnaMestaComponent;
  let fixture: ComponentFixture<DialogRadnaMestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRadnaMestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRadnaMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
