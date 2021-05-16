import { Component, OnInit } from '@angular/core';
import { CollaboratorSchedule } from 'src/app/models/CollaboratorSchedule';
import { HALF_AN_HOUR, ScheduleManagerService } from 'src/app/services/schedule-manager.service';

@Component({
  selector: 'app-daily-planner',
  templateUrl: './daily-planner.component.html',
  styleUrls: ['./daily-planner.component.css']
})
export class DailyPlannerComponent implements OnInit {
  officeHours:string[] = [] as string[];

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

  constructor(private _scheduleManager:ScheduleManagerService) {
    this._scheduleManager = new ScheduleManagerService();
    this._scheduleManager.configureTimeLabels(8, 17, HALF_AN_HOUR);
  }

  ngOnInit(): void {
    this.officeHours = this._scheduleManager.getTimeLabels();
  }

  collaboratorIsBusyAtThisTime(collaborator:CollaboratorSchedule, time:string){
    return (collaborator.busyTimes as string[]).includes(time)? '#C2185B': 'white';
  }
  
}
