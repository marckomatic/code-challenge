import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCollabDialogComponent } from './remove-collab-dialog.component';

describe('RemoveCollabDialogComponent', () => {
  let component: RemoveCollabDialogComponent;
  let fixture: ComponentFixture<RemoveCollabDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCollabDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCollabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
