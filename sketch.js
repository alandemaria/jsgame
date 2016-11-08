;
function Camadas(lista) {
  this.lista = lista;
};

Camadas.prototype.desenha = function() {
  this.lista.forEach(function(camada) {
    camada.desenha();
  }, this);
};

function Camada(lista) {
  this.lista = lista;
};

Camada.prototype.desenha = function() {
  this.lista.forEach(function(estrela) {
    estrela.mover();
    estrela.desenha();
  }, this);
};  

function Estrela(px,py,depth) {
  this.px = px;
  this.py = py;
  this.depth = depth;
  return this;
};

Estrela.prototype.mover = function() {
  if (mouseX < 400 && mouseY < 400) {
    if (mouseX - pmouseX > 0) { //indo para a direita
        this.px = this.px - 5 / this.depth; //estrela vai para a esquerda
      } else if (mouseX - pmouseX < 0) { // indo para a esquerda
        this.px = this.px + 5 / this.depth; //estrela vai para a direita... ajustar o parametro 10
      }

      if (mouseY - pmouseY > 0) { //indo para a baixo
        this.py = this.py - 5 / this.depth; //estrela vai para a cima
      } else if (mouseY - pmouseY < 0) { // indo para a cima
        this.py = this.py + 5 / this.depth; //estrela vai para a baixo... ajustar o parametro 10
      }
  }
};

Estrela.prototype.desenha = function () {
  fill(255);
  ellipse(this.px, this.py, 3, 3);
};

function Bola(x,y){
    this.x = x;
    this.y = y;
    return this;
};

Bola.prototype.desenha = function(){
    fill(255)
    this.mover(this.x + random(0,10), this.y + random(0,10));
    ellipse(this.x, this.y, 30, 30);
};

Bola.prototype.mover = function(a,b){
    this.x = a;
    this.y = b;
};

Bola.prototype.arrastar = function(){
    if (mouseIsPressed) {
        if (mouseButton == LEFT && moduloVetor(this.x - mouseX, this.y - mouseY) < 30){
          this.mover(mouseX,mouseY);
        }
    } 
};

Bola.prototype.colisao = function(obj){
    var x = this.x-obj.x;
    var y = this.y-obj.y;
    var dist = moduloVetor(x, y);
    if (dist < 30) {
        return true;
    }
    return false;
};

function moduloVetor(x,y){
    return Math.sqrt(x**2 + y**2);
};

function addBola(x,y){
    var b = new Bola(x,y);
    listadebolas.push(b);
};

function insereBolaCanvas() {
  if (frameCount % 20 == 0) {
  //  addBola(10*random(0,20),10*random(0,20));
    addBola(random(20,0),random(20,0));
  //  addBola(random(20,80),random(20,80));
  };
};

function keyTyped(){
  if (key === 'a') {
    addBola(random(0,400),random(0,400));
  }
};

function perdeu(){
  textSize(32);
  text('loose!', 30, 30);
  sai.roda = false;
  sai.ganhou = false;
};

function win(){
  textSize(32);
  text('win!', 10, 30);
  sai.roda = false;
  sai.ganhou = true;
};

function montaBackground () {
  var lista_estrelas = [];
  var lista_camadas = [];
  for (var j = 1; j < 5; j++) {
      for (var i = 0; i < 100; i++) {
        var estrelinha = new Estrela(random(-600,600), random(-600,600), 3*j+1)
        lista_estrelas.push(estrelinha);
      }
      var cmd = new Camada(lista_estrelas);
      lista_camadas.push(cmd);
  }
  
  return lista_camadas;
}

function Sol(px, py) {
  this.px = px;
  this.py = py;
  return this;
}

Sol.prototype.desenha = function () {
  fill('yellow');
    if (mouseX < 400 && mouseY < 400) {
      if (mouseX - pmouseX > 0) { //indo para a direita
          this.px = this.px - 5 / 60; //estrela vai para a esquerda
        } else if (mouseX - pmouseX < 0) { // indo para a esquerda
          this.px = this.px + 5 / 60; //estrela vai para a direita... ajustar o parametro 10
        }

        if (mouseY - pmouseY > 0) { //indo para a baixo
          this.py = this.py - 5 / 60; //estrela vai para a cima
        } else if (mouseY - pmouseY < 0) { // indo para a cima
          this.py = this.py + 5 / 60; //estrela vai para a baixo... ajustar o parametro 10
        }
    }
    ellipse(this.px, this.py, 15, 15);
}

function Principal(px, py) {
  this.x = px;
  this.y = py;

  this.mover = function(x,y) {
    this.x = x;
    this.y = y;
  };

  this.desenha = function(x,y) {
    fill('blue');
    ellipse(this.x, this.y, 30, 30);
  };

  this.arrastar = function() {
    if (mouseIsPressed) {
        if (mouseButton == LEFT && moduloVetor(this.x - mouseX, this.y - mouseY) < 35) {
          this.mover(mouseX,mouseY);
        }
    } 
  };

  this.ganhou = function(){
    if (this.x <= 50 && this.x >= 0 && this.y >= 350 && this.y <= 400) {
      sai.roda = false;
    }
    else {
      sai.roda = true;
      sai.ganhou = true;
    }
  }
  return this; 
};

listadebolas = [];
sai = {roda: true};

//GAME CONFIG
function setup(){
  frameRate(120);
  createCanvas(400,400);
  sol = new Sol(350,80);
  b1 = new Principal(300, 100);
  backgr = new Camadas(montaBackground());
};

// GAME LOOP
function draw(){
  
  if (sai.roda) {

    background(0);
    text(frameRate(),350,380)
    backgr.desenha();
    sol.desenha();
    insereBolaCanvas()

    listadebolas.forEach(function(bola) {
        if(bola.colisao(b1)) {
          perdeu();
          console.log('colidiu');
        }
        bola.desenha();
    }, this); 

    b1.desenha();
    b1.arrastar();

    if (sai.roda) {
      b1.ganhou();
    }

  } else {

    if (sai.ganhou) {
      background('green');
      win();
    } else {
      background('red');
      perdeu();  
    }

  }

};