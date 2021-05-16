/**
 * This service contains all the challenge logic, it's injected on main view component,
 * that is app-component.
 */
import { Injectable } from '@angular/core';
import { CollaboratorSchedule } from '../models/CollaboratorSchedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleManagerService {
  /**
   * The config attribute contains a field for the time labels,
   * for considering the time invervals of the schedule.
   * 
   * Also contains the luchtime hour.
   */
  private config = {
    scheduleTimeLabels: (new Set<string>()),
    luchTimeLabels: new Set<string>()
  }

  constructor() {
    this.config.scheduleTimeLabels = defineTimeLabels(8, 17);
    this.config.luchTimeLabels = new Set<string>();
    this.config.luchTimeLabels.add("12:00 PM");
    this.config.luchTimeLabels.add("12:30 PM");
  }

  /**
   * The main method of the challange, it returns an array of the times in that more than 3 collaborators
   * are free, in JSON format. Each element of this 
   * array contains the time ("8:00 AM", "8:30 AM", etc) and the collaborators that are free
   * at this time. 
   * 
   * @param collaboratorsSchedule an array of type CollaboratorSchedule, each element contains the 
   * collaborator name and an array of his busy times. 
   * @returns an array  with the times in that more than three collaboratore are free and who those collaborators are
   *  are; in JSON string format.
   */
  public getFreeCollaboratorsSchedule(collaboratorsSchedule: CollaboratorSchedule[]): string {
    //coverting the collaborators busyTimes arrays into a set to reduce search times
    //The array can be converted in to a set because it's not possible to have two meets at the same time.
    for (let collaborator of collaboratorsSchedule) {
      collaborator.busyTimes = new Set(collaborator.busyTimes);
    }
    //This array will content the response of the method
    let scheduleTimesWithFreeCollaborators:any = [];

    /** 
     * Filling the array of times with the available time labels in this schedule, at the start,
     * each time interval does't have any collaborator free.
     */
    this.config.scheduleTimeLabels.forEach(
      (timeLabel:string) => {
        //Verifing if the time label is in luch time, if it is, it does't not add the time interval to the result.
        //Don't worry, it is a set access, its a constant time function ;)
        if(this.itIsALunchTimeInterval(timeLabel)){
          return; 
        }
        //Creating an object to store the free collaborators in this time label.
        let timeIntervalWithFreeCollaborators = {
          time: timeLabel,
          freeColaborators: new Array()
        };

        //Pushing collaborators that are free in this time interval.
        for (let collaborator of collaboratorsSchedule) {
          //This variable looks at the Set of the collaborator (the Set created a few lines above)
          //and if the time is not in this busyTimes set, the collaborator is free at this time
          let collaboratorIsFree = !(collaborator.busyTimes as Set<string>).has(timeLabel);
          if (collaboratorIsFree) {
            timeIntervalWithFreeCollaborators.freeColaborators.push(collaborator.name);
          }
        }
      
        let hasAtLeastThreeFreeCollaborators = timeIntervalWithFreeCollaborators.freeColaborators.length > 2;
        if (hasAtLeastThreeFreeCollaborators) {
          scheduleTimesWithFreeCollaborators.push(timeIntervalWithFreeCollaborators);
        }
      }
    );
    return JSON.stringify(collaboratorsSchedule);
  }

  /**
   * Evaluates if the given timeLabel belongs to a lunch time interval.
   * @param timeLabel 
   * @returns 
   */ 
  public itIsALunchTimeInterval(timeLabel:string){
    return this.config.luchTimeLabels.has(timeLabel);
  }

  /**
   * Get the time labels of the schedule.
   * @returns the time labels configurated for the schedule.
   */
  public getTimeLabels(): Set<string> {
    return this.config.scheduleTimeLabels;
  }
}

/**
 * Define the time labels to use for the invervals in the schedule. Returns an array of string if succesfull, empty array otherwise.
 * @param startHourTime Sets starting hour time of the time interval schedule. Possible Values: 0 - 23
 * @param endHour  Sets starting hour times of the interval schedule. Possible Values: 0 - 23.
 * @param intervalDuration Sets the individual interval duration of the school. Use values HALF_AN_HOUR
 * @returns 
 */
export function defineTimeLabels(startHourTime: number, endHourTime: number): Set<string> {
  //Validating if start and end hours are correct.
  if (startHourTime > endHourTime) {
    return new Set();
  } else if (startHourTime < 0 && startHourTime > 23) {
    return new Set();
  } else if (endHourTime < 0 && startHourTime > 23) {
    return new Set();
  }

  //Adding time labels. 
  let timeLabels: Set<string> = new Set();
  for (let i = startHourTime; i < endHourTime; i++) {
    let tag = i < 12 ? 'AM' : 'PM';
    //Restarting hour count if it is PM
    let stringHour = (i < 13 ? (i % 13) : (i % 13 + 1));
    timeLabels.add(stringHour + ":00 " + tag);
    timeLabels.add(stringHour + ":30 " + tag)
  }
  return timeLabels;
}
