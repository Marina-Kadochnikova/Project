import Tween from "./Tween";

export default class Enemy {
    public enemy:PIXI.AnimatedSprite;
    public tween: Tween;
    public add_enemy: boolean;
    public add_timer: boolean;
    public remove_heart: boolean;
    public end_move_one: any;
    public end_move_two: any;
    public timer: number;
    public count_heart: number;
    public death: boolean;
    constructor() {
        this.timer = 0;
        this.count_heart = 5;
        this.death = false;
        const Textures = [];
        for (let i = 0; i < 4; i++) {
            Textures.push(PIXI.Texture.from('src/Eugene/Shooter/Image/Enemy/' + (i + 1) + '.png'));
        }

        this.enemy = new PIXI.AnimatedSprite(Textures);
        this.enemy.width = 300;
        this.enemy.height = 200;
        this.enemy.x = window.app.screen.width;
        this.enemy.y = window.app.screen.height - 500;
        this.enemy.animationSpeed = 0.1;
        this.enemy.play();

        this.add_enemy = false;

        window.app.stage.addChild(this.enemy);

        this.tween = new Tween();

        this.end_move_one = () => {
            this.add_timer = true;
        }

        this.end_move_two = () => {
            this.timer = 0;
            this.count_heart = 5;
            this.add_enemy = false;
            this.remove_heart = false;
            this.add_timer = false;
            this.tween.destroy();
            this.death = false;
            console.log("Монстр появится заново");
        }
    }

    AddEnemy() {
        this.count_heart = 5;
        this.add_enemy = true;
        this.enemy.y = window.app.screen.height - 500;
        this.tween.addControl(this.enemy);
        this.tween.do({x:[window.app.screen.width, window.app.screen.width - 500]}).start(1000, this.end_move_one.bind(this), 1);
        console.log("Добавил монстра");
    }

    AddMove() {
        this.tween.destroy();
        this.tween.addControl(this.enemy);
        this.tween.do({x:[this.enemy.x, -300]}).start(2500, this.end_move_two.bind(this), 1);
    }

    RemoveHeart() {
        this.count_heart--;
    }

    Dead() {
        this.death = true;
        this.tween.destroy();
        this.tween.addControl(this.enemy);
        this.tween.do({y:[this.enemy.y, window.app.screen.height]}).start(300, this.end_move_two.bind(this), 1);
        console.log("Монстр умер");
    }
}
