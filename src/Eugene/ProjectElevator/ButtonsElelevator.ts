export default class ButtonsEl {
    public button:PIXI.Graphics;

    constructor(i: number) {
        this.button = new PIXI.Graphics;
        this.button.beginFill(0x709fe9, 1);
        this.button.drawRect( window.sceneWidth/2 - 130, window.sceneHeight/2 + i * 60 + 30, 15, 15);
        this.button.endFill();
        this.button.buttonMode = true;
        this.button.interactive = true;
        window.app.stage.addChild(this.button);
    }
}