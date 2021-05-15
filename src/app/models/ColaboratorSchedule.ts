export class CollaboratorSchedule{
    //Name of the collaborator.
    collabName: string;
    //Times in what collaborator is busy.
    busyTimes: string[];

    /**
     * Initialices the Collaborator Info
     * @param collabName 
     * @param busyTimes 
     */
    constructor(collabName:string, busyTimes:string[]){
        this.collabName = collabName;
        this.busyTimes = busyTimes;
    }
    
}