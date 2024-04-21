import { IconsPos } from "./constants.js";
import Line from "./Line.js";

export default class Text{

    constructor(text, type, size, lineSpace, maxHeigth, maxWidth){

        this.text               = text;
        this.type               = type;
        this.size               = size;
        this.lineSpace          = lineSpace;
        this.maxHeigth          = maxHeigth;
        this.maxWidth           = maxWidth;
    }

    render(ctx, xPos, yPos, language){
        
        switch(this.type){

            case IconsPos.NAME:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const names = this.initText(language);
                
                for (let i = 0; i < names.length; i++){
                    
                    const name = names[i];

                    ctx.fillText(name.text, xPos + IconsPos.NAME_X, yPos + IconsPos.NAME_Y);
                }
                break;
            
            case IconsPos.DESCRIPTION:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const lines = this.initText(language);

                for (let i = 0; i < lines.length; i++){
                    
                    const line = lines[i];

                    ctx.fillText(line.text, xPos + IconsPos.DESCRIPTION_X, yPos + line.yPos + IconsPos.DESCRIPTION_Y);
                }
                break;
        }
    }

    initText(language){

        const words = this.text[language].split(" ");
        const lines = [];
        const returnLines = [];
        let line = "";

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            const lettersQuantity = this.calculateLettersQuantity(words);
            const width = lettersQuantity * this.size;
            const heigth = this.calculateHeigth(lines);
            
            if (this.maxHeigth === null && width > this.maxWidth){
                
                this.size -= 0.5;
            }

            else if (heigth > this.maxHeigth){
                
                this.size -= 0.5;
                this.lineSpace -= 1;
            }

            if ((line + word).length * this.size < this.maxWidth){
                
                line += (word + " ");

                if ((i + 1) === words.length){
                    
                    lines.push(line);
                    break;
                }
            }

            else{
                
                lines.push(line);
                line = "";
                line += word + " ";
            }
        }
        
        for (let i = 0; i < lines.length; i++){

            const lineText  = lines[i];
            const xPos      = 60;
            const modifier  = this.size * lines.length;
            const yPos      = 120 - modifier + this.lineSpace * i;
            const line      = new Line(xPos, yPos, lineText);
            
            returnLines.push(line);
        }

        return returnLines;
    }

    calculateLettersQuantity(words){

        let maxLettersQuantity = 0;

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            
            maxLettersQuantity += (" " + word).length;
        }

        return maxLettersQuantity;
    }

    calculateHeigth(lines){

        return lines.length * this.lineSpace;
    }
}