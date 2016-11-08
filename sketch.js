function Bola(x,y){
    this.x = x;
    this.y = y;
}

Bola.prototype.desenha = function() {
    fill(255)
    this.mover(this.x + random(0,10), this.y + random(0,10));
    ellipse(this.x, this.y, 30, 30);
}

Bola.prototype.mover = function(a,b) {
    this.x = a;
    this.y = b;
}

Bola.prototype.arrastar = function() {
    if (mouseIsPressed) {
        if (mouseButton == LEFT && moduloVetor(this.x - mouseX, this.y - mouseY) < 30){
          this.mover(mouseX,mouseY);
        }
    } 
}

Bola.prototype.colisao = function(obj) {
    var x = this.x-obj.x;
    var y = this.y-obj.y;
    var dist = moduloVetor(x, y);
    if (dist < 30) {
        return true;
    }
    return false;
}

function moduloVetor(x,y) {
    return Math.sqrt(x**2 + y**2);
}

function addBola(x,y){
    var b = new Bola(x,y);
    listadebolas.push(b);
}

function keyTyped(){
  if (key === 'a') {
    addBola(random(0,400),random(0,400));
  }
}

var listadebolas = [];
var b1 = {};
var sai = {roda: true};

function perdeu() {
  textSize(32);
  text('loose!', 30, 30);
  sai = {roda: false, ganhou: false};
}

function ganhou() {
  textSize(32);
  text('win!', 10, 30);
  sai = {roda: false, ganhou: true};
}

function setup() {
  createCanvas(400,400);

  b1.x = 300;
  b1.y = 100;

  b1.mover = function(x,y) {
    this.x = x;
    this.y = y;
  }

  b1.desenha = function(x,y) {
    fill(255);
    ellipse(this.x, this.y, 30, 30);
  };

  b1.arrastar = function() {
    if (mouseIsPressed) {
        if (mouseButton == LEFT && moduloVetor(this.x - mouseX, this.y - mouseY) < 35) {
          this.mover(mouseX,mouseY);
        }
    } 
  };

  b1.ganhou = function(){
    if (this.x <= 50 && this.y >= 350) {
      return false;
    }
    else true;
  }
}

function draw() {

  if (sai.roda) {

    background(0);

    if (frameCount % 20 == 0) {
      addBola(random(0,20),random(0,100));
    }

    listadebolas.forEach(function(bola, index) {
        if(bola.colisao(b1)) {
          perdeu();
          console.log('colidiu');
        }
        bola.desenha();
    }, this); 

    b1.desenha();
    b1.arrastar();
    sai.roda = b1.ganhou();

  } else {

    if (sai.ganhou) {
      background('green');
      ganhou();
    } else {
      background('red');
      perdeu();  
    }

  }

};