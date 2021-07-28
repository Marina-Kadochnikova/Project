import Tween from "./Tween";

export default class Bush {
    public bush:PIXI.Sprite;
    public tween: Tween;
    public add_bush: boolean;
    public remove_heart: boolean;
    public end_move: any;
    constructor() {
        this.bush = new PIXI.Sprite(PIXI.Texture.from('src/Eugene/Shooter/Image/bush.png'));
        this.bush.width = 300;
        this.bush.height = 200;
        this.bush.x = window.app.screen.width;
        this.bush.y = window.app.screen.height - 300;
        this.add_bush = false;

        window.app.stage.addChild(this.bush);

        this.tween = new Tween();

        this.end_move = () => {
            this.add_bush = false;
            this.remove_heart = false;
        }
    }

    AddBush() {
        this.add_bush = true;
        this.tween.addControl(this.bush);
        this.tween.do({x:[window.app.screen.width, -300]}).start(2500, this.end_move.bind(this), 1);
    }
}
