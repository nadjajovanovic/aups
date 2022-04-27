import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrstaTransportaComponent } from './vrsta-transporta.component';

describe('VrstaTransportaComponent', () => {
  let component: VrstaTransportaComponent;
  let fixture: ComponentFixture<VrstaTransportaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrstaTransportaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrstaTransportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
