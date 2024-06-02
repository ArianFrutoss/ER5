import { ButtonState, ButttonsId, GameState, ScreenSize, renderState } from "./constants.js";

export default class Menu{
    
    constructor (xPos, yPos, xSize, ySize, image){

        this.xPos   = xPos;
        this.yPos   = yPos;
        this.xSize  = xSize;
        this.ySize  = ySize;
        this.image  = image;
    }

    update(buttonContainer){

        const menuButton = buttonContainer.container[ButttonsId.BTN_RETURN_TO_MENU];
        const returnToGameButton = buttonContainer.container[ButttonsId.BTN_RETURN_TO_GAME];
        const returnToLobbyButton = buttonContainer.container[ButttonsId.BTN_RETURN_TO_LOBBY];

        const result = [];

        result[0] = renderState.GAME;
        result[1] = GameState.PLAYING;

        if (menuButton.state === ButtonState.SELECTED){
            
            result[0] = renderState.MENU;
            result[1] = GameState.MENU;

            if (returnToGameButton.state === ButtonState.SELECTED){

                menuButton.state = ButtonState.NOT_SELECTED;
                returnToGameButton.state = ButtonState.NOT_SELECTED;
            }
    
            else if (returnToLobbyButton.state === ButtonState.SELECTED){
    
                menuButton.state = ButtonState.NOT_SELECTED;
                returnToLobbyButton.state = ButtonState.NOT_SELECTED;
                result[1] = GameState.SEND_DATA;
            }
        }

        return result;
    }

    render(ctx, button){

        if (button.state === ButtonState.SELECTED){
            
            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos - 7.5, this.yPos - 7.5, this.xSize + 15, this.ySize + 15);
            ctx.fillStyle = "#d59d00";
            ctx.fillRect(this.xPos - 5, this.yPos - 5, this.xSize + 10, this.ySize + 10);
            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos - 2.5, this.yPos - 2.5, this.xSize + 5, this.ySize + 5);
            ctx.fillStyle = "#362315";
            ctx.fillRect(this.xPos, this.yPos, this.xSize, this.ySize);
            ctx.fillStyle = "rgb(242, 211, 6)";
            ctx.font = "bold 25px LongaIberica-DEMO";
            ctx.fillText("Do you want to return", this.xPos + 200, this.yPos + 30)
            ctx.fillText("to main menu?", this.xPos + 200, this.yPos + 55)
        }
    }
}