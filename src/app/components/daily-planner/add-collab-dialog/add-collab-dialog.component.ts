import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-collab-dialog',
  templateUrl: './add-collab-dialog.component.html',
  styleUrls: ['./add-collab-dialog.component.css']
})
export class AddCollabDialogComponent implements OnInit {
  name:string = "";
  error:boolean = false;
  constructor(public dialogRef: MatDialogRef<AddCollabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
  }

  verifyName(): void{
    console.log(this.data.collaborators);
    this.error = this.data.collaborators.has(this.name);
  }

  onNoClick(): void {
    this.name = "";
    this.dialogRef.close();
  }
}
