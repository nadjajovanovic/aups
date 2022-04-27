import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SastojciComponent } from './sastojci.component';

describe('SastojciComponent', () => {
  let component: SastojciComponent;
  let fixture: ComponentFixture<SastojciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SastojciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SastojciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
