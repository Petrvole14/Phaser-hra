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
let background;
let coin;
let coin1;
let coin2;
let coin3;
let coin4;
let score = 0;
let scoreText;
let enemy;
let lives = 3;

const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("player", "obrazky/sprite.webp", {
        frameWidth: 120,
        frameHeight: 120,
    });
    this.load.image("podlaha", "obrazky/podlaha.webp");
    this.load.image("coin", "obrazky/coin.png");
}

function create() {
    player = this.physics.add.sprite(100, 100, "player");

    ground = this.physics.add.staticGroup();

    ground.create(300, 500, "podlaha").setScale(1).refreshBody();

    enemy = this.physics.add.sprite(400, 100, "player");
    enemy.setVelocityX(100);
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1,0)

    coin = this.physics.add.sprite(500, 400, "coin").setScale(0.05)
    coin1 = this.physics.add.sprite(600, 400, "coin").setScale(0.05)
    coin2 = this.physics.add.sprite(700, 400, "coin").setScale(0.05)
    coin3 = this.physics.add.sprite(800, 400, "coin").setScale(0.05)
    coin4 = this.physics.add.sprite(900, 400, "coin").setScale(0.05)


    collectibles = this.physics.add.group();
    collectibles.add(coin);
    collectibles.add(coin1);
    collectibles.add(coin2);
    collectibles.add(coin3);
    collectibles.add(coin4);

    const c1 = collectibles.create(500, 400, "coin").setScale(0.05);
    const c2 = collectibles.create(600, 400, "coin").setScale(0.05);
    const c3 = collectibles.create(700, 400, "coin").setScale(0.05);
    const c4 = collectibles.create(800, 400, "coin").setScale(0.05);
    const c5 = collectibles.create(900, 400, "coin").setScale(0.05);

    
    this.physics.add.collider(ground, coin);

    this.physics.add.collider(player, ground);

    this.physics.add.collider(player, enemy);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ff0000' });
    livesText = this.add.text(16, 50, 'Lives: 3', { fontSize: '32px', fill: '#ff0000' });

    this.physics.add.overlap(player, coin, () => {
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    });
    

   



    skyPlatform = this.physics.add.group({
        allowGravity: false,
        immovable: true
    })

    const platform1 = skyPlatform.create(600, 400, "podlaha");
    platform1.setVelocityX(50);
    platform1.setCollideWorldBounds(true);
    platform1.setBounce(1);
    
    this.physics.add.collider(player, skyPlatform);







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