
export default class AnimationsArrays{
    public textures_logo:PIXI.Texture[];
    public textures_slots:PIXI.Texture[];
    public textures_lines:PIXI.Texture[];
    public textures_sym1:PIXI.Texture[];
    public textures_sym2:PIXI.Texture[];
    public textures_sym3:PIXI.Texture[];
    public textures_sym4:PIXI.Texture[];
    public textures_sym5:PIXI.Texture[];
    public textures_sym6:PIXI.Texture[];
    public textures_sym7:PIXI.Texture[];
    public textures_sym8:PIXI.Texture[];
    public textures_sym9:PIXI.Texture[];
    public texture_box:PIXI.Texture;
    constructor () {
        this.textures_logo = new Array();
        this.textures_lines = new Array();
        this.textures_slots = new Array();
        this.textures_sym1 = new Array();
        this.textures_sym2 = new Array();
        this.textures_sym3 = new Array();
        this.textures_sym4 = new Array();
        this.textures_sym5 = new Array();
        this.textures_sym6 = new Array();
        this.textures_sym7 = new Array();
        this.textures_sym8 = new Array();
        this.textures_sym9 = new Array();

        this.texture_box = PIXI.Texture.from('src/Eugene/SlotMachine/Image/ramka.png');

        for(let i = 0; i < 9; i++){
            this.textures_slots[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Sym/sym' + (i + 1) +'.png');
        }

        for(let i = 0; i < 9; i++){
            this.textures_lines[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Lines/line_' + (i + 1) +'.png');
        }

        for(let i = 0; i < 6; i++){
            this.textures_logo[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Logo/logo' + i +'.png');
        }

        for(let i = 6; i < 12; i++){
            this.textures_logo[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Logo/logo' + (11 - i) +'.png');
        }

        for(let i = 0; i < 2; i++){
            this.textures_sym1[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym1/sym' + (i + 1) +'.png');
            this.textures_sym2[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym2/sym' + (i + 1) +'.png');
            this.textures_sym3[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym3/sym3_' + (i) +'.png');
            this.textures_sym4[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym4/sym4_' + (i) +'.png');
            this.textures_sym5[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym5/sym5_' + (i) +'.png');
        }

        for(let i = 0; i < 20; i++){
            this.textures_sym6[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym6/sym6_' + i +'.png');
        }

        for(let i = 0; i < 35; i++){
            this.textures_sym7[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym7/sym7_' + i +'.png');
        }

        for(let i = 0; i < 36; i++){
            this.textures_sym8[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym8/sym8_' + i +'.png');
        }

        for(let i = 0; i < 27; i++){
            this.textures_sym9[i] = PIXI.Texture.from('src/Eugene/SlotMachine/Image/Anim_sym9/sym9_' + i +'.png');
        }
    }
}