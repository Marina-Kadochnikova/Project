import Animation from "./Animation";
import Tween from "./Tween";

export default class Slot{
    public slot:PIXI.Sprite;
    public Name:number;
    public container:PIXI.Container;
    public animations: Animation;
    public textures: PIXI.Texture[];
    public anim: boolean;
    constructor (texture: PIXI.Texture, x:number, y:number, container: PIXI.Container) {
        this.slot = new PIXI.Sprite();
        this.textures = Array();
        this.anim = false;
        this.slot.anchor.set(0.5);
        this.slot.x = x;
        this.slot.y = y;
        this.container = container;

        this.SetTexture(texture);
        this.container.addChild(this.slot);
    }

    AddControl(tween: Tween) {
        tween.addControl(this.slot);
    }
    
    CreateAnimation(textures: PIXI.Texture[]) {
        this.animations = new Animation(this.slot, textures);
        this.anim = true;
    }

    DeleteAnimation() {
        this.animations.StopAnimation();
        this.anim = false; 
    }

    SetPositionY(y: number){
        this.slot.y = y;
    }

    GetPosition():number {
        return this.slot.y;
    }

    SetTexture(texture: PIXI.Texture) {
        let s = texture.textureCacheIds.toString();
        s = s.substring(s.indexOf("sym") + 3, s.indexOf("sym") + 4);
        this.Name = parseInt(s);
        this.slot.texture = texture;
    }

    GetTexture():PIXI.Texture {
        return this.slot.texture;
    }
}