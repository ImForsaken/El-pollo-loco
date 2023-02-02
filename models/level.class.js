class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    statusbar;
    level_end_x = 2200;

    constructor(enemies, endboss, clouds, backgroundObjects, statusbar) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
    }
}