import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMestaComponent } from './dialog-mesta.component';

describe('DialogMestaComponent', () => {
  let component: DialogMestaComponent;
  let fixture: ComponentFixture<DialogMestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
