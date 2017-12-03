var skier;
var monster;
var crowd = [];
var tree = [];
var flags = [];
var playMode = true;

var Skiertest;
var flagCollision;

function preload() {
    myFont = loadFont('BIG JOHN.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    skier = new SkiMan();
    monster = new Monster();

    //tree
    for (var i = 0; i < 6; i++) {
        tree[i] = new GreenTree(random(100, 255), random(15, 30));
    }

    //crowd
    for (var i = 0; i < 10; i++) {
        crowd[i] = new OtherSkiers(4, random(10, 12));
    }

    //Flags
    for (var i = 0; i < 1; i++) {
        flags[i] = new Flag();
    }

    Skiertest =
        createSprite(0, 0, 60, 60);
    Skiertest.addAnimation("Graphic/Walk/Walk_1.png", "Graphic/Walk/Walk_2.png", "Graphic/Walk/Walk_3.png");
    Skiertest.maxSpeed = 5;

    flagCollision =
        createSprite(0, 0, 20, 20);
    flagCollision.shapeColor = color(0);
    flagCollision.maxSpeed = 3;

}

function draw() {
    background(255, 255, 255, 160);

    drawSprites();

    // Skiertest
    Skiertest.overlap(flagCollision, GetPoint);

    function GetPoint() {
        fill(255, 0, 0);
        ellipse(30, 30, 30, 30);
    }


    //skier
    if (playMode) {
        skier.show();
        skier.move();
        skier.nowayup();

        //tree
        if (frameCount > 50) {
            for (let i = 0; i < tree.length; i++) {
                tree[i].move();
                tree[i].show();
            }
        }

        //monster
        monster.move();
        monster.show();
        monster.eat();

        //crowd
        if (frameCount > 10) {
            for (let i = 0; i < crowd.length; i++) {
                crowd[i].move();
                crowd[i].show();
            }
        }

        //Flags
        for (let i = 0; i < flags.length; i++) {
            flags[i].show();
            flags[i].move();
            (flagCollision.position.x) = (flags[i].flagx);
            (flagCollision.position.y) = (flags[i].flagy);

            Skiertest.attractionPoint(20, flags[i].flagx, flags[i].flagy);

        }

    } else {
        //fail mode
    }



}

class Monster {
    constructor(skierx, skiery) {
        this.monsterx = 0;
        this.monstery = 0;
    }

    move() {

        if (skier.y > 100) {
            this.monsterx = skier.x + random(sin(8, 30));
            this.monstery = frameCount % skier.y + random(sin(8, 30));
        }


    }

    show() {
        textSize(25);
        textStyle(BOLD);
        textFont(myFont);
        fill(100, 100, 100);
        text("MONSTER", this.monsterx, this.monstery);

    }

    eat() {

        if (dist(this.monsterx, this.monstery, skier.x, skier.y) < 10) {
            SkierFail = true;
        }
    }




}

class GreenTree {
    constructor(Cr, Sz) {
        this.x = random(100, windowWidth - 100);
        this.y = windowHeight + (random(10, 500));
        this.Cr = Cr;
        this.size = Sz;
    }

    move() {
        this.x = this.x;
        this.y = this.y - 1;

        if (keyIsDown(RIGHT_ARROW)) {
            this.y += 0.2;
            this.x -= 1;
        }

        if (keyIsDown(LEFT_ARROW)) {
            this.y += 0.2;
            this.x += 1;
        }

        // Plant new trees
        if (this.y < 0) {
            this.y = windowHeight;
            this.x = random(100, windowWidth - 100);
        }
    }

    show() {
        textSize(this.size);
        textStyle(BOLD);
        textFont(myFont);
        fill(0, this.Cr, 30, 100);
        text("TREE", this.x, this.y);

    }
}

class SkiMan {
    constructor() {
        this.x = 100;
        this.y = 0;
    }


    show() {
        textSize(10);
        textStyle(BOLD);
        textFont(myFont);
        fill(255, 0, 0);
        text("SKIMAN", constrain(this.x, 0, windowWidth - 50), this.y);
        this.y += 1;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= random(6, 10);
            this.y += -1;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.x += random(6, 10);
            this.y += -1;
        }

    }

    nowayup() {
        push();
        if (keyIsDown(UP_ARROW)) {
            textSize(10);
            textStyle(ITALIC);
            fill(0);
            text("DOWN THE HILL!", this.x, this.y - 30);
        }
        pop();
    }


}

class OtherSkiers {
    constructor(speed, size) {
        this.x = random(100, windowWidth - 100);
        this.y = windowHeight + (random(10, 500));
        this.speed = speed;
        this.size = size;
    }

    move() {
        this.x += random(-3, 3);
        this.y = this.y - this.speed;

        if (keyIsDown(RIGHT_ARROW)) {
            this.y += 0.2;
            this.x -= 1;
        }

        if (keyIsDown(LEFT_ARROW)) {
            this.y += 0.2;
            this.x += 1;
        }

        // new crowd
        if (this.y < 0) {
            this.y = windowHeight;
            this.x = random(100, windowWidth - 100);
        }
    }

    show() {
        textSize(this.size);
        textStyle(BOLD);
        textFont(myFont);
        fill(0);
        text("CROWD", this.x, this.y);

    }


}

class Flag {
    constructor() {
        this.flagx = random(100, windowWidth - 100);
        this.flagy = windowHeight + (random(10, 500));
    }

    show() {
        textSize(30);
        textStyle(BOLD);
        textFont(myFont);
        fill(255, 0, 0);
        text("Flag", this.flagx, this.flagy);
    }

    move() {
        this.flagx = this.flagx;
        this.flagy = this.flagy - 3;

        if (this.flagy < 0) {
            this.flagy = windowHeight;
            this.flagx = random(100, windowWidth - 100);
        }
    }
}

function SkierFail() {
    background(0);

}
