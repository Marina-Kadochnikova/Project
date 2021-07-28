import AllDraw from "./AllDraw";
import Buttons from "./Buttons";
import Tween from "./Tween";

export default class Main{
    public function: any[];
    public start:any; 
    public bounce: any;
    public time_move: number;
    public win_line: any;
    public draw_all:AllDraw;
    public buttons: Buttons;
    constructor () {
        this.function = new Array();
        this.win_line = new Array();

        this.win_line = [
            [[0,1],[1,1],[2,1],[3,1],[4,1]],
            [[0,2],[1,2],[2,2],[3,2],[4,2]],
            [[0,3],[1,3],[2,3],[3,3],[4,3]],
            [[0,1],[1,2],[2,3],[3,2],[4,1]],
            [[0,3],[1,2],[2,1],[3,2],[4,3]],
            [[0,2],[1,3],[2,3],[3,3],[4,2]],
            [[0,2],[1,1],[2,1],[3,1],[4,2]],
            [[0,1],[1,1],[2,2],[3,3],[4,3]],
            [[0,3],[1,3],[2,2],[3,1],[4,1]],
        ];

        this.time_move = 100;

        this.draw_all = new AllDraw();

        this.AddFunctions();

        this.buttons = new Buttons();
        this.buttons.button_start.on("pointerdown", this.start.bind(this));

        window.app.ticker.add ( () => {
            if (this.draw_all.tweens.length !== 0) {
                for (let i = 0; i < 5; i++) {
                    if (this.draw_all.tweens[i].started) this.draw_all.tweens[i].update(window.app.ticker.elapsedMS);
                }

                if (!this.draw_all.finish && this.draw_all.timer < 1000) {
                    this.draw_all.timer = this.draw_all.timer + window.app.ticker.elapsedMS;
                }
                else {
                    this.draw_all.finish = true;
                    this.draw_all.timer = 0;
                }

                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (this.draw_all.slots[i][j].anim) {
                            this.draw_all.slots[i][j].animations.tween.update(window.app.ticker.elapsedMS);
                        }
                    }
                }
            }

            if (this.draw_all.tween_draw.started) {
                this.draw_all.tween_draw.update(window.app.ticker.elapsedMS);
            }

            this.draw_all.logo.tween.update(window.app.ticker.elapsedMS);
            this.draw_all.logo2.tween.update(window.app.ticker.elapsedMS);
        });

        window.app.ticker.start();
    }

    AddFunctions() {
        this.start = () => {
            if (this.draw_all.finish && !this.draw_all.tweens[0].started && !this.draw_all.tweens[1].started && !this.draw_all.tweens[2].started && !this.draw_all.tweens[3].started && !this.draw_all.tweens[4].started) {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (this.draw_all.slots[i][j].anim) {
                            this.draw_all.slots[i][j].DeleteAnimation();
                        }
                    }
                }
                
                this.draw_all.finish = false;

                for (let i = 0; i < 5; i++) {
                    this.draw_all.tweens[i].clearControllers();
                    this.draw_all.tweens[i].clearControls();
                    this.draw_all.tweens[i].addControl(this.draw_all.containers[i]).do({y:[this.draw_all.containers[i].y, this.draw_all.containers[i].y + 102]});
                    this.draw_all.tweens[i].start(this.time_move, this.function[i].bind(this, i), 1);
                }

                if (this.draw_all.boxes.length !== 0) {
                    for (let i = 0; i < this.draw_all.boxes.length; i++) {
                        this.draw_all.line.x = - 600;
                        this.draw_all.containers[i].removeChild(this.draw_all.boxes[i]);
                    }
                    this.draw_all.draw_start = 0;
                    this.draw_all.tween_draw.destroy();
                }
            }
            else {
                this.draw_all.timer = 3000;
            }
        }

        for (let i = 0; i < 5; i++) {
            this.function[i] = (a:number) => {  
                window.setTimeout ( () => {
                    for (let j = 3; j > 0; j--) {
                        this.draw_all.slots[a][j].SetTexture(this.draw_all.slots[a][j-1].GetTexture());
                    }
            
                    this.draw_all.slots[a][0].SetTexture(this.draw_all.animations_arrays.textures_slots[Math.floor(Math.random() * 9)]);

                    if (!this.draw_all.finish) {
                        this.draw_all.tweens[a].start(this.time_move, this.function[a].bind(this, a), 1);
                    }
                    else {
                        this.draw_all.containers[a].position.y = this.draw_all.containers[a].position.y - 102;
                        this.draw_all.tweens[a].do({y:[this.draw_all.containers[a].y, this.draw_all.containers[a].y + 102]}, Tween.BackOut);
                        this.draw_all.tweens[a].start(200, this.bounce.bind(this, a), 1);
                    }  
                }, 1);
            };
        }

        this.bounce = (a: number) => {
            for (let j = 3; j > 0; j--) {
                this.draw_all.slots[a][j].SetTexture(this.draw_all.slots[a][j-1].GetTexture());
            }
    
            this.draw_all.slots[a][0].SetTexture(this.draw_all.animations_arrays.textures_slots[Math.floor(Math.random() * 9)]);
            this.draw_all.containers[a].position.y = this.draw_all.containers[a].position.y - 102;

            if(a === 4) {
                this.draw_all.DrawBoxAndLines(this.win_line);
            }
        }
    }
}