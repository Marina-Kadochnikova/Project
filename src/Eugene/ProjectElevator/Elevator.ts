import Eldoors from "./ElevatorDoors";

export default class Elevator {
    public rect:PIXI.Graphics;
    public movement; up:boolean;
    public floors: number[];
    public eldoor: Eldoors;

    constructor() {
        this.rect = new PIXI.Graphics();   
        this.floors = new Array();

        this.movement = false;

        this.DrawElevator();
    }

    DrawElevator() {
        this.rect.lineStyle( 5, 0xd82257, 1 );
        this.rect.drawRect( 0, 0, 40, 55);
        window.app.stage.addChild(this.rect);

        this.rect.position.x = window.sceneWidth/2 - 190;
        this.rect.position.y = window.sceneHeight/2 + 252;

        this.eldoor = new Eldoors(this.rect);
    }

    AddFloor(y: number, onefloor: number, up: number) {
        if (this.floors.indexOf(y) == -1) {
            if (this.rect.position.y + this.rect.height -12 != y) {
                this.movement = true;
                this.floors.push(y);

                if (this.floors[this.floors.indexOf(y)] < this.floors[this.floors.indexOf(y) - 1]) {
                    if (up == -1) {
                        this.floors.sort( (a, b) => a - b );
                    }
                    else {
                        if (this.floors[0] == onefloor) this.floors.shift(); 
                        var a = this.floors.indexOf(y);
                        this.floors.push(onefloor);
                        this.floors[a] = onefloor;
                        this.floors[a + 1] = y;
                    }
                }
                
                this.ViewMass();
            }
            else
                this.eldoor.OpenDoor()
        }
    }

    DeleteFloor(y: number, onefloor: number){
        this.floors.splice(this.floors.indexOf(y), 1);
        if (this.floors.length == 0 && this.rect.position.y + this.rect.height -12 != onefloor ) 
            this.floors.push(onefloor);
        
        this.movement = false;
        this.eldoor.OpenDoor()

        this.ViewMass();
    }

    SetPosition(y: number, delta: number, i:number, onefloor: number) {
        this.rect.position.y += Math.ceil(delta/1000 * 10) * i;
        this.eldoor.door1.position.y += Math.ceil(delta/1000 * 10) * i;
        this.eldoor.door2.position.y += Math.ceil(delta/1000 * 10) * i;

        if (this.rect.position.y + this.rect.height -12 == y) {
            this.DeleteFloor(y, onefloor);
        }
    }

    ViewMass() {
        var s = "";
        for (var i = 0; i < this.floors.length; i++) {
            s = s + "" + this.floors[i] + ", ";
        }            
        console.log(s);
    }
}