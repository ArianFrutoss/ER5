import Card             from "./Card.js";
import Armor            from "./cards_type/Armor.js";
import Buff             from "./cards_type/Buff.js";
import Joseph           from "./cards_type/Joseph.js";
import MainCharacter    from "./cards_type/MainCharacter.js";
import Minion           from "./cards_type/Minion.js";
import Spell            from "./cards_type/Spell.js";
import Weapon           from "./cards_type/Spell.js";
import {Card_State}       from "../constants.js";
import globals from "../globals.js";

export default class CardFactory{

    constructor(cardData){
        this.cardData   = cardData;
    }


    createCards(){

        for(let i = 0; i < this.cardData.length; i++){
            
            const id            = this.cardData[i].id;
            const name          = this.cardData[i].name;
            const description   = this.cardData[i].description;
            const image         = this.cardData[i].image;
            const rarity        = this.cardData[i].rarity;
            const type          = this.cardData[i].type;
            const isBig         = false;
            const isSelected    = false;
            const xPos          = 100;
            const yPos          = 100;
            const state         = Card_State.NOT_SELECTED;
            const objective     = "objective";
            const attributes    = this.cardData[i].attributes;
            const effects       = this.cardData[i].effects;
            let card;

            switch(type){
                case "Minion":

                       card = this.createMinion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                       break;

                default:

                    break;
            }

            return card;
        }

     
    }

    createMinion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        let equipedWeapon = "equipedArmor";
        let equipedArmor  = "equipedWeapon";

        let attack  = attributes.attack;
        let defense = attributes.defense;
        let hp      = attributes.hp;
        let speed   = attributes.speed;
        

        const minion = new Minion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, hp, speed, equipedWeapon, equipedArmor);
        
        globals.cards.push(minion);

    }


    

 


}