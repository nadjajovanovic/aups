import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PogonComponent } from './pogon.component';

describe('PogonComponent', () => {
  let component: PogonComponent;
  let fixture: ComponentFixture<PogonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PogonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PogonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
