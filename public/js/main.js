let config = {
    width: 500,
    height: window.innerHeight,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

var game = new Phaser.Game(config)
let bird;
let cursors;
var spacebar;
var maximunPipeUp = 350;
var minimunPipeUp = 600;
var maximunPipeDown = 150;
var minimunPipeDown = -100;
var pipeCentralizer = 70;

function preload() {
    this.load.image('bird', './public/assets/img/bird.png')
    this.load.image('pipeUp', './public/assets/img/pipeUp.png')
    this.load.image('pipeDown', './public/assets/img/pipeDown.png')
}

function create() {
    bird = this.physics.add.image(100, 300, 'bird')
    bird.setScale(0.08)
    bird.body.collideWorldBounds = true
    this.physics.world.gravity.y = 1350;
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    obstacle = this.physics.add.group();
    newPipe(this);
}

function newPipe(scene) {
    const obstacle = scene.physics.add.group();

    const pipeUp = obstacle.create(0, 0, 'pipeUp');
    const pipeDown = obstacle.create(0, 0, 'pipeDown');

    pipeUp.setScale(0.4);
    pipeDown.setScale(0.4);

    const pipeGap = 150;
    const pipeVerticalPosition = Phaser.Math.Between(-200, 200);

    pipeUp.x = 800;
    pipeUp.y = pipeVerticalPosition - pipeGap / 2 + game.config.height / 2;

    pipeDown.x = 800;
    pipeDown.y = pipeVerticalPosition + pipeGap / 2 + game.config.height / 2;

    pipeUp.setVelocityX(-150);
    pipeDown.setVelocityX(-200);

    pipeUp.body.allowGravity = false;
    pipeDown.body.allowGravity = false;
}

function update() {
    bird.setVelocityX(0)

    if (Phaser.Input.Keyboard.JustDown(spacebar)) {
        bird.setVelocity(0, -300);
        this.tweens.add({
            targets: bird,
            angle: -60,
            duration: 50,
            ease: 'Power1',
        });
    } else {
        this.tweens.add({
            targets: bird,
            angle: 40,
            duration: 1000,
            ease: 'Power1',
        });
    }

    obstacle.setVelocityX(-200);
}