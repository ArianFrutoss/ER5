import Event from "../Event.js";

export class ModifyAttributeEvent extends Event{

    constructor(objetive, attribute, value, card){
        super()
        this.objetive   = objetive;
        this.attribute  = attribute;
        this.value      = value;
        this.card       = card;
    }

    execute(){
        
        if (this.card != undefined){

            this.card.durability -= 0.5;

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

            if (this.card.durability === 0){

                return true;
            }

            else{

                return false;
            }
        }
    }

    executeAllCardsFromDeck(deck){
        for (let i = 0; i < deck.cards.length; i++) {
            const card = deck.cards[i];
            
        }
    }
}