import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoListComponent } from './delete-todo-list.component';

describe('DeleteTodoListComponent', () => {
  let component: DeleteTodoListComponent;
  let fixture: ComponentFixture<DeleteTodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTodoListComponent]
    });
    fixture = TestBed.createComponent(DeleteTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
