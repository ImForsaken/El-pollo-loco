let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is ', world.character);
}


//TODO Probaly change if statements to else if for better performance
window.addEventListener('keydown', (e) => {
    console.log(e);
    //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        console.log(keyboard);
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        console.log(keyboard);
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
        console.log(keyboard);
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
        console.log(keyboard);
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
        console.log(keyboard);
    }
});

window.addEventListener('keyup', (e) => {
    console.log(e);
    //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        console.log(keyboard);
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        console.log(keyboard);
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
        console.log(keyboard);
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
        console.log(keyboard);
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
        console.log(keyboard);
    }
});