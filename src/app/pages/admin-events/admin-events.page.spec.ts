import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEventsPage } from './admin-events.page';

describe('AdminEventsPage', () => {
  let component: AdminEventsPage;
  let fixture: ComponentFixture<AdminEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
