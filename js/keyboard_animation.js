// const keyNames = {
//     18: "alt",
//     13: "enter",
//     16: "shift",
//     32: "space",
//     37: "left",
//     38: "up",
//     39: "right",
//     40: "down"
// };

// $("body").keydown((e) => {
//     console.log(keyNames[e.keyCode]);
// });

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;


let circle = function(x, y, size, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

const Ball = function () {
    this.x = width/2;
    this.y = height/2;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.speed = 5;
    this.size = 10;
};

Ball.prototype.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x < 0) {
        // this.x = -this.xSpeed;
        this.setDirection("right");
    } else if (this.x > width) {
        // this.x = this.xSpeed;
        this.setDirection("left");
    }
    if (this.y < 0) {
        // this.y = height;
        this.setDirection("down")
    } else if (this.y > height) {
        // this.y = 0;
        this.setDirection("up");
    }
};

Ball.prototype.draw = function () {
    circle(this.x, this.y, this.size, true);
};

Ball.prototype.setDirection = function (actionBtn) {
    if (actionBtn === "up") {
        this.xSpeed = 0;
        this.ySpeed = -this.speed;
        console.log("up");
    }else if (actionBtn === "down") {
        this.xSpeed = 0;
        this.ySpeed = this.speed;
        console.log("down");
    }else if (actionBtn === "left") {
        this.xSpeed = -this.speed;
        this.ySpeed = 0;
        console.log("left");
    }else if (actionBtn === "right") {
        this.xSpeed = this.speed;
        this.ySpeed = 0;
        console.log("right");
    }else if (actionBtn === "stop") {
        this.xSpeed = 0;
        this.ySpeed = 0;
        console.log("stop");
    }else if (this.speed > 0 && actionBtn === "z") {
        this.speed -= 1;
    }else if (actionBtn === "x") {
        this.speed += 1;
    }else if (this.size > 0 && actionBtn === "c") {
        this.size -= 1;
    }else if (actionBtn === "v") {
        this.size += 1;
    }
};

Ball.prototype.setSpeed = function (speedBtn) {
    if (speedBtn !== undefined) {
        this.speed = speedBtn;
    }
};

let ball = new Ball();

const keyActions = {
    32: "stop",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    90: "z",
    88: "x",
    67: "c",
    86: "v"
};

const speeds = {
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
};


$("body").keydown((event) => {
    let actionBtn = keyActions[event.keyCode];
    let speedBtn = speeds[event.keyCode];

    ball.setDirection(actionBtn);
    ball.setSpeed(speedBtn);
    
    
    console.log(event.keyCode);
});

setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    
    ball.draw();
    ball.move();
    
    ctx.strokeRect(0, 0, width, height);
}, 30);
