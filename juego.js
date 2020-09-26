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

// Copia del tablero vacío para resetear partida
var tableroCopia = [
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

// RESETEA EL TABLERO LUEGO DE PERDER
function reseteaTablero() {
  console.log("resetea");

  for (py = 0; py < 21; py++) {
    for (px = 0; px < 12; px++) {
      tablero[py][px] = tableroCopia[py][px];
    }
  }
}

var pieza;

// plantilla del objeto pieza
var objPieza = function () {
  this.x = 0;
  this.y = 0;

  this.tipo = 1; // tipo de ficha --> 7 posibilidades (0-6)
  this.angulo = 0; // posición --> 4 posibilidades (0-3)

  // velocidad para la caída
  this.retraso = 50; // 50 ciclos por segundo
  this.fotograma = 0; // contador

  // Crear nueva pieza al azar y darle coordenadas
  this.nueva = function () {
    this.tipo = Math.floor(Math.random() * 7);
    this.y = 0;
    this.x = 4;
  };

  // COMPROBAR SI PIERDE LA PARTIDA
  this.compruebaSiPierde = function () {
    var pierde = false;

    for (px = 1; px < anchoTablero + 1; px++) {
      if (tablero[2][px] > 0) {
        pierde = true;
      }
    }
    return pierde;
  };

  this.limpia = function () {
    var filaCompleta;

    // Revisa todas las filas para encontrar si hay huecos (desde margen superior durante todo el alto)
    for (py = margenSuperior; py < altoTablero; py++) {
      filaCompleta = true; // Luego de comprobar cada fila vuelvo a ponerlo en true para que siga comprobando de a una fila y no borre todo junto

      // Recorre todas las columnas de la fila
      for (px = 1; px < anchoTablero + 1; px++) {
        if (tablero[py][px] == 0) {
          filaCompleta = false;
        }
      }

      if (filaCompleta == true) {
        for (px = 1; px < anchoTablero + 1; px++) {
          tablero[py][px] = 0;
        }
      }
    }
  };

  // CAER
  this.caer = function () {
    if (this.fotograma < this.retraso) {
      this.fotograma++;
    } else {
      if (this.colision(this.angulo, this.y + 1, this.x) == false) {
        this.y++;
      } else {
        this.fijar();
        this.limpia();
        this.nueva();

        if (this.compruebaSiPierde() == true) {
          reseteaTablero();
        }
      }
      this.fotograma = 0;
    }
  };

  this.fijar = function () {
    for (py = 0; py < 4; py++) {
      for (px = 0; px < 4; px++) {
        if (fichaGrafico[this.tipo][this.angulo][py][px] > 0) {
          tablero[this.y + py][this.x + px] =
            fichaGrafico[this.tipo][this.angulo][py][px];
        }
      }
    }
  };

  // COMPROBAR COLISIÓN
  // Antes de cada movimiento debe comprobar que en la matriz de la ficha (4x4) no haya nada que no sea un 0
  this.colision = function (anguloNuevo, yNueva, xNueva) {
    var resultado = false; // por defecto no hay colisión

    for (py = 0; py < 4; py++) {
      for (px = 0; px < 4; px++) {
        // si hay una ficha
        if (fichaGrafico[this.tipo][anguloNuevo][py][px] > 0) {
          // si hay algo sólido en el tablero
          if (tablero[yNueva + py][xNueva + px] > 0) {
            resultado = true; // hay colisión
          }
        }
      }
    }
    return resultado;
  };

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
            (this.x + px - 1) * anchoFicha, // quitar margen izquierdo
            (this.y + py - margenSuperior) * altoFicha, // quitar margenes superiores
            anchoFicha,
            altoFicha
          );
        }
      }
    }
  };

  // ROTAR pieza
  this.rotar = function () {
    // Se simula una rotación para comprobar si se puede rotar o colisiona
    var anguloNuevo = this.angulo;

    if (anguloNuevo < 3) {
      anguloNuevo++;
    } else {
      anguloNuevo = 0;
    }

    if (this.colision(anguloNuevo, this.y, this.x) == false) {
      this.angulo = anguloNuevo;
    }
    console.log("rotar");
  };

  this.abajo = function () {
    // Antes de mover, simula el movimiento para comprobar si colisiona
    if (this.colision(this.angulo, this.y + 1, this.x) == false) {
      this.y++;
      console.log("abajo");
    }
  };

  this.derecha = function () {
    // Antes de mover, simula el movimiento para comprobar si colisiona
    if (this.colision(this.angulo, this.y, this.x + 1) == false) {
      this.x++;
      console.log("derecha");
    }
  };

  this.izquierda = function () {
    // Antes de mover, simula el movimiento para comprobar si colisiona
    if (this.colision(this.angulo, this.y, this.x - 1) == false) {
      this.x--;
      console.log("izq");
    }
  };

  // se crea una nueva pieza antes de dibujar
  this.nueva();
};

// DIBUJAR TABLERO
function dibujaTablero() {
  // No empieza en 0 sino en 4, para ocultar nuevas fichas
  for (py = margenSuperior; py < altoTablero; py++) {
    // Empieza en 1 para ocultar margen izquierdo y +1 para margen derecho
    for (px = 1; px < anchoTablero + 1; px++) {
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
  pieza.caer();
  pieza.dibuja();
}
