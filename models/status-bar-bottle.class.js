class StatusbarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];


    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png');
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }
}