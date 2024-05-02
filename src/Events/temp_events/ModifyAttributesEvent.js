import { CardActions, CardId } from "../../constants.js";
import Event from "../Event.js";

export class ModifyAttributeEvent extends Event{

    constructor(objetive, attribute, value, modifier, card){
        super()
        this.objetive   = objetive;
        this.attribute  = attribute;
        this.value      = value;
        this.modifier   = modifier;
        this.card       = card;
    }

    execute(){

        if(this.card != undefined && this.objetive.state != CardId.DEAD){

            this.card.action = CardActions.ON_USE;

            if (this.card.durability <= 0 && this.card.durability != null){

                return true;
            }

            switch (this.attribute){
                case "Attack":
                    if (this.value === 0){

                        this.value = this.objetive.attack;
                    }
                    this.objetive.attack = this.modifyTheStat(this.objetive.attack, this.value);
                    if (this.objetive.attack < 0){

                        this.objetive.attack = 0;
                    }
                    break;
                case "Defense":
                    if (this.value === 0){
                        
                        this.value = this.objetive.defense;
                    }
                    this.objetive.defense = this.modifyTheStat(this.objetive.defense, this.value);
                    break;
                case "Health":
                    if (this.value === 0){
                        
                        this.value = this.objetive.health;
                    }
                    this.objetive.health = this.modifyTheStat(this.objetive.health, this.value);
                    if (this.objetive.health < 1){

                        this.objetive.health = 1;
                    }
                    break;
                case "Speed":
                    if (this.value === 0){
                        
                        this.value = this.objetive.speed;
                    }
                    this.objetive.speed = this.modifyTheStat(this.objetive.speed, this.value);
                    if (this.objetive.speed < 0){

                        this.objetive.speed = 0;
                    }
                    break;
                default:
                    break;
            }

            return false;
        }

        else{

            this.card.action = CardActions.WORN_OUT;
            return true;
        }
    }

    modifyTheStat(stat, value){
        
        let result = value;

        switch (this.modifier){

            case "+":
                result = stat + value;
                return result;
            case "-":
                result = stat - value;
                return result;
            case "*":
                result = Math.ceil(stat * value);
                return result;
            case "/":
                result = Math.ceil(stat / value);
                return result;
            default:
                break;
        }
    }

    executeAllCardsFromDeck(deck){
        for (let i = 0; i < deck.cards.length; i++) {
            const card = deck.cards[i];
            
        }
    }
}