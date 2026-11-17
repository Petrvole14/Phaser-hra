const config = {
    type:Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
const speed = 3;
let ground;

const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("player", "obrazky/sprite.webp", {
        frameWidth: 120,
        frameHeight: 120,
    });
    this.load.image("podlaha", "obrazky/podlaha.webp");
}

function create() {
    player = this.physics.add.sprite(100, 100, "player");

    ground = this.physics.add.staticGroup();

    ground.create(300, 500, "podlaha").setScale(1).refreshBody();

    this.physics.add.collider(player, ground);



    cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("player", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "walk-up",
        frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "walk-down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
}
function update() {
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
        player.anims.play("walk-up", true);
    } else if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("walk-left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("walk-right", true);
    } else {
        player.setVelocityX(0);
        player.anims.stop();
    }
}