import Armor from "./cards_category/Armor.js";
import Buff from "./cards_category/Buff.js";
import Curse from "./cards_category/Curse.js";
import Joseph from "./cards_category/Joseph.js";
import MainCharacter from "./cards_category/MainCharacter.js";
import Minion from "./cards_category/Minion.js";
import Spell from "./cards_category/Spell.js";
import Weapon from "./cards_category/Spell.js";
import { IconsId, TypeId } from "../constants.js";


export default class CardFactory {

    constructor(cardData) {
        this.cardData = cardData;
        this.cards = []
    }


    createCards() {
        let card

        for (let i = 0; i < this.cardData.length; i++) {
            const id = this.cardData[i].card_id;
            const name = [this.cardData[i].name, this.cardData[i].izena];
            const description = [this.cardData[i].description, this.cardData[i].deskripzioa];
            const image = this.cardData[i].image;
            const rarity = this.setRarity(this.cardData[i].rarity)
            const category = this.cardData[i].category
            const quantity = this.cardData[i].quantity
            // HAY QUE AÑADIR EL TYPE AL CONSTRUCTOR DE  LAS CARTAS
            const type = this.cardData[i].type;
        
            const xPos = 100;
            const yPos = 100;
            const objective = "objective";
            const attributes = this.cardData[i].attributes;
            const effects = this.cardData[i].common_effect;

            switch (category) {
                case "Armor_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createArmor(id, name, description, image, rarity, TypeId.ARMOR, type, xPos, yPos, objective, attributes);
                        this.cards.push(card)
                        
                    }
                    break;

                case "Buff_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createBuff(id, name, description, image, rarity, TypeId.BUFF, type, xPos, yPos, objective, attributes);
                        this.cards.push(card)                        
                    }
                    break;

                case "Curse_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createBuff(id, name, description, image, rarity, TypeId.CURSE, type, xPos, yPos, objective, attributes);
                        this.cards.push(card)    
                    }
                    break;

                case "Joseph_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createJoseph(id, name, description, image, rarity, TypeId.JOSEPH, type, xPos, yPos, objective, effects)
                        this.cards.push(card)
                        
                    }
                    break;

                case "Hero_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createMainCharacter(id, name, description, image, rarity, TypeId.HERO, type, xPos, yPos, objective, effects)
                        this.cards.push(card)                       
                    }
                    break;

                case "Minion_card":
                    for (let i = 0; i < quantity; i++) {
                        
                        card = this.createMinion(id, name, description, image, rarity, TypeId.MINION, xPos, yPos, attributes);
                        this.cards.push(card)                        
                    }
                    break;

                case "Spell_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createSpell(id, name, description, image, rarity, TypeId.SPELL, type, xPos, yPos, objective, attributes);
                        this.cards.push(card)                       
                    }
                    break;

                case "Weapon_card":
                    for (let i = 0; i < quantity; i++) {
                        card = this.createWeapon(id, name, description, image, rarity, TypeId.WEAPON, type, xPos, yPos, objective, attributes)
                        this.cards.push(card)                        
                    }
                    break;

                default:
                    for (let i = 0; i < quantity; i++) {
                        card = this.createBuff(id, name, description, image, rarity, TypeId.BUFF, type, xPos, yPos, objective, attributes);
                        this.cards.push(card)                        
                    }
                    break;
            }



        }


    }

    setRarity(rarity) {
        switch (rarity) {
            case 'Common':
                return 0
                break;
            case 'Rare':
                return 1
                break;
            case 'Epic':
                return 2
                break;
            case 'Legendary':
                return 3
                break;

            default:
                return -1
                break;
        }
    }
    createMinion(id, name, description, image, rarity, type, xPos, yPos, attributes) {
        console.log(xPos, yPos);
        let equipedWeapon = [0];
        let equipedArmor = [0];

        let attack
        let defense
        let hp
        let speed

        for (let i = 0; i < attributes.length; i++)
         {
            const attribute = attributes[i];
            switch (attribute.attribute_id-1) {
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



        const minion = new Minion(id, name, description, image, rarity, type, xPos, yPos, attack, defense, hp, speed, equipedWeapon, equipedArmor);

        return minion

    }


    createArmor(id, name, description, image, rarity, type, xPos, yPos, objective, attributes) {

        let attack = attributes.attack;
        let defense = attributes.defense;
        let health = attributes.hp;
        let speed = attributes.speed;
        let durability = attributes.durability;
        let cooldown = attributes.cooldown;


        const armor = new Armor(id, name, description, image, rarity, type, xPos, yPos, objective, health, attack, defense, speed, durability, cooldown);
        return armor

    }

    createBuff(id, name, description, image, rarity, type, xPos, yPos, objective, attributes) {
        let attack
        let defense
        let health
        let speed
        let durability
        let cooldown
        if (attributes != null) {
            attack = attributes.attack;
            defense = attributes.defense;
            health = attributes.hp;
            speed = attributes.speed;
            durability = attributes.durability;
            cooldown = attributes.cooldown;

        }

        const buff = new Buff(id, name, description, image, rarity, type, xPos, yPos, objective, attack, defense, speed, health, durability, cooldown)
        return buff

    }

    createCurse(id, name, description, image, rarity, type, xPos, yPos, objective, attributes, effects) {
        let attack = effects.attack;
        let defense = effects.defense;
        let speed = effects.speed;
        let durability = attributes.durability;
        let cooldown = attributes.cooldown;

        const curse = new Curse(id, name, description, image, rarity, type, xPos, yPos, objective, attack, defense, speed, durability, cooldown);
        return curse


    }

    createJoseph(id, name, description, image, rarity, type, xPos, yPos, objective, effects) {
        let armorEffect = effects.Armor;

        const joseph = new Joseph(id, name, description, image, rarity, type, xPos, yPos, objective, armorEffect)
        return joseph

    }

    createMainCharacter(id, name, description, image, rarity, type, xPos, yPos, objective, effects) {
        let attack = effects.attack;
        let defense = effects.defense;
        let speed = effects.speed;
        let durability = effects.durability;
        let cooldown = effects.cooldown;

        const mainCharacter = new MainCharacter(id, name, description, image, rarity, type, xPos, yPos, objective, durability, cooldown);
        return mainCharacter

    }

    createSpell(id, name, description, image, rarity, type, xPos, yPos, objective, attributes) {
        let attack
        let defense
        let health
        let speed
        let durability
        let cooldown
        if (attributes != null) {
            attack = attributes.attack;
            defense = attributes.defense;
            health = attributes.hp;
            speed = attributes.speed;
            durability = attributes.durability;
            cooldown = attributes.cooldown;

        }

        const spell = new Spell(id, name, description, image, rarity, type, xPos, yPos, objective, durability, cooldown);
        return spell

    }

    createWeapon(id, name, description, image, rarity, type, xPos, yPos, objective, attributes) {
        let range = attributes.range;
        let attack = attributes.attack;
        let defense = attributes.defense;
        let speed = attributes.speed;
        let durability = attributes.durability;
        let cooldown = attributes.cooldown;
        let weaponType = attributes.weaponType;
        const weapon = new Weapon(id, name, description, image, rarity, type, xPos, yPos, objective, weaponType, range, attack, defense, speed, durability, cooldown);
        return weapon


    }





}