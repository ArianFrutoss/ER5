import Armor            from "./cards_type/Armor.js";
import Buff             from "./cards_type/Buff.js";
import Curse            from "./cards_type/Curse.js";
import Joseph           from "./cards_type/Joseph.js";
import MainCharacter    from "./cards_type/MainCharacter.js";
import Minion           from "./cards_type/Minion.js";
import Spell            from "./cards_type/Spell.js";
import Weapon           from "./cards_type/Spell.js";
import {CardId}       from "../constants.js";
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
            const state         = CardId.NOT_SELECTED;
            const objective     = "objective";
            const attributes    = this.cardData[i].attributes;
            const effects       = this.cardData[i].effects;
            let card;

            switch(type){
                case "Armor":
                    this.createArmor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                    break;
                
                case "Buff":
                    this.createBuff(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                    break;

                case "Curse":
                    this.createBuff(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                    break;

                case "Joseph":
                    this.createJoseph(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, effects)
                    break;
                
                case "MainCharacter":
                    this.createMainCharacter(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, effects)
                    break;
        
                case "Minion":
                    this.createMinion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                    break;

                case "Spell":

                    this.createSpell(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes);
                    break;
                
                case "Weapon":
                    this.createWeapon(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes)
                    break;
                
                default:

                    break;
            }

        }

     
    }

    createMinion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        let equipedWeapon = [0];
        let equipedArmor  = [0];
        let attack  = attributes.attack;
        let defense = attributes.defense;
        let hp      = attributes.hp;
        let speed   = attributes.speed;
        

        const minion = new Minion(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, hp, speed, equipedWeapon, equipedArmor);
        
        globals.cards.push(minion);
    }


    createArmor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let health      = attributes.hp;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;
        

        const armor = new Armor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, health, attack, defense, speed, durability, cooldown);
        
        globals.cards.push(armor);
    }

    createBuff(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let health      = attributes.hp;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const buff  = new Buff(id ,name, description ,image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, speed, health, durability, cooldown)

        globals.cards.push(buff);
    }

    createCurse(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes, effects){
        let attack      = effects.attack;
        let defense     = effects.defense;
        let speed       = effects.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const curse     = new Curse(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, speed, durability, cooldown);

        globals.cards.push(curse);

    }

    createJoseph(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, effects){
        let armorEffect = effects.Armor;

        const joseph    = new Joseph(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, armorEffect)

        globals.cards.push(joseph);
    }

    createMainCharacter(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, effects){
        let attack      = effects.attack;
        let defense     = effects.defense;
        let speed       = effects.speed;
        let durability  = effects.durability;
        let cooldown    = effects.cooldown;

        const mainCharacter     = new MainCharacter(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, speed, health, durability, cooldown);

        globals.cards.push(mainCharacter);
    }

    createSpell(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const spell     = new Spell(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, durability, cooldown);

        globals.cards.push(spell);
    }

    createWeapon(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attributes){
        let range       = attributes.range;
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;
        let weaponType  = attributes.weaponType;

        const weapon    = new Weapon(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, weaponType, range, attack, defense, speed, durability, cooldown);

        globals.cards.push(weapon);
    }
    

 


}