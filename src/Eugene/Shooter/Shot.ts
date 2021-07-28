import Bullet from "./Bullet";
import Tween from "./Tween";

export default class Shot {
    public count_shot: number;
    public shot: PIXI.Sprite[];
    public heart: PIXI.Sprite[];
    public bullets: Bullet[];
    public count_heart: number;
    public reload_b: boolean;
    public reload: any;
    public tween: Tween;
    constructor() {
        this.count_shot = 5;
        this.count_heart = 5;
        this.shot = [];
        this.heart = [];
        this.bullets = [];
        this.reload_b = false;
        this.tween = new Tween();
        this.AddReload();

        for (let i = 0; i < this.count_heart; i++) {
            this.heart[i] = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/heart.png"));
            this.heart[i].width = 100;
            this.heart[i].height = 100;
            this.heart[i].x = 10 + i * 100
            this.heart[i].y = 10;

            window.app.stage.addChild(this.heart[i]);
        }

        for (let i = 0; i < this.count_shot; i++) {
            this.shot[i] = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/Cartridge.png"));
            this.shot[i].width = 50;
            this.shot[i].height = 100;
            this.shot[i].x = 10 + i * 50;
            this.shot[i].y = 110;

            this.bullets[i] = new Bullet();

            window.app.stage.addChild(this.shot[i]);
        }
    }

    Shot(y: number) {
        this.count_shot--;
        this.shot[this.count_shot].x = - 50;
        this.bullets[this.count_shot].Shot(y);
    }

    Reloading() {
        this.reload_b = true;
        this.tween.do({}).start(300, this.reload.bind(this), 1);
    }

    AddReload() {
        this.reload = () => {
            if (this.count_shot < 5) {
                this.count_shot++;
                this.shot[this.count_shot-1].x = 10 + (this.count_shot-1) * 50;
                this.tween.do({}).start(300, this.reload.bind(), 1);
            }
            else {
                this.reload_b = false;
                this.tween.destroy();
            }
        }
    }

    RemoveHeart() {
        this.count_heart--;
        this.heart[this.count_heart].x = -100;
    }
}
