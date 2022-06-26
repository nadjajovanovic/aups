import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSkladisteComponent } from './dialog-skladiste.component';

describe('DialogSkladisteComponent', () => {
  let component: DialogSkladisteComponent;
  let fixture: ComponentFixture<DialogSkladisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSkladisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSkladisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
