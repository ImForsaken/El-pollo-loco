class Bottle extends DrawableObject {


    height = 80;
    width = 80;

    offset = {
        top: 10,
        left: 15,
        right: 15,
        bottom: 5
    };

    constructor(x, y, k) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(`img/6_salsa_bottle/${k}_salsa_bottle_on_ground.png`);
    }
}