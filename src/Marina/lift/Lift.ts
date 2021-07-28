import Cabin from "./Cabin";
import Controller from "./Controller";
import Button from "./Button";
import ChoiceGame from "_Main/СhoiceGame";


export default class Lift{
    public cabin: Cabin;
    public buttons: Button[];
    public controller: Controller;
    public floorsNumber = 5;
    public background: PIXI.Sprite;
    public backButton: PIXI.Sprite;
    public choiceGame: ChoiceGame;

    constructor(choiceGame: ChoiceGame){
        this.choiceGame = choiceGame;
        this.createBg();
        this.createBackButton();

        this.cabin = new Cabin(this);
        this.buttons = this.createButton();
        this.controller = new Controller(this);
    }

    createBg(){
        let t = PIXI.Texture.from('assets/lift_bgbg.png');
        let bg = new PIXI.Sprite(t);
        window.app.stage.addChild(bg);

        let liftShaft = new PIXI.Graphics();
        liftShaft.beginFill(0xa39c99);
        liftShaft.drawRect(410, 100, 80, 750);
        liftShaft.endFill();
        window.app.stage.addChild(liftShaft);
    }

    createButton(){
        let result: Button[] = [];
        for(let i = 1; i < this.floorsNumber + 1; i++){
            result.push(new Button(this, i));
        }
        return result;
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
        window.app.stage.removeChildren();
        this.choiceGame.Create(1);
    }
}