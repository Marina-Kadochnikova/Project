import Tween from "./Tween";

export default class Animation{
    public sprite: PIXI.Sprite;
    public textures: PIXI.Texture[];
    public curent_frame: number;
    public duration: number;
    public tween: Tween;
    public function_update: any;
    constructor (sprite: PIXI.Sprite, textures: PIXI.Texture[]) {
        this.sprite = sprite;

        this.textures = textures;
        this.duration = 150;
        this.curent_frame = 0;
        
        this.CreateFunction();

        this.tween = new Tween();
        this.tween.addControl(this.sprite);
        this.tween.do({});

        this.tween.start(this.duration, this.function_update, 1);
    }

    CreateFunction() {
        this.function_update = () => {
            if (this.curent_frame < this.textures.length - 1) {
                this.curent_frame += 1;
                this.sprite.texture = this.textures[this.curent_frame];
                this.tween.start(this.duration, this.function_update, 1);        
            }
            else {
                this.curent_frame = 0;
                this.sprite.texture = this.textures[this.curent_frame];
                this.tween.start(this.duration, this.function_update, 1);    
            }
        }
    }

    StopAnimation() {
        this.tween.destroy();
    }
}