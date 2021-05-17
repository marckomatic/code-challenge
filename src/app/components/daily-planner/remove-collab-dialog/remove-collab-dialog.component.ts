import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorSchedule } from 'src/app/models/CollaboratorSchedule';

@Component({
  selector: 'app-remove-collab-dialog',
  templateUrl: './remove-collab-dialog.component.html',
  styleUrls: ['./remove-collab-dialog.component.css']
})
export class RemoveCollabDialogComponent implements OnInit {
  collabBackup: CollaboratorSchedule[] = [];

  constructor(
    public dialogRef: MatDialogRef<RemoveCollabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    for(let elemento of this.data.collaborators){
      this.collabBackup.push(elemento);
    }
  }


  ngOnInit(): void {

  }

  removePerson(name: string) {
    let index: number = -1;
    for (let i = 0; i < this.collabBackup.length; i++) {
      if (this.collabBackup[i].name == name) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      (this.collabBackup as CollaboratorSchedule[]).splice(index, 1);
    }
  }

  onNoClick(): void {
    this.data.collaborators = this.collabBackup;
    this.dialogRef.close();
  }


}
