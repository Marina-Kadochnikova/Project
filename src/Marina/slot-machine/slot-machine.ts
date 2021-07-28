import Button from "./Button";
import Reel from "./Reel";
import Win from "./Win";
import ChoiceGame from "_Main/СhoiceGame";
import Tween from "Eugene/SlotMachine/Tween";

export default class SlotMachine{
    public reel: Reel;
    public button: Button;
    public win: Win;
    public choiceGame: ChoiceGame;
    public backButton: PIXI.Sprite;

    constructor(choiceGame: ChoiceGame){
        this.choiceGame = choiceGame;
        this.reel = new Reel(this);
        this.win = new  Win(this);
        this.draw();
        this.createBackButton();
        this.button = new Button(this);
    }

    draw(){
        const background = PIXI.Sprite.from('assets/background.png');
        window.app.stage.addChild(background);

        const graphic = new PIXI.Graphics();
        graphic.lineStyle(4, 0xFF00FF, 1);
        graphic.beginFill(0x650A5A, 0.25);
        graphic.drawRoundedRect(490, 290, 520, 320, 16);
        graphic.endFill();
        window.app.stage.addChild(graphic);
    }

    createBackButton(){
        let texture = PIXI.Texture.from('src/_Main/Image/back.png');
        this.backButton = new PIXI.Sprite(texture);
        this.backButton.width = window.app.screen.width/8; 
        this.backButton.height = window.app.screen.height/5; 
        this.backButton.x = window.app.screen.width - this.backButton.width - 20;
        this.backButton.y = 20;
        this.backButton.buttonMode = true;
        this.backButton.interactive = true;
        this.backButton.on("pointerdown", this.goBack.bind(this));
        window.app.stage.addChild(this.backButton);
    }

    goBack(){
        PIXI.utils.clearTextureCache();
        this.reel.tweens.forEach((tw) => tw.destroy());
        this.reel.tweens = [];
        window.app.loader.destroy();
        window.app.stage.removeChildren();
        this.choiceGame.Create(1);
    }
}