import Tween from "./Tween";

export default class Col_Player {
    public col_player: PIXI.Sprite;
    public tween: Tween;
    public jump: boolean;
    public down: any;
    public down_end: any;
    constructor() {
        this.jump = false;

        this.col_player = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.col_player.x = 325;
        this.col_player.y = window.app.screen.height - 500;
        this.col_player.width = 250;
        this.col_player.height = 400;
        //window.app.stage.addChild(this.col_player);

        this.tween = new Tween();

        this.down = () => {
            this.tween.do({y:[this.col_player.y, this.col_player.y + 400]}).start(700, this.down_end.bind(this), 1);
        }

        this.down_end = () => {
            this.jump = false;
            this.col_player.height = 400;
            this.tween.destroy();
        }
    }

    Jump() {
        this.col_player.height = 300;
        this.jump = true;
        this.tween.addControl(this.col_player);
        this.tween.do({y:[this.col_player.y, this.col_player.y - 400]}).start(1000, this.down.bind(this), 1);
    }

    Down() {
        this.tween.destroy();
        this.tween.addControl(this.col_player);
        this.tween.do({y:[this.col_player.y, window.app.screen.height - 500]}).start(100, this.down_end.bind(this), 1);
    }
}
