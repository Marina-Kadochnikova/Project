export default class Collision {
    static Collision(One: PIXI.Sprite, Two: PIXI.Sprite): number {
        if (One.x + One.width > Two.x && One.x + One.width < Two.x + Two.width && One.y + One.height > Two.y) {
            return 1;
        }

        if (One.x > Two.x && One.x < Two.x + Two.width && One.y + One.height > Two.y) {
            return 1;
        }

        return -1;
    }
}
