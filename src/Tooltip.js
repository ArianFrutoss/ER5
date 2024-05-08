import { TypeNames } from "./constants.js";

export default class Tooltip {

    constructor(category, texts){
        this.category   = category;
        this.texts      = texts;
    }

    render(xPos, yPos, language, ctx){

        ctx.fillStyle = '#d59d00'
        ctx.fillRect(xPos, yPos, 178, 63 ) 

        ctx.fillStyle = '#362315'
        ctx.fillRect(xPos + 3, yPos + 3, 172, 57 ) 
        ctx.fillStyle = 'white'
        
        ctx.font ="15px LongaIberica-DEMO"
        ctx.fillText('Name: ', xPos+35, yPos+20)
        this.texts.texts[1].render(ctx, xPos-5, yPos-217, language) 

        ctx.fillText('Type:', xPos+36, yPos+40)
        ctx.fillText(TypeNames[this.category], xPos+115, yPos+40)
    }
}