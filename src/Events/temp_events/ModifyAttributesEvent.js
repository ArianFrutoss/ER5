import Event from "../Event.js";

export class modifyAttributeEvent extends Event{

    constructor(objetive, attribute, value){
        super()
        this.objetive   = objetive;
        this.attribute  = attribute;
        this.value      = value;
    }

    execute(){
        switch (this.attribute){
            case "Attack":
                this.objetive.attack -= this.value;
                break;
            case "Defense":
                this.objetive.defense -= this.value;
                break;
            case "Health":
                this.objetive.health -= this.value;
                break;
            case "Speed":
                this.objetive.speed -= this.value;
                break;
            default:
                break;
        }
        return true;
    }
}