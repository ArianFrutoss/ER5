import globals from "./globals.js";
import { BorderId, CardId, ImageTypes } from "./constants.js"

export default class Asset {

    constructor(){
        this.images = []
        this.assetsToLoad = []
        this.assetsLoaded = 0
        this.isLoaded = false
    }

    static create(){
        return new Asset()
    }

    loadImages(data) {

        this.loadCardImages(data);
        this.loadCardBorders();
        this.loadCardIcons();
        this.loadCardRarity();
        this.loadEquipmentRarity();
        this.loadGameRarity();
        this.loadCardType();
        this.loadBackground();

    }

    loadBackground() {

        let images = []
        let image

        // Crear Board
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/board.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Event Deck Full
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/event_deck_full.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Event Deck Half
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/event_deck_half.png";
        images.push(image);
        this.assetsToLoad.push(image);
        
        // Crear Event Deck Empty
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/event_deck_empty.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Minion Deck Full
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/minion_deck_full.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Minion Deck Half
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/minion_deck_half.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Minion Deck Empty
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/minion_deck_empty.png";
        images.push(image);
        this.assetsToLoad.push(image);

        // Crear Gema
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/background/gem.png";
        images.push(image);
        this.assetsToLoad.push(image);

        this.images.push(images)
        
    }

    loadCardImages(data) {
        let normalSize = []
        let smallSize  = []
        let images = []
        let image


        for (let i = 0; i < data.length; i++) {
        const img = data[i].image;
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = `../media/images/cards_img/${img}`;
        normalSize.push(image);
        this.assetsToLoad.push(image);

        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = `../media/images/cards_img/mini_${img}`;
        smallSize.push(image);
        this.assetsToLoad.push(image);
    
    }


        images.push(normalSize) 
        images.push(smallSize) 
        this.images.push(images) 
       
    }

    loadCardBorders() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/others/border_card.png";
        images.push(image);
        this.assetsToLoad.push(image);

        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/others/border_board_card.png";
        images.push(image);
        this.assetsToLoad.push(image);
        this.images.push(images) 

        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/others/reverse_card.png";
        images.push(image);
        this.assetsToLoad.push(image);
    }

    loadCardIcons() {
        let images = []
        let image

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/damage.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/defense.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/hp.png";
        images.push(image);
        this.assetsToLoad.push(image);


        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/speed.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/weapon2.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/durability.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/cooldown.png";
        images.push(image);
        this.assetsToLoad.push(image);



        this.images.push(images)
        
    }

    loadCardRarity() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/common_card.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/rare_card.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/epic_card.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/legendary_card.png";
        images.push(image);
        this.assetsToLoad.push(image);

        this.images.push(images)
        
    }

    loadEquipmentRarity() {
        let images = []
        let image



        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/common_equip.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/rare_equip.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/epic_equip.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/legendary_equip.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/void_equip.png";
        images.push(image);
        this.assetsToLoad.push(image);

        this.images.push(images)
        

    }

    loadGameRarity() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/common_rarity.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/rare_rarity.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/epic_rarity.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/legendary_rarity.png";
        images.push(image);
        this.assetsToLoad.push(image);

        this.images.push(images)
        
    }

    loadCardType() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/minion.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/curse.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/buff.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/hero.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/joseph.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/armor.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/weapon.png";
        images.push(image);
        this.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler.bind(this), false);
        image.src = "../media/images/icons/spell.png";
        images.push(image);
        this.assetsToLoad.push(image);


        this.images.push(images)
        
    }

    loadHandler() {

        this.assetsLoaded++; //Adds 1 to the counter

        //Once all Elements are loaded
        if (this.assetsLoaded === this.assetsToLoad.length) {

            //Removes Load Event Listener
            for (let i = 0; i < this.images.length; i++) {
                for (let j = 0; j < this.images[i].length; j++) {
                    const image = this.images[i][j];
                    
                    if (i===0) {
                        for (let k = 0; k < image.length; k++) {
                            const img = image[k]
                            img.removeEventListener("load", this.loadHandler.bind(this), false)
                        }
                    }else{
                        
                        image.removeEventListener("load", this.loadHandler.bind(this), false)
                    }
                    
                }
                

            }

            // for (let i = 0; i < globals.sounds.length; i++) {
            //     globals.sounds[i].removeEventListener("canplaythrough", loadHandler, false)

            // }

            this.isLoaded = true;
            console.log("Assets loaded")

        }
    }

}