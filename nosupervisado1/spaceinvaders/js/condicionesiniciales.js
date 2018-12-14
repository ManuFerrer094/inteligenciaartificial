var superacierto = 0;

// SQL para navegador
    var db_name = 'ai';
    var db_version = '';
    var db_describe = 'Esto es una prueba';
    var db_size = 2048;
var db


function createDb() {

    db = openDatabase(db_name, db_version, db_describe, db_size, function(db) {
        //console.log("Database opened Successfully! Or created for the first time !");
        createTable(db);
    });
	
}
function createTable(db) {
    db.transaction(function(tx) {
        tx.executeSql('create table intentos(id int primary key , miposx text, botx text, boty text,direccion text, acierto int)', [], function(transaction, result) {
            //console.log(result);
            //console.log('Table created Successfully!');
            //insertRecords(db);
        }, function(transaction, error) {
            //console.log(error);
        });
    }, transError, transSuccess);
}
function transError(t, e) {
    console.log(t);
    console.log(e);
    console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
}

function transSuccess(t, r) {
    console.info("Transaction completed Successfully!");
    console.log(t);
    console.log(r);
}
function insertRecords(db) {
	//console.log("estoy intentando escribir")
    if (db) {
       
        db.transaction(function(tx) {
            //console.log("La direccion del enemigo es: "+movimientoenemigos)
            tx.executeSql('insert into intentos(miposx,botx,boty,direccion,acierto) values(?,?,?,?,?)', [Math.round(miposx),enemigoposx[0],enemigoposy,movimientoenemigos,superacierto], function(transaction, result) {
                //console.log(result.insertId);
            }, function(transaction, error) {
                //console.log(error);
            });
        }, transError, transSuccess);
    } else {
       // console.log('No Database man! wait creating it for you!');
        createDb();
    }
	
}
createDb()

var trainingset = new Array();
for(var  i = 0;i<1000;i++){
	trainingset[i] = new Array();	// Posx del jugador
}

var numintento = 0;

var temporizador; // se declara la variable del temporizador

// posicion del jugador 
var miposx = 0; // posicion x,y dle jugador
var miposy = 450;
var movimientopersonaje = ""; // se inicia la variable de la direcci�n de movimiento usada en movimientoJugador()

//balas

var balaposx = new Array(); //declaramos los array de las posiciones de las balas
var balaposy = new Array();
var balasmax = 0; // ponemos a 0 el contador de balas disparadas;
var balasmin = 0; //contador de balas dentro del terreno de juego

var balaviva = new Array(); // variable bool para activar las balas

var balastiempo = 30; // contador de tiempo para el lanzamiento de balas

// balas enemigos

var balaenemigoposx = new Array(); //declaramos los array de las posiciones de las balas
var balaenemigoposy = new Array();
var balaenemigomax = 0; // ponemos a 0 el contador de balas disparadas;
var balaenemigomin = 0; //contador de balas dentro del terreno de juego

var balaenemigoviva = new Array(); // variable bool para activar las balas
var balasenemigotiempo = 0; // contador de tiempo para el lanzamiento de balas

// enemigos

 
var enemigoposx = new Array(); // almacenan la posici�n x ,y de cada uno de los enemigos
enemigoposx[0] = 25;
enemigoposx[1] = 75;
enemigoposx[2] = 125;
enemigoposx[3] = 175;
enemigoposx[4] = 225;
enemigoposx[5] = 275;

var enemigoposy = 125; // y com�n ya que se mueven en bloque
var enemigos = 0; // n�mero de enemigos con los que se inicia el nivel 
var hasganado = (enemigos+1); // contador para saber cuando se han eliminado a todos los enemigos

var enemigovivo = new Array(); //almacena si el enemigo est� vivo o no
for(var i = 0;i<=enemigos;i++){ //inicializa todos en true
	enemigovivo[i] = true;
}
var movimientoenemigos = "derecha";  // se inicia la variable de la direcci�n de movimiento usada en movimientoEnemigo()
