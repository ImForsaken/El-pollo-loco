class StatusbarHealthBoss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_0.png', // 0 path
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_20.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_40.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_60.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_80.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar_health/boss_100.png', //5 path
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 470;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}