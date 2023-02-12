function addClickEvents() {
    document.getElementById('arrowLeftButton').addEventListener('mousedown', function() {
        keyboard.LEFT = true;
    });
    document.getElementById('arrowLeftButton').addEventListener('mouseup', function() {
        keyboard.LEFT = false;
    });
    document.getElementById('arrowRightButton').addEventListener('mousedown', function() {
        keyboard.RIGHT = true;
    });
    document.getElementById('arrowRightButton').addEventListener('mouseup', function() {
        keyboard.RIGHT = false;
    });
    document.getElementById('jumpButton').addEventListener('mousedown', function() {
        keyboard.SPACE = true;
    });
    document.getElementById('jumpButton').addEventListener('mouseup', function() {
        keyboard.SPACE = false;
    });
    document.getElementById('throwButton').addEventListener('mousedown', function() {
        keyboard.D = true;
    });
    document.getElementById('throwButton').addEventListener('mouseup', function() {
        keyboard.D = false;
    });

}


function addTouchEvents() {
    document.getElementById('arrowLeftButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = true;
    });
    document.getElementById('arrowRightButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = true;
    });
    document.getElementById('throwButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = true;
    });
    document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = true;
    });
    document.getElementById('arrowLeftButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = false;
    });
    document.getElementById('arrowRightButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = false;
    });
    document.getElementById('throwButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = false;
    });
    document.getElementById('jumpButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = false;
    });
}


function listenForKeyDown(e) {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (e.code == 'Space') {
        keyboard.SPACE = true;
    } else if (e.code == 'KeyD') {
        keyboard.D = true;
    }
}


function listenForKeyUp(e) {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (e.code == 'Space') {
        keyboard.SPACE = false;
    } else if (e.code == 'KeyD') {
        keyboard.D = false;
    }
}