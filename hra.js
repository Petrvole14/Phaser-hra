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
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH


        
    }
};

let player;
let cursors;
let speed = 3;
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
let attacking = false;
let enemydirection = -1; 
let hitbox;
let enemy1;
let enemy2;
let jumpPower = 400;
let counterzombie = 0;
let bowser;
let bowserPlayed = false;
let box;
let enemy3hit = false;
let enemysecondcounter = 0;
let enemy3;         
let enemy4;



const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("player", "obrazky/RUN.png", { frameWidth: 96, frameHeight:96 });
    this.load.spritesheet("playeridle", "obrazky/IDLE.png", { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet("playerattack", "obrazky/attack.png", { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet("enemy", "obrazky/enemywalk.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("ground", "obrazky/podlaha.webp");
    this.load.image("background", "obrazky/background2.png");
    this.load.spritesheet("coin" , "obrazky/coin.png", { frameWidth: 16, frameHeight: 16 });
    this.load.audio("meele", "zvuky/meele.mp3");
    this.load.audio("jump", "zvuky/jump.mp3");
    this.load.audio("coin", "zvuky/coin.mp3");
    this.load.spritesheet("coinspin", "obrazky/Coin.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("shop", "obrazky/shop.webp");
    this.load.image("shopbackground", "obrazky/shop_menu.png");
    this.load.spritesheet("pixelgroud", "obrazky/platforms.png", { frameWidth: 32, frameHeight: 16 });
    this.load.image("menubg", "obrazky/menu.gif");
    this.load.audio("backgroundmusic", "zvuky/music.mp3");
    this.load.image("luckybox", "obrazky/luckybox.webp");
    this.load.image("zombie2", "obrazky/Zombie.png");
    
    
    
    
}

function create() {
    this.physics.world.setBounds(0, 0, 6000, 1080);
    this.cameras.main.setBounds(0, 0, 6000, 1080);

    //pisnicka//

    backgroundMusic = this.sound.add("backgroundmusic", { loop: true, volume: 0.25 });
    backgroundMusic.play();




    
//prvni menu//
    const img = this.add.image(960, 540, "menubg");
    img.setScrollFactor(0);
    img.setDepth(20);
    img.setInteractive();

    img.on('pointerdown', (pointer, localX, localY) => {
        if (localX > 708 && localX < 1212 && localY > 492 && localY < 612) {
            img.setVisible(false);
            img.disableInteractive();
        }
    });   
    //animace
 

            
    
    
    

    


    
    //text//
    scoreText = this.add.text(50, 50, 'Score: 0', { fontSize: '32px', fill: '#000' }); 
     
    scoreText.setScrollFactor(0);
    scoreText.setDepth(10);
    scoreText.setPosition(50, 100);
    scoreText.setFontFamily('Arial');
    scoreText.setColor('#fa0707');
    livesText = this.add.text(50, 50, 'Lives: 3', { fontSize: '32px', fill: '#000' });
    livesText.setScrollFactor(0);
    livesText.setDepth(10);
    livesText.setPosition(50, 150);
    livesText.setFontFamily('Arial');
    livesText.setColor('#fa0707');


    //shop//
    const shop = this.add.image(960, 540, "shop");
    shop.setScale(0.5);
    shop.setInteractive();
    shop.setScrollFactor(0);
    shop.setPosition(1700, 150);
    shop.setDepth(10);

    const shopbackground = this.add.image(960, 540, "shopbackground").setScale(0.5).setVisible(false).setDepth(12);
    shopbackground.setInteractive();
    shopbackground.setScrollFactor(0);
    shopbackground.setDepth(12);
    shop.on('pointerdown', () => {
        shopbackground.setVisible(!shopbackground.visible);
    });




    shopbackground.on('pointerdown', (pointer, localX, localY) => {
        if (localX > 1080 && localX < 1157 && localY > 36 && localY < 113) {
            shopbackground.setVisible(false);
        }
        

        if (localX > 864 && localX < 1061) {
            if (score >= 40) {
                score -= 40;
                scoreText.setText('Score: ' + score);
                speed += 0.5;
                showMessage("RYCHLOSSTTT");
            } else {
                showMessage("jsi chudej");
            }
        } else if (localX > 360 && localX < 557) {
            if (score >= 40) {
                score -= 40;
                scoreText.setText('Score: ' + score);
                jumpPower += 100;
                showMessage("SKOK +100");
            } else {
                showMessage("jsi chudej");
            }
        }
            
                
        
    });



    // pozadí //
    this.add.image(960, 540, "background").setScale(2.5, 2.5);
    // zem //

    ground = this.physics.add.staticGroup();
    
    pixelground = this.physics.add.staticGroup();
    for (let i = 0; i < 45; i+= 1) {
        pixelground.create(i * 60, 1050, "pixelgroud").setScale(2, 2).refreshBody();
    }
    for (let i = 0; i < 15; i++) {
        pixelground.create(i * 60 - -2500, 850, "pixelgroud").setScale(2, 2).refreshBody();
    }

    for (let i = 0; i < 15; i++) {
        pixelground.create(i * 60 - -3500, 650, "pixelgroud").setScale(2, 2).refreshBody();
    }

    // 
    this.anims.create({
        key: "enemywalk2",
        frames: this.anims.generateFrameNumbers("zombie2", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });




    // hráč //
    player = this.physics.add.sprite(100, 450, "playeridle");
    
    this.physics.add.collider(player, pixelground);
    player.setDepth(10);
    player.setScale(2);
    player.setPosition(300, 900);

    // Lucky box
    box = this.physics.add.staticImage(2000, 900, "luckybox").setScale(0.1).refreshBody();
    box.setDepth(10);
    this.physics.add.overlap(player, box, () => {
        box.disableBody(true, true);
        score += 50;
        scoreText.setText('Score: ' + score);
        this.coinSound = this.sound.add("coin", { volume: 0.1 });
        this.coinSound.play();
    });

    //enemy//
    
   

    enemy = this.physics.add.sprite(1500, 450, "enemy");
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(enemy, pixelground);
    enemy.setScale(3);
    enemy.setPosition(Math.floor(Math.random() * 500) + 750, 900);   
    enemy.setVelocityX(-50);
    enemy.anims.play("enemywalk", true);
   

    enemy1 = this.physics.add.sprite(1500, 450, "enemy");
    enemy1.setCollideWorldBounds(true);
    this.physics.add.collider(enemy1, pixelground);
    enemy1.setScale(3);
    enemy1.setPosition(Math.floor(Math.random() * 900) + 750, 900);   
    enemy1.setVelocityX(-50);
    enemy1.anims.play("enemywalk", true);

    enemy2 = this.physics.add.sprite(1500, 450, "enemy");
    enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(enemy2, pixelground);
    enemy2.setScale(3);
    enemy2.setPosition(Math.floor(Math.random() * 1200) + 750, 900);   
    enemy2.setVelocityX(-50);
    enemy2.anims.play("enemywalk", true);
    

    enemy3 = this.physics.add.sprite(1500, 450, "enemy");
    enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(enemy3, pixelground);
    enemy3.setScale(3);
    enemy3.setPosition(Math.floor(Math.random() * 1500) + 750, 900);   
    enemy3.setVelocityX(-50);
    enemy3.anims.play("enemywalk", true);

    enemy4 = this.physics.add.sprite(1500, 450, "zombie2");
    enemy4.setCollideWorldBounds(true);
    this.physics.add.collider(enemy4, pixelground);
    enemy4.setScale(3);
    enemy4.setPosition(Math.floor(Math.random() * 1800) + 750, 900);
    enemy4.setVelocityX(-50);
    enemy4.anims.play("enemywalk", true);




    

    


    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            enemydirection *= -1;
            enemy.setVelocityX(50 * enemydirection);
            enemy.flipX = enemydirection === 1;

        }
    });
    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            enemydirection *= -1;
            enemy1.setVelocityX(50 * enemydirection);
            enemy1.flipX = enemydirection === 1;
        }
    });
    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            enemydirection *= -1;
            enemy2.setVelocityX(50 * enemydirection);
            enemy2.flipX = enemydirection === 1;
        }
    });
    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            enemydirection *= -1;
            enemy3.setVelocityX(50 * enemydirection);
            enemy3.flipX = enemydirection === 1;
        }
    });


    //coin//
    
    
    
    

    

    //controls//
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(player, true, 0.1, 0.1);


    //hitbox//
    hitbox = this.add.rectangle(player.x, player.y, 50, 100, 0xff0000, 0.5);
    this.physics.add.existing(hitbox);
    hitbox.body.setAllowGravity(false);
    hitbox.body.setImmovable(true);

    this.physics.add.overlap(hitbox, enemy, () => {
        if (attacking) {
            enemy.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);
            counterzombie += 1;
            this.time.addEvent({
                delay: 2000,
                loop: false,
                callback: () => {
                    enemy.enableBody(true, Math.floor(Math.random() * 500) + 750, 900, true, true);
                }
            });
        }
    });
    this.physics.add.overlap(hitbox, enemy1, () => {
        if (attacking) {
            enemy1.disableBody(true, true);
            score += 10;
            counterzombie += 1;
            scoreText.setText('Score: ' + score);
            this.time.addEvent({
                delay: 2000,
                loop: false,
                callback: () => {
                    enemy1.enableBody(true, Math.floor(Math.random() * 900) + 750, 900, true, true);
                }
            });
        }
    });
    this.physics.add.overlap(hitbox, enemy2, () => {
        if (attacking) {
            enemy2.disableBody(true, true);
            score += 10;
            counterzombie += 1;
            scoreText.setText('Score: ' + score);
            this.time.addEvent({
                delay: 2000,
                loop: false,
                callback: () => {
                    enemy2.enableBody(true, Math.floor(Math.random() * 1200) + 750, 900, true, true);
                }
            });
        }
    });
    this.physics.add.overlap(hitbox, enemy3, () => {
        if (!attacking || enemy3hit) return;
        
        
        enemy3hit = true;
        enemysecondcounter += 1;
        
        if (enemysecondcounter >= 3) {
            enemy3.disableBody(true, true);
            enemysecondcounter = 0;
            score += 10;
            counterzombie += 1;
            scoreText.setText('Score: ' + score);
            
                
            
            this.time.delayedCall(2000, () => {
                enemy3.enableBody(true, Math.floor(Math.random() * 1500) + 750, 900, true, true);
                
            });
        }
    });



    //aniamce//
   

    this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("playeridle", { start: 0, end: 7 }),
        frameRate: 7,
        repeat: -1
    });
    this.anims.create({
        key: "attack",
        frames: this.anims.generateFrameNumbers("playerattack", { start: 0, end: 7 }),
        frameRate: 25,
        repeat: 0
    });
    this.anims.create({
        key: "enemywalk",
        frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "coinspin",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });


    //coin//
    

    
    coins = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i++) {
        const coin = coins.create(Math.floor(Math.random() * 1750) + 750, 900, "coin");
        coin.anims.play("coinspin", true);
        coin.setScale(4);
    }

    for (let i = 0; i < 5; i++) {
        const coin = coins.create(Math.floor(Math.random() * 2000) + 2500, 750, "coin");
        coin.anims.play("coinspin", true);
        coin.setScale(4);
    }

    this.physics.add.overlap(player, coins, (player, coin) => {
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
        this.coinSound = this.sound.add("coin", { volume: 0.1 });
        this.coinSound.play();
    });

    
    
}

function update() {
    


    hitbox.setPosition(player.x, player.y);
    if (attacking) {
        return;
    }

    if (cursors.space.isDown) {
        attacking = true;
        enemy3hit = false;
        this.meeleSound = this.sound.add("meele", { volume: 0.1 });
        this.meeleSound.play();
        
        
        player.anims.play("attack", true);
        player.once("animationcomplete", () => {
            attacking = false;
        });
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-speed * 100);
        player.anims.play("run", true);
        player.flipX = true;
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(speed * 100);
        player.anims.play("run", true);
        player.flipX = false;
    } else {
        player.setVelocityX(0);
        player.anims.play("idle", true);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        this.jumpSound = this.sound.add("jump", { volume: 0.1 });
        this.jumpSound.play();
        player.setVelocityY(-jumpPower);
    }

    if (player.y > 1080) {
        player.setPosition(300, 900);
        lives -= 1;
        livesText.setText('Lives: ' + lives);
    
    }
    
    

    
    

}

