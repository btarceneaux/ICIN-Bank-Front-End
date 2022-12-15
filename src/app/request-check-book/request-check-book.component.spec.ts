import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCheckBookComponent } from './request-check-book.component';

describe('RequestCheckBookComponent', () => {
  let component: RequestCheckBookComponent;
  let fixture: ComponentFixture<RequestCheckBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCheckBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCheckBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
