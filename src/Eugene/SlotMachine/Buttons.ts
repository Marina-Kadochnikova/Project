export default class Buttons{
    public button_start:PIXI.Sprite;
    constructor () {
        this.button_start = new PIXI.Sprite(PIXI.Texture.from('src/Eugene/SlotMachine/Image/button_start_stay.png'));
        this.button_start.anchor.set(0.5);
        this.button_start.x = window.sceneWidth/2 + 350;
        this.button_start.y = window.sceneHeight/2;
        this.button_start.buttonMode = true;
        this.button_start.interactive = true;

        window.app.stage.addChild(this.button_start);
    }
}