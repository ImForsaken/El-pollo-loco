let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    document.getElementById('startButton').style.display = "none";
    document.getElementById('gameIntro').style.display = "none";
    document.getElementById('gameInfo').style.display = "none";
}


function showInfo() {
    const gameInfo = document.getElementById('gameInfo');
    if (gameInfo.style.display === '' || gameInfo.style.display === 'none') {
        gameInfo.style.display = 'block';
        if (world) {
            world.pause();
            console.log('game paused')
        }
    } else {
        gameInfo.style.display = 'none';
        if (world) {
            world.start();
            console.log('game started')
        }
    }
}


//TODO Probaly change if statements to else if for better performance
window.addEventListener('keydown', (e) => {
    //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});