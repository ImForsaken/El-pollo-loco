class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;


    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; //number between 0-700 places clouds in canvas depending on generated number
        this.animate();
        this.speed = 0.15 + Math.random() * 0.2;
    }

    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
    }

}