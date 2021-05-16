import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollabDialogComponent } from './add-collab-dialog.component';

describe('AddCollabDialogComponent', () => {
  let component: AddCollabDialogComponent;
  let fixture: ComponentFixture<AddCollabDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollabDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
