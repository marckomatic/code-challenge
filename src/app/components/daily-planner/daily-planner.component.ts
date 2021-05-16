import { Component, OnInit } from '@angular/core';
import { CollaboratorSchedule } from 'src/app/models/CollaboratorSchedule';
import { ScheduleManagerService, defineTimeLabels } from 'src/app/services/schedule-manager.service';

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

  constructor(private _scheduleManager: ScheduleManagerService) {
  }

  ngOnInit(): void {
    this.officeHours = Array.from(this._scheduleManager.getTimeLabels())
  }
  /**
   * Add a busy time to the collaborator in an specified time
   * if it is busy, then it turns into an available time.
   * @param collaborator collaborator schedule info
   * @param time time label that we are looking for
   */
  addBusyTime(collaborator: CollaboratorSchedule, time: string):void {
    
    //If the time interval is a lunch time interval, it can't be converted into a busy time.
    if(this._scheduleManager.itIsALunchTimeInterval(time)){
      return;
    } 
    let containsThisTimes = false;
    let index = 0;
    for (index = 0; index < (collaborator.busyTimes as string[]).length; index++) {
      containsThisTimes = (collaborator.busyTimes as string[])[index] == time ? true : false;
      if (containsThisTimes) {
        break;
      }
    }
    if (containsThisTimes) {
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
    if(this._scheduleManager.itIsALunchTimeInterval(time)){
      return '#b0c218'
    }
    return (collaborator.busyTimes as string[]).includes(time) ? '#C2185B' : 'white';
  }

  
}
