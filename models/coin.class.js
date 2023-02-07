class Coin extends DrawableObject {
    height = 120;
    width = 120;

    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };


    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/8_coin/coin_1.png');
    }
}