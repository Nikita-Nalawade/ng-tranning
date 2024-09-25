import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewToDoListComponent } from './view-to-do-list.component';

describe('ViewToDoListComponent', () => {
  let component: ViewToDoListComponent;
  let fixture: ComponentFixture<ViewToDoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewToDoListComponent]
    });
    fixture = TestBed.createComponent(ViewToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
