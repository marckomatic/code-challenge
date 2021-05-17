import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CollaboratorSchedule } from 'src/app/models/CollaboratorSchedule';
import { ScheduleManagerService, defineTimeLabels } from 'src/app/services/schedule-manager.service';
import { AddCollabDialogComponent } from './add-collab-dialog/add-collab-dialog.component';
import { RemoveCollabDialogComponent } from './remove-collab-dialog/remove-collab-dialog.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';

@Component({
  selector: 'app-daily-planner',
  templateUrl: './daily-planner.component.html',
  styleUrls: ['./daily-planner.component.css']
})
export class DailyPlannerComponent implements OnInit {
  //Labels for office hours time intervals 
  officeHours: string[] = [] as string[];
  lunchHours: string[] = [] as string[];

  //All the collaborators with their busy times, it is binded to the table in view.
  collaborators: CollaboratorSchedule[] = [
    {
      name: "Kyle",
      busyTimes: ["1:30 PM", "2:30 PM", "6:00 PM"]
    },
    {
      name: "Paul",
      busyTimes: ["7:00 AM", "9:00 AM", "1:30 PM", "3:00 PM", "3:30PM"]
    },
    {
      name: "Alex",
      busyTimes: ["8:00 AM", "9:30 AM", "12:30 PM", "3:00 PM"]
    },
    {
      name: "Manuel",
      busyTimes: ["9:00 AM", "1:30 PM", "3:00 PM", "3:30 PM"]
    },
    {
      name: "Jairo",
      busyTimes: ["8:00 AM", "9:00 AM", "6:00 PM"]
    },
    {
      name: "Ashlie",
      busyTimes: ["8:00 AM", "12:30 PM", "1:30 PM", "3:30 PM"]
    }
  ]

  constructor(private _scheduleManager: ScheduleManagerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.officeHours = Array.from(this._scheduleManager.getTimeLabels())
  }

  /***
   * *******************FUNCTIONS FOR THE PLANNER TOOLBAR BUTTONS****************************
   */

  /**
   * Shows a dialogue with the input and the output of the challenge.
   */
  runChallenge() {
    let input: string = JSON.stringify(this.collaborators);
    let output: string = this._scheduleManager.getFreeCollaboratorsSchedule(this.collaborators);

    //The collaborators returns with a set of busyTimes, we need to get it back to an array.
    this.turnbackBusyTimesToArray();

    //Open result dialog.
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '80%',
      data: {
        input: input.split("},").join("},\n"),
        output: output.split("},").join("},\n")
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  addCollaborator() {
    //Adding the collaborators names to a set to verify it the new collaborator does't have the name of any of these.
    let setOfNames: Set<string> = new Set<string>();
    for (let element of this.collaborators) {
      setOfNames.add(element.name.toLocaleLowerCase());
    }

    //Calling the dialog of Add Collaborator.
    const dialogRef = this.dialog.open(AddCollabDialogComponent, {
      width: '300px',
      data: {
        collaborators: setOfNames
      }
    });

    //If the dialog returns the name, it means that it can be added to the collaboratos succesfully.
    dialogRef.afterClosed().subscribe(result => {
      let collabNameIsCorrect = !(result == null || result == "")
      if (collabNameIsCorrect)
        this.collaborators.push(new CollaboratorSchedule(result, []));
    });
  }

  /**
   * Remove a collaborator from the collaborators array.
   */
  removeCollaborator() {
    const dialogRef = this.dialog.open(RemoveCollabDialogComponent, {
      width: '300px',
      data: { collaborators: this.collaborators }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null)
        this.collaborators = result;
    });
  }

  /***
   * ***********************FUNTIONS FOR THE PLANNER SCHEDULE******************************************
   */

  /**
   * Add a busy time to the collaborator in an specified time
   * if it is busy, then it turns into an available time.
   * @param collaborator collaborator schedule info
   * @param time time label that we are looking for
   */
  addBusyTime(collaborator: CollaboratorSchedule, time: string): void {
    //If the time interval is a lunch time interval, it can't be converted into a busy time.
    if (this._scheduleManager.itIsALunchTimeInterval(time)) {
      return;
    }
    let containsThisTime = false;
    let index = 0;

    //Verify in the collaborators bussy tima if the time exists, to remove it.
    for (index = 0; index < (collaborator.busyTimes as string[]).length; index++) {
      containsThisTime = (collaborator.busyTimes as string[])[index] == time ? true : false;
      if (containsThisTime) {
        break;
      }
    }
    if (containsThisTime) {
      (collaborator.busyTimes as string[]).splice(index, 1);
    } else {
      (collaborator.busyTimes as string[]).push(time);
    }
  }

  /**
  * Return a color to apply to the time cell in the table, depending on if the 
  * collaborator is available or not in the time interval, or if it's a lunch time interval.
  * @param collaborator collaborator schedule info
  * @param time time in that we are looking if collab is available
  * @returns a color in string format for the cell.
  */
  colorTimeCell(collaborator: CollaboratorSchedule, time: string) {
    if (this._scheduleManager.itIsALunchTimeInterval(time)) {
      return '#b0c218'
    }
    return (collaborator.busyTimes as string[]).includes(time) ? '#C2185B' : 'white';
  }

  /***
   * ******************* OTHER FUNCTIONS *********************************************************
   */

  /**
   * This function turns back to an array the busy times of the collaborators after they are sended to 
   * ScheduleManager Service.
   */
  turnbackBusyTimesToArray(): void {
    for (let colaborator of this.collaborators) {
      colaborator.busyTimes = Array.from(colaborator.busyTimes);
    }
  }

}
