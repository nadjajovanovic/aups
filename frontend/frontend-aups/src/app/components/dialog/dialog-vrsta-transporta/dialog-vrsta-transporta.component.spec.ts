import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVrstaTransportaComponent } from './dialog-vrsta-transporta.component';

describe('DialogVrstaTransportaComponent', () => {
  let component: DialogVrstaTransportaComponent;
  let fixture: ComponentFixture<DialogVrstaTransportaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVrstaTransportaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVrstaTransportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
