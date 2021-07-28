
export default class Buttons {
    public jump: PIXI.Sprite;
    public down: PIXI.Sprite;
    public shoot: PIXI.Sprite;
    public reload: PIXI.Sprite;
    public jump_b: boolean;
    public down_b: boolean;
    public reload_b: boolean;
    constructor() {
        this.jump_b = true;
        this.down_b = false;
        this.reload_b = false;
        
        this.jump = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/jump.png"));
        this.jump.x = 50;
        this.jump.y = window.app.screen.height - 200;
        this.jump.width = 150;
        this.jump.height = 150;

        this.down = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/jump.png"));
        this.down.x = 125;
        this.down.y = window.app.screen.height - 300;
        this.down.width = 150;
        this.down.height = 150;
        this.down.anchor.set(0.5);
        this.down.rotation = 3.14;

        this.shoot = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/shot.png"));
        this.shoot.x = window.app.screen.width - 200;
        this.shoot.y = window.app.screen.height - 200;
        this.shoot.width = 150;
        this.shoot.height = 150;

        this.reload = new PIXI.Sprite(PIXI.Texture.from("src/Eugene/Shooter/Image/Reloading.png"));
        this.reload.x = window.app.screen.width - 125;
        this.reload.y = window.app.screen.height - 300;
        this.reload.width = 150;
        this.reload.height = 150;
        this.reload.anchor.set(0.5);

        window.app.stage.addChild(this.jump, this.down, this.shoot, this.reload);
    }

    AddInteractive() {
        this.jump.buttonMode = true;
        this.jump.interactive = true;
        this.down.buttonMode = true;
        this.down.interactive = true;
        this.shoot.buttonMode = true;
        this.shoot.interactive = true;
        this.reload.buttonMode = true;
        this.reload.interactive = true;
    }

    DeleteInteractive() {
        this.jump.buttonMode = false;
        this.jump.interactive = false;
        this.down.buttonMode = false;
        this.down.interactive = false;
        this.shoot.buttonMode = false;
        this.shoot.interactive = false;
        this.reload.buttonMode = false;
        this.reload.interactive = false;
    }
}
