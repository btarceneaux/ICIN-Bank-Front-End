import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookRequestsComponent } from './checkbook-requests.component';

describe('CheckbookRequestsComponent', () => {
  let component: CheckbookRequestsComponent;
  let fixture: ComponentFixture<CheckbookRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbookRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckbookRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
