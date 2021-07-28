import { Graphics } from "pixi.js-legacy";

export default class Lines {
    public arr_line:Graphics;

    constructor(i: number) {
        this.arr_line = new PIXI.Graphics();
        this.arr_line.lineStyle(10, 0xd5402b, 1)
        this.arr_line.position.x = window.sceneWidth/2;
        this.arr_line.position.y = window.sceneHeight/2 + (i + 1) * 60;
        this.arr_line.pivot.set(0, 140);
        this.arr_line.rotation = 1.57;
        this.arr_line.moveTo(5, 0);
        this.arr_line.lineTo(5, 280)

        window.app.stage.addChild(this.arr_line)
    }

    public getCoordinatLine(): number{
        return this.arr_line.position.y;
    }
}