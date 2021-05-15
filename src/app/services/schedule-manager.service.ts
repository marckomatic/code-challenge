/**
 * This service contains all the challenge logic, it's injected on main view component,
 * that is app-component.
 */
import { Injectable } from '@angular/core';

/*These const contains the possible values for 
  * config the individual interval time to use in the schedule.
  */
export const HALF_AN_HOUR = 1;
export const HOUR = 2;

@Injectable({
  providedIn: 'root'
})
export class ScheduleManagerService {
  /**
   * The config attribute contains a field for the time labels,
   * for considering the time invervals of the schedule.
   */
  private config = {
    scheduleTimeLabels: [""]
  }

  constructor() { 
    this.configureTimeLabels(HALF_AN_HOUR, 8, 17);
  }

  /**
   * The main method of the challange, it returns an array of the times in that more than 3 collaborators
   * are free, in JSON format. Each element of this 
   * array contains the time ("8:00 AM", "8:30 AM", etc) and the collaborators that are free
   * at this time. 
   * 
   * I know that the challenge said that I just have to return the times, but I think is more useful if 
   * it returns the collabs that are free in this time too.
   * 
   * @param collaboratorsSchedule an array of type any, each element contains the 
   * collaborator and the busy times in the above format: 
   * {
   *    'collabName': string, 
   *    'busyTimes': string[]
   * }
   * @returns an array with the times in that more than three collaborators are free in JSON format.
   */
  public getFreeCollaboratorsSchedule(collaboratorsSchedule:any[]):string{
    //coverting the collaborators busyTimes array into a map to reduce search times
    for(let collaborator of collaboratorsSchedule){
      collaborator.busyTimesMap = collaborator.busyTimes.reduce((map:Map<string, boolean>, value:string)=>{
        map.set(value, true); 
      })
    }

    /** 
     * Filling the array of times with the available time labels in this schedule, at the start,
     * each time interval does't have any collaborator free.
     */
    let scheduleTimesWithFreeCollaborators:any[] = [];

    this.config.scheduleTimeLabels.forEach(
      (timeLabel)=>{
        //Creating an object to store the free collaborator in this time label.
        let timeIntervalWithCollaborators = {
          time: timeLabel, 
          freeColaborators: new Array()
        };
        //Pushing collaborators that are free in this time interval.
        for(let collaborator of collaboratorsSchedule){
          let collaboratorIsFree = !collaborator.busyTimesMap.has(timeLabel);

          if(collaboratorIsFree){
            timeIntervalWithCollaborators.freeColaborators.push(collaborator.collabName);
          }
        }

        let haveAtLeastThreeFreeCollaborators = timeIntervalWithCollaborators.freeColaborators.length > 2;
        
        if(haveAtLeastThreeFreeCollaborators){
          scheduleTimesWithFreeCollaborators.push(timeIntervalWithCollaborators);
        }
      }
    );
    
    return JSON.stringify(collaboratorsSchedule);
  }

  /**
   * Configure the time labels to use for the invervals in the schedule. Returns true if succesfull, false otherwise.
   * @param startHourTime Sets starting hour time of the time interval schedule. Possible Values: 0 - 23
   * @param endHour  Sets starting hour times of the interval schedule. Possible Values: 0 - 23.
   * @param intervalDuration Sets the individual interval duration of the school. Use values HALF_AN_HOUR
   * @returns 
   */
  public configureTimeLabels(startHourTime: number, endHourTime: number, intervalDuration: number): boolean {
    //Validating if start and end hours are correct.
    if (startHourTime > endHourTime) {
      return false;
    } else if (startHourTime < 0 && startHourTime > 23) {
      return false;
    } else if (endHourTime < 0 && startHourTime > 23) {
      return false;
    }

    //Adding time labels. 
    let timeLabels: string[] = [];
    for (let i = startHourTime; i < endHourTime; i++) {

      let tag = i < 13? 'AM': 'PM';
      if (intervalDuration == HALF_AN_HOUR) {
        timeLabels.push((i%13) + ":00 " + tag);
        timeLabels.push((i%13) + ":30 " + " " + tag)
      } else if (intervalDuration == HOUR) {
        timeLabels.push((i%13) + ":00 " + tag);
      } else {
        return false;
      }
    }
    this.config.scheduleTimeLabels = timeLabels;
    return true;
  }

  /**
   * Get the time labels of the schedule.
   * @returns the time labels configurated for the schedule.
   */
  public getTimeLabels():string[]{
    return this.config.scheduleTimeLabels;
  }

}
