var temporizador; // se declara la variable del temporizador

// posicion del jugador 
var miposx; // posicion x,y dle jugador
var miposy;
var movimientopersonaje; // se inicia la variable de la dirección de movimiento usada en movimientoJugador()

//balas

var balaposx = new Array(); //declaramos los array de las posiciones de las balas
var balaposy = new Array();
var balasmax; // ponemos a 0 el contador de balas disparadas;
var balasmin; //contador de balas dentro del terreno de juego

var balaviva = new Array(); // variable bool para activar las balas

var balastiempo; // contador de tiempo para el lanzamiento de balas

// balas enemigos

var balaenemigoposx = new Array(); //declaramos los array de las posiciones de las balas
var balaenemigoposy = new Array();
var balaenemigomax; // ponemos a 0 el contador de balas disparadas;
var balaenemigomin; //contador de balas dentro del terreno de juego

var balaenemigoviva = new Array(); // variable bool para activar las balas
var balasenemigotiempo; // contador de tiempo para el lanzamiento de balas

// enemigos

var enemigoposx = new Array(); // almacenan la posición x ,y de cada uno de los enemigos
var enemigoposy; // y común ya que se mueven en bloque
var enemigos; // número de enemigos con los que se inicia el nivel 
var hasganado; // contador para saber cuando se han eliminado a todos los enemigos
var gameOver;

var enemigovivo = new Array(); //almacena si el enemigo está vivo o no
var movimientoenemigos;  // se inicia la variable de la dirección de movimiento usada en movimientoEnemigo()

// IA
var trainingSet = new Array();
var dibuja = true;


var iteracion;
var nIteraciones;
var conjunto;

var tipoArranque;
var precision;
var incrementoyenemigo;
var rebota;

var db;



