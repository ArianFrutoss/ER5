import { GameState, Sound } from "./constants.js"
import globals from "./globals.js"

export default class SoundManager{

    constructor(){
        this.sounds = [],
        this.currentSound = Sound.NO_SOUND

        this.gameState
        this.assetsToLoad = []
        this.assetsLoaded = 0
        this.isLoaded = false
    }




    static create(){
        return new SoundManager()
    }  

    loadSounds(){
        this.initSound('gameMusic', true)
    }

    initSound(soundName, isSong = false) {
        let sound = document.querySelector(`#${soundName}`)
        sound.addEventListener("canplaythrough", this.loadHandler.bind(this), false)
        if (isSong) 
            gameMusic.addEventListener("timeupdate", this.updateMusic.bind(this), false)
        sound.load()
        this.sounds.push(sound)
        this.assetsToLoad.push(sound)
    }
    loadHandler() {
        console.log(this.assetsToLoad);
        this.assetsLoaded++; //Adds 1 to the counter

        //Once all Elements are loaded
        if (this.assetsLoaded === this.assetsToLoad.length) {

            //Removes Load Event Listener
            for (let i = 0; i < this.sounds.length; i++) {
                this.sounds[i].removeEventListener("canplaythrough", this.loadHandler.bind(this), false)
            }

            this.isLoaded = true;
            console.log("Sounds loaded");
        }
    }
    updateMusic() {
        const buffer = 0.01
        const music  = this.sounds[this.gameMusic()]

        if (music.currentTime > music.duration - buffer) {
            music.currentTime = 0
            music.play()
        }
    }
    gameMusic() {
        const state = this.gameState
    
        switch (state) {
            case GameState.PLAYING:
                return Sound.GAME_MUSIC
        
            default:
                break;
        }
    }

    playSound() {
        if (this.currentSound != Sound.NO_SOUND) {
            this.sounds[this.currentSound].currentTime = 0
            this.sounds[this.currentSound].play()
            this.currentSound = Sound.NO_SOUND
        }
    }
}

