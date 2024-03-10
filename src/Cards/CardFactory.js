import Armor            from "./cards_type/Armor.js";
import Buff             from "./cards_type/Buff.js";
import Curse            from "./cards_type/Curse.js";
import Joseph           from "./cards_type/Joseph.js";
import MainCharacter    from "./cards_type/MainCharacter.js";
import Minion           from "./cards_type/Minion.js";
import Spell            from "./cards_type/Spell.js";
import Weapon           from "./cards_type/Spell.js";
import globals from "../globals.js";
import { IconsId } from "../constants.js";


export default class CardFactory{

    constructor(cardData){
        this.cardData   = cardData;
        this.cards = []
    }


    createCards(){
        let card
        for(let i = 0; i < this.cardData.length; i++){
            
            const id            = this.cardData[i].card_id;
            const name          = [this.cardData[i].name,this.cardData[i].izena];
            const description   = [this.cardData[i].description,this.cardData[i].deskripzioa];
            const image         = this.cardData[i].image;
            const rarity        = this.cardData[i].rarity;
            const category      = this.cardData[i].category
            const type          = this.cardData[i].type;
            const quantity      = this.cardData[i].quantity;
            const xPos          = 100;
            const yPos          = 100;
            const objective     = "objective";
            const attributes    = this.cardData[i].attributes;
            const effects       = this.cardData[i].common_effect;

            switch(category){
                case "Armor_card":
                    card = this.createArmor(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, attributes);
                    break;
                
                case "Buff_card":
                    card = this.createBuff(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, attributes);
                    break;

                case "Curse_card":
                    card = this.createBuff(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, attributes);
                    break;

                case "Joseph_card":
                    card = this.createJoseph(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, effects)
                    break;
                
                case "MainCharacter_card":
                    card = this.createMainCharacter(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, effects)
                    break;
        
                case "Minion_card":
                    card = this.createMinion(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, attributes);
                    break;

                case "Spell_card":

                    card = this.createSpell(id, name, description, image, rarity, category,type,quantity, xPos, yPos, objective, attributes);
                    break;
                
                case "Weapon_card":
                    card = this.createWeapon(id, name, description, image, rarity, category,type,quantity,xPos, yPos, objective, attributes)
                    break;
                
                default:
                    break;
                }
                
            this.cards.push(card)
        }

        return this.cards

     
    }

    createMinion(id, name, description, image, rarity,type,quantity, xPos, yPos, objective, attributes){
        let equipedWeapon = [0];
        let equipedArmor  = [0];

        let attack  
        let defense 
        let hp      
        let speed   

        for (let i = 0; i < attributes.length; i++)
         {
            const attribute = attributes[i];

            console.log(attribute);
            
            switch (attribute.attribute_id) {
                case IconsId.DEFENSE:
                    defense = attribute.attribute_value
                    break;

                case IconsId.DAMAGE:
                    attack = attribute.attribute_value
                    break;

                case IconsId.LIFE:
                    hp = attribute.attribute_value
                    break;

                case IconsId.SPEED:
                    speed = attribute.attribute_value
                    break;

                default:
                    break;
            }
        }
        

        const minion = new Minion(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attack, defense, hp, speed, equipedWeapon, equipedArmor);
        
        return minion
        globals.cards.push(minion);
    }


    createArmor(id, name, description, image, rarity,type,quantity, xPos, yPos, objective, attributes){
        
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let health      = attributes.hp;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;
        

        const armor = new Armor(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, health, attack, defense, speed, durability, cooldown);
        return armor
        globals.cards.push(armor);
    }

    createBuff(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attributes){
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let health      = attributes.hp;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const buff  = new Buff(id ,name, description ,image, rarity, type,quantity, xPos, yPos, objective, attack, defense, speed, health, durability, cooldown)
        return buff
        globals.cards.push(buff);
    }

    createCurse(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attributes, effects){
        let attack      = effects.attack;
        let defense     = effects.defense;
        let speed       = effects.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const curse     = new Curse(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attack, defense, speed, durability, cooldown);
        return curse
        globals.cards.push(curse);

    }

    createJoseph(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, effects){
        let armorEffect = effects.Armor;

        const joseph    = new Joseph(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, armorEffect)
        return joseph
        globals.cards.push(joseph);
    }

    createMainCharacter(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, effects){
        let attack      = effects.attack;
        let defense     = effects.defense;
        let speed       = effects.speed;
        let durability  = effects.durability;
        let cooldown    = effects.cooldown;

        const mainCharacter     = new MainCharacter(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attack, defense, speed, health, durability, cooldown);
        return mainCharacter
        globals.cards.push(mainCharacter);
    }

    createSpell(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attributes){
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;

        const spell     = new Spell(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, durability, cooldown);
        return spell
        globals.cards.push(spell);
    }

    createWeapon(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, attributes){
        let range       = attributes.range;
        let attack      = attributes.attack;
        let defense     = attributes.defense;
        let speed       = attributes.speed;
        let durability  = attributes.durability;
        let cooldown    = attributes.cooldown;
        let weaponType  = attributes.weaponType;
        
        const weapon    = new Weapon(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, weaponType, range, attack, defense, speed, durability, cooldown);
        
        return weapon

        globals.cards.push(weapon);
    }
    

 


}