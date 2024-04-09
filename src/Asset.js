import { Images } from "./ImageNames.js";

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

    loadBackground(){

        let images = [];
        let image;

        const backgroundImages = Images.backgroundImages;
        
        for (let i = 0; i < backgroundImages.length; i++){

            // Crear Board
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/background/" + backgroundImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadCardImages(data) {
        
        let normalSize = [];
        let smallSize  = [];
        let images = [];
        let image;

        for (let i = 0; i < data.length; i++){

            const img = data[i].image;

            //Crear Imagenes de las Cartas
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

        images.push(normalSize); 
        images.push(smallSize);
        this.images.push(images);
    }

    loadCardBorders(){

        let images = [];
        let image;

        const cardBordersImages = Images.cardBordersImages;
        
        for (let i = 0; i < cardBordersImages.length; i++){

            // Crear Bordes de las Cartas
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/others/" + cardBordersImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images)
    }

    loadCardIcons(){

        let images = [];
        let image;

        const cardIconsImages = Images.cardIconsImages;
        
        for (let i = 0; i < cardIconsImages.length; i++){

            // Crear los Iconos de las Cartas
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/icons/" + cardIconsImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadCardRarity(){

        let images = [];
        let image;
        
        const cardRarityImages = Images.cardRarityImages;
        
        for (let i = 0; i < cardRarityImages.length; i++){

            // Crear las Rarezas de las Cartas
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/icons/" + cardRarityImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadEquipmentRarity(){

        let images = [];
        let image;

        const equipmentRarityImages = Images.equipmentRarityImages;
        
        for (let i = 0; i < equipmentRarityImages.length; i++){

            // Crear las Rarezas de las Equipaciones
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/icons/" + equipmentRarityImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadGameRarity(){

        let images = [];
        let image;

        const gameRarityImages = Images.gameRarityImages;
        
        for (let i = 0; i < gameRarityImages.length; i++){

            // Crear las rarezas de la Partida
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/icons/" + gameRarityImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadCardType(){

        let images = [];
        let image;

        const cardTypeImages = Images.cardTypeImages;
        
        for (let i = 0; i < cardTypeImages.length; i++){

            // Crear los Tipos de Cartas
            image = new Image();
            image.addEventListener("load", this.loadHandler.bind(this), false);
            image.src = "../media/images/icons/" + cardTypeImages[i] + ".png";
            images.push(image);
            this.assetsToLoad.push(image);
        }

        this.images.push(images);
    }

    loadHandler() {

        this.assetsLoaded++; //Adds 1 to the counter

        //Once all Elements are loaded
        if (this.assetsLoaded === this.assetsToLoad.length) {

            //Removes Load Event Listener
            for (let i = 0; i < this.images.length; i++){
                
                for (let j = 0; j < this.images[i].length; j++){

                    const image = this.images[i][j];
                    
                    if (i===0){

                        for (let k = 0; k < image.length; k++){

                            const img = image[k];
                            img.removeEventListener("load", this.loadHandler.bind(this), false);
                        }
                    }

                    else{
                        
                        image.removeEventListener("load", this.loadHandler.bind(this), false);
                    }
                }
            }

            this.isLoaded = true;
            console.log("Assets loaded");
        }
    }
}