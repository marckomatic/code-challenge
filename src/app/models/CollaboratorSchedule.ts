export class CollaboratorSchedule{
    name: string;
    busyTimes: string[] | Set<string>;

    /**
     * @param name of the collaborator
     * @param busyTimes of the collaborator, this field can be converted into a map to
     * optimize search times.
     */
    constructor(name: string, busyTimes: string[]){
        this.name = name;
        this.busyTimes = busyTimes;
    }
}