class Endboss extends MovableObject {
    height = 350;
    width = 300;
    energy = 100;
    chargeSpeed = 50;
    inVision = false;
    bossRageStart = false;
    chargeLeft = false;
    chargeRight = false;
    isAttacking = false;
    denyCheck = false;
    y = 90;
    x = 2500;
    speed = 0.6
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    immortalDuration = 1.4;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];



    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.endbossAttack()
        }, 150);
        setInterval(() => {
            this.EndbossFight();
        }, 200);
    };


    EndbossFight() {
        if (this.checkStartOfEndbossFight()) {
            this.startEndbossFight();
        } else if (this.checkIfEndbossIsAttacking()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.checkIfEndbossIsWalking()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.checkIfEndbossIsHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.checkIfEndbossIsDead()) {
            this.playDead();
        }
    }


    startEndbossFight() {
        if (this.alertLoop <= (this.IMAGES_ALERT.length - 1)) {
            this.loadImage(this.IMAGES_ALERT[this.alertLoop]);
            this.alertLoop += 1;
            console.log(this.alertLoop)
        } else if (this.alertLoop == 8 && this.inVision) {
            this.bossRageStart = true;
            this.inVision = false;
            this.denyCheck = true;
        }
    }


    endbossAttack() {
        if (!world.gamePaused && this.bossRageStart && !this.isHurt(this.immortalDuration) && !this.otherDirection && !this.isDead()) {
            this.bosscharge(this.chargeSpeed);
        } else if (!world.gamePaused && this.bossRageStart && !this.isHurt(this.immortalDuration) && this.otherDirection && !this.isDead()) {
            this.bosscharge(-this.chargeSpeed);
        }
    }


    playDead() {
        if (this.deadLoop <= (this.IMAGES_DEAD.length - 1)) {
            this.loadImage(this.IMAGES_DEAD[this.deadLoop]);
            this.deadLoop += 1;
        }
    }


    bosscharge(speed) {
        this.x -= speed;
    }


    checkStartOfEndbossFight() {
        return !world.gamePaused && this.inVision;
    }


    checkIfEndbossIsAttacking() {
        return !world.gamePaused && this.isAttacking && !this.isHurt(this.immortalDuration) && !this.isDead();
    }


    checkIfEndbossIsWalking() {
        return !world.gamePaused && !this.isDead() && !this.inVision && !this.isHurt(this.immortalDuration) && !this.isAttacking;
    }


    checkIfEndbossIsHurt() {
        return !world.gamePaused && this.isHurt(this.immortalDuration) && !this.isDead();
    }


    checkIfEndbossIsDead() {
        return !world.gamePaused && this.isDead();
    }
}