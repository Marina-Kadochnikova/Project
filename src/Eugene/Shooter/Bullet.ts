import Tween from "./Tween";

export default class Bullet {
    public bullet:PIXI.Sprite;
    public x: number;
    public y: number;
    public tween: Tween;
    public end: any;
    public shot_b: boolean;
    constructor() {
        this.bullet = new PIXI.Sprite(PIXI.Texture.from('src/Eugene/Shooter/Image/Cartridge.png'));
        this.bullet.width = 25;
        this.bullet.height = 50;
        this.bullet.anchor.set(0.5);
        this.bullet.rotation = 1.57;
        this.bullet.x = -50;
        this.bullet.y = 0;

        window.app.stage.addChild(this.bullet);

        this.shot_b = false;

        this.end = () => {
            this.bullet.x = -50;
            this.tween.destroy();
            this.shot_b = false;
        }

        this.tween = new Tween();
    }

    Shot(y: number) {
        this.bullet.y = y;
        this.tween.addControl(this.bullet);
        this.tween.do({x:[630,window.app.screen.width]}).start(1000, this.end.bind(this), 1);
        this.shot_b = true;
    }
}
