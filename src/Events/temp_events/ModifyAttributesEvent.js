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
        if(this.card != undefined){

            if (this.card.durability <= 0){

                return true;
            }

            switch (this.attribute){
                case "Attack":
                    if (this.value === 0){

                        this.value = this.objetive.attack;
                    }
                    this.objetive.attack -= this.value;
                    if (this.objetive.attack < 0){

                        this.objetive.attack = 0;
                    }
                    break;
                case "Defense":
                    if (this.value === 0){
                        
                        this.value = this.objetive.defense;
                    }
                    this.objetive.defense -= this.value;
                    break;
                case "Health":
                    if (this.value === 0){
                        
                        this.value = this.objetive.health;
                    }
                    this.objetive.health -= this.value;
                    break;
                case "Speed":
                    if (this.value === 0){
                        
                        this.value = this.objetive.speed;
                    }
                    this.objetive.speed -= this.value;
                    break;
                default:
                    break;
            }

            return false;
        }
    }

    executeAllCardsFromDeck(deck){
        for (let i = 0; i < deck.cards.length; i++) {
            const card = deck.cards[i];
            
        }
    }
}