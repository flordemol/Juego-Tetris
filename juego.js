var canvas; // lienzo
var ctx; // contexto de dibujo en el lienzo
var FPS = 50; // fotograma por segundo

// Medidas del canvas
var anchoCanvas = 400;
var altoCanvas = 640;

// Medidas reales del tablero
var anchoTablero = 10;
var altoTablero = 20;

// filas superiores donde aparecerá la nueva pieza, pero permanecerán ocultas en el dibujo del tablero (también habrá margen lateral de 1)
var margenSuperior = 4;

// Medidas en px de cada recuadro
var anchoFicha = 40;
var altoFicha = 40;

// Dimensiones reales del tablero: 12 x 21
// Se verá en pantalla: 10 x 20
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
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// COLORES
var rojo = "#FF0000";
var morado = "#800080";
var naranja = "#FF8C00";
var amarillo = "#FFD700";
var verde = "#008000";
var cyan = "#00CED1";
var azul = "#0000CD";

//DIBUJO DE LAS PIEZAS (Matriz de 4 dimensiones)
// fichaGrafico [Pieza] [Posición/rotación] [y] [x]
var fichaGrafico = [
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],

    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 0, 3, 3],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 3, 0],
      [0, 0, 3, 3],
      [0, 0, 0, 3],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 0, 4, 4],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 5, 5, 5],
      [0, 5, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 5],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 0, 5],
      [0, 5, 5, 5],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 6],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 6],
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 6, 0, 0],
      [0, 6, 6, 6],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 6, 0],
      [0, 0, 6, 0],
      [0, 6, 6, 0],
      [0, 0, 0, 0],
    ],
  ],

  [
    [
      [0, 0, 0, 0],
      [0, 7, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 0, 7, 7],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 7],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0],
    ],
  ],
];

var pieza;

// plantilla del objeto pieza
var objPieza = function () {
  this.x = 1;
  this.y = 1;

  this.tipo = 1; // tipo de ficha --> 7 posibilidades (0-6)
  this.angulo = 0; // posición --> 4 posibilidades (0-3)

  // Dibujamos la pieza en pantalla (matriz 4x4)
  this.dibuja = function () {
    for (py = 0; py < 4; py++) {
      for (px = 0; px < 4; px++) {
        if (fichaGrafico[this.tipo][this.angulo][py][px] != 0) {
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 1)
            ctx.fillStyle = rojo;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 2)
            ctx.fillStyle = naranja;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 3)
            ctx.fillStyle = amarillo;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 4)
            ctx.fillStyle = verde;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 5)
            ctx.fillStyle = cyan;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 6)
            ctx.fillStyle = azul;
          if (fichaGrafico[this.tipo][this.angulo][py][px] == 7)
            ctx.fillStyle = morado;

          ctx.fillRect(
            (this.x + px) * anchoFicha,
            (this.y + py) * altoFicha,
            anchoFicha,
            altoFicha
          );
        }
      }
    }
  };

  this.rotar = function () {
    console.log("rotar");
  };

  this.abajo = function () {
    console.log("abajo");
  };

  this.derecha = function () {
    console.log("derecha");
  };

  this.izquierda = function () {
    console.log("izq");
  };
};

// DIBUJAR TABLERO
function dibujaTablero() {
  // No empieza en 0 sino en 4, para ocultar nuevas fichas
  for (py = margenSuperior; py < altoTablero; py++) {
    // Empieza en 1 para ocultar margen izquierdo
    for (px = 1; px < anchoTablero; px++) {
      if (tablero[py][px] != 0) {
        if (tablero[py][px] == 1) ctx.fillStyle = rojo;

        if (tablero[py][px] == 2) ctx.fillStyle = naranja;

        if (tablero[py][px] == 3) ctx.fillStyle = amarillo;

        if (tablero[py][px] == 4) ctx.fillStyle = verde;

        if (tablero[py][px] == 5) ctx.fillStyle = cyan;

        if (tablero[py][px] == 6) ctx.fillStyle = azul;

        if (tablero[py][px] == 7) ctx.fillStyle = morado;

        ctx.fillRect(
          (px - 1) * anchoFicha, // no tener en cuenta margen izquierdo para inicio del dibujo
          (py - margenSuperior) * altoFicha, // no tener en cuenta margen superior para inicio del dibujo
          anchoFicha,
          altoFicha
        );
      }
    }
  }
}

// Leer el teclado
function inicializaTeclado() {
  document.addEventListener("keydown", function (tecla) {
    if (tecla.keyCode == 38) {
      pieza.rotar();
    }

    if (tecla.keyCode == 40) {
      pieza.abajo();
    }

    if (tecla.keyCode == 37) {
      pieza.izquierda();
    }

    if (tecla.keyCode == 39) {
      pieza.derecha();
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
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;
}

function principal() {
  borraCanvas();
  dibujaTablero();
  pieza.dibuja();
}
