import СhoiceGame from "./СhoiceGame";

export default class MainMenu{
    public buttons: PIXI.Sprite[];
    public choice: СhoiceGame;
    constructor() {
        this.buttons = [];
        this.AddButtons();
    }

    AddButtons() {
        this.buttons[0] = new PIXI.Sprite(PIXI.Texture.from("src/_Main/Image/Eugene.png"));
        this.buttons[1] = new PIXI.Sprite(PIXI.Texture.from("src/_Main/Image/Marina.png"));
        this.buttons[2] = new PIXI.Sprite(PIXI.Texture.from("src/_Main/Image/Rita.png"));

        for (let i = 0; i < 3; i++) {
            this.buttons[i].x = 20;
            this.buttons[i].y = window.app.screen.height - window.app.screen.height/10 - (i * window.app.screen.height/10 + 20);
            this.buttons[i].width = window.app.screen.width/4.5;
            this.buttons[i].height = window.app.screen.height/11;
            this.buttons[i].buttonMode = true;
            this.buttons[i].interactive = true;
            this.buttons[i].on("pointerdown", this.ClickButton.bind(this, i));

            window.app.stage.addChild(this.buttons[i]);
        }
    }

    ClickButton(i: number) {
        this.RemoveButtons();
        this.choice = new СhoiceGame(i, this);
    }

    RemoveButtons() {
        for (let i = 0; i < 3; i++) {
            this.buttons[i].destroy();
        }
    }
}