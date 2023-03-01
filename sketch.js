// variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 6;
let raqueteAltura = 90;

//variáveis raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;
let chanceDeErrar = 0;

//placar do jogo
let meuspontos = 0;
let pontosoponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  bolinha ();
  raquete ();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  colisaoraquete ();
  colisaoraqueteOponente (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar ();
  marcaPonto();
  calculaChanceDeErrar ();
  
  
}

function bolinha (){
  
  //mostrar bolinha
  circle (xBolinha,yBolinha,diametro) ;
  
  
  //movimentar bolinha
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
  
  
  //verificar se pega na borda
  if ( xBolinha+raio > width || xBolinha-raio <0 ) {
    velocidadexBolinha *= -1;
  } 
  if ( yBolinha+raio > height || yBolinha-raio <0 ) {
    velocidadeyBolinha *= -1;
  }
  
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}
  
function raquete () {
  //movimentar raquete
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
}


function colisaoraquete () {
  // bolinha bater na raquete
  if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadexBolinha *= -1;
          raquetada.play();
    }
}

function colisaoraqueteOponente(x,y){
  if(xBolinha + raio > x + raqueteComprimento
     && yBolinha + raio < y + raqueteAltura
     && yBolinha - raio > y){
    velocidadexBolinha *= -1;
      raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 45;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);   
  fill(color(255, 140, 0)); 
  rect(150, 10, 40, 20);
  fill(255);
  text(meuspontos, 170, 26); 
  fill(color(255, 140, 0));
  rect(450,10, 40, 20)
  fill(255);
  text(pontosoponente, 470, 26); 
} 

function marcaPonto(){
  if (xBolinha > 590){
    meuspontos += 1; // Soma um ponto para mim
  }
  if (xBolinha < 10){
    pontosoponente += 1; // Soma um ponto para o adversário
    ponto.play()
  }
}

let ChanceDeErrar = 0;

function calculaChanceDeErrar() {
  if (pontosoponente >= meuspontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


  
  
