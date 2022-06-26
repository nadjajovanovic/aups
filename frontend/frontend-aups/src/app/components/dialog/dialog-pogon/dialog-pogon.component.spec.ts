import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPogonComponent } from './dialog-pogon.component';

describe('DialogPogonComponent', () => {
  let component: DialogPogonComponent;
  let fixture: ComponentFixture<DialogPogonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPogonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPogonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
