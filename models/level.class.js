class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusbar;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, statusbar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
    }
}