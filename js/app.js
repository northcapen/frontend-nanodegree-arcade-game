// Enemies our player must avoid
const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;

var Enemy = function(row, speedFactor) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = row*CELL_HEIGHT-20;
    this.speedFactor = speedFactor || 10;
    this.justAppeared = true;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 5 * CELL_WIDTH || this.justAppeared) {
        this.x = -1 * Math.random() * CELL_WIDTH;
        this.speed = this.speedFactor * Math.random() * 5;
        this.justAppeared = false;
    }

    this.x += this.speed*dt;
    if(Math.abs(this.x - player.x) < 3*CELL_WIDTH/4 && Math.abs(this.y - player.y) < CELL_HEIGHT/2) {
        console.log('Dead!');
        player.init();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.init();
}

Player.prototype.init = function () {
    this.x = 2*CELL_WIDTH;
    this.y = 5*CELL_HEIGHT-10;
}

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
       this.x -= CELL_WIDTH;
    } else if (direction == 'right' && this.x < 4*CELL_WIDTH) {
       this.x += CELL_WIDTH;
    } else if (direction == 'up' && this.y > 0) {
       this.y -= CELL_HEIGHT;
    } else if (direction == 'down' && this.y < 4*CELL_HEIGHT) {
        this.y += CELL_HEIGHT;
    }

    if(this.y < 0) {
       console.log('Won!');
       this.init();
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [new Enemy(1, 45), new Enemy(1, 10), new Enemy(2, 50), new Enemy(2, 100), new Enemy(3, 25)];
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
