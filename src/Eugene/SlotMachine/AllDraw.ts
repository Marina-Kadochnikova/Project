import Animation from "./Animation";
import ArraysTextures from "./ArraysTextures";
import winuttons from "./Buttons";
import Slot from "./Slot";
import Tween from "./Tween";

export default class AllDraw{
    public mask:PIXI.Graphics;
    public background:PIXI.Graphics;
    public main_container: PIXI.Container;
    public containers: PIXI.Container[];
    public buttons: winuttons;
    public slots: any[];
    public tweens: Tween[];
    public tween_draw: Tween;
    public timer: number;
    public animations_arrays: ArraysTextures;
    public finish:boolean;
    public boxes: any[];
    public draw_start:number;
    public draw_count:number;
    public draw: any;
    public line: PIXI.Sprite;
    public logo: Animation;
    public logo2: Animation;
    constructor () {
        this.containers = new Array();
        this.slots = new Array();
        this.tweens = new Array();
        this.boxes = new Array();

        this.finish = true;
        this.timer = 0;

        this.main_container = new PIXI.Container();
        this.main_container.x = 0;
        this.main_container.y = 0;

        this.mask = new PIXI.Graphics;
        this.mask.lineStyle( 5, 0xd82257, 1 );
        this.mask.drawRect( window.sceneWidth/2 - 256, window.sceneHeight/2 - 154, 511, 307);

        this.background = new PIXI.Graphics;
        this.background.beginFill(0x000000, 1);
        this.background.drawRect( window.sceneWidth/2 - 256, window.sceneHeight/2 - 154, 511, 307);
        this.background.endFill();

        window.app.stage.addChild(this.background);

        this.animations_arrays = new ArraysTextures();

        this.tween_draw = new Tween();

        for(let i = 0; i < 5; i++){
            this.containers[i] = new PIXI.Container();
            this.containers[i].width = 102;
            this.containers[i].height = 102 * 4;
            this.containers[i].x = window.sceneWidth/2 - 256 + (i * 102 + 51);
            this.containers[i].y = window.sceneHeight/2 - 154 - 102;
            this.main_container.addChild(this.containers[i]);

            this.tweens[i] = new Tween();

            this.slots[i] = [];
            for (let j = 0; j < 4; j++) {
                this.slots[i][j] = new Slot (this.animations_arrays.textures_slots[Math.floor(Math.random() * 9)], 0, j * 102 + 51, this.containers[i]);
            }
        }  

        let l = new PIXI.Sprite(this.animations_arrays.textures_logo[0]);
        l.x = window.sceneWidth/2 - 320;
        l.y = window.sceneHeight/2 - 154 - 75;
        this.logo = new Animation(l, this.animations_arrays.textures_logo);

        let l2 = new PIXI.Sprite(this.animations_arrays.textures_logo[0]);
        l2.x = window.sceneWidth/2 - 320;
        l2.y = window.sceneHeight/2 + 150;
        this.logo2 = new Animation(l2, this.animations_arrays.textures_logo);

        window.app.stage.addChild(l, l2);

        window.app.stage.addChild(this.main_container);
        window.app.stage.addChild(this.mask);
        this.main_container.mask = this.mask;
        
        this.line = new PIXI.Sprite(this.animations_arrays.textures_lines[0]);
        this.line.x = - 600;
        this.line.y = window.sceneHeight/2 - 154;
        this.line.width = 511;
        this.line.height = 307;
        window.app.stage.addChild(this.line);
    }

    DrawBoxAndLines (win_line: [][]) {
        this.draw = (win: number[], length: number) => {  

            if (this.draw_count >= length) {
                this.draw_count = this.draw_start;    
            }   

            if (this.boxes.length !== 0) {
                for (let i = 0; i < this.boxes.length; i++) {
                    this.containers[i].removeChild(this.boxes[i]);
                }
            }

            for (let i = 0; i < 50; i++) {
                if (win[this.draw_count] > 0) {
                    this.line.texture = this.animations_arrays.textures_lines[this.draw_count];

                    for (let j = 0; j < win[this.draw_count] + 1; j++) {
                        this.boxes[j] = new PIXI.Sprite(this.animations_arrays.texture_box);
                        this.boxes[j].anchor.set(0.5);
                        this.boxes[j].x = this.slots[win_line[this.draw_count][j][0]][win_line[this.draw_count][j][1]].slot.x;
                        this.boxes[j].y = this.slots[win_line[this.draw_count][j][0]][win_line[this.draw_count][j][1]].slot.y;
                        this.containers[j].addChild(this.boxes[j]);

                    }
                    break;
                }
                else {
                    this.draw_count += 1;
                }
            }
        
            this.draw_count += 1;
            if (length - this.draw_start > 0) this.tween_draw.do({}).start(1000, this.draw.bind(this, win, length), 1);
        };



        let win = new Array();
        let len = 0;

        // Проверка

        for (let i = 0; i < win_line.length; i++) {
            win[i] = 0;
            for (let j = 0; j < win_line[i].length; j++) {
                if (this.slots[win_line[i][j][0]][win_line[i][j][1]].Name === this.slots[win_line[i][j+1][0]][win_line[i][j+1][1]].Name) {
                    win[i]++;
                }
                else {
                    break;
                }

                if (j == 4) {
                    break;
                }
            }
        }

        // Проверка

        let s = "";
        for (let i = 0; i<9; i++) {
            s = s + win[i] + " | ";
        }
        console.log(s);

        for (let i = 0; i < win_line.length; i++) {
            if (win[i] > 0) {
                for (let j = 0; j < win[i] + 1; j++) {
                    if (!this.slots[win_line[i][j][0]][win_line[i][j][1]].anim) {
                        switch (this.slots[win_line[i][j][0]][win_line[i][j][1]].Name) {
                            case(1): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym1); break;
                            case(2): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym2); break;
                            case(3): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym3); break;
                            case(4): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym4); break;
                            case(5): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym5); break;
                            case(6): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym6); break;
                            case(7): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym7); break;
                            case(8): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym8); break;
                            case(9): this.slots[win_line[i][j][0]][win_line[i][j][1]].CreateAnimation(this.animations_arrays.textures_sym9); break;
                        }
                    }               
                }
            }
        }

        for (let i = 0; i < win.length; i++) {
            if (win[i] > 0) {
                len = i;
            }
        }

        for (let i = 0; i < win.length; i++) {
            if (win[i] > 0) {
                this.line.texture = this.animations_arrays.textures_lines[i];
                this.line.x = window.sceneWidth/2 - 256;

                for (let j = 0; j < win[i] + 1; j++) {
                    this.boxes[j] = new PIXI.Sprite(this.animations_arrays.texture_box);
                    this.boxes[j].anchor.set(0.5);
                    this.boxes[j].x = this.slots[win_line[i][j][0]][win_line[i][j][1]].slot.x;
                    this.boxes[j].y = this.slots[win_line[i][j][0]][win_line[i][j][1]].slot.y;
                    this.containers[j].addChild(this.boxes[j]);
                }
                this.draw_start = i;
                this.draw_count = i;
                this.tween_draw.do({}).start(1000, this.draw.bind(this, win, len), 1);
                break;
            }
        }
    }
}