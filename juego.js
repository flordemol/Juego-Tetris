var canvas; // lienzo
var ctx; // contexto de dibujo en el lienzo
var FPS = 50; // fotograma por segundo

// Medidas del canvas
var anchoCanvas = "400px";
var altoCanvas = "640px";

// Medidas reales del tablero
var anchoTablero = 10;
var altoTablero = 16;

// Medidas en px de cada recuadro
var anchoFicha = 40;
var altoFicha = 40;

// Dimensiones reales del tablero: 12 x 17
// Se verá en pantalla: 10 x 16
var tablero = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var pieza;

// plantilla del objeto pieza
var objPieza = function () {
  this.x = 0;
  this.y = 0;
};

// Leer el teclado
function inicializaTeclado() {
  document.addEventListener("keydown", function (tecla) {
    if (tecla.keyCode == 38) {
      console.log("arriba");
    }

    if (tecla.keyCode == 40) {
      console.log("abajo");
    }

    if (tecla.keyCode == 37) {
      console.log("izq");
    }

    if (tecla.keyCode == 39) {
      console.log("derecha");
    }
  });
}

function inicializa() {
  canvas = document.getElementById("canvas"); // acceder al canvas
  ctx = canvas.getContext("2d"); // definir contexto

  // definir tamaño del canvas
  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;

  // creamos el objeto pieza
  pieza = new objPieza();

  // definir lectura de teclado
  inicializaTeclado();

  // Llamado a función principal y defino intervalo de ejecución
  setInterval(function () {
    principal();
  }, 1000 / FPS);
}

function borraCanvas() {
  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;
}

function principal() {
  borraCanvas();
}
