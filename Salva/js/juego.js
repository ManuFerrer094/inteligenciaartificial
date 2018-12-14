
$(document).ready(function(){ //comprueba que el documento haya cargado al completo
	console.log("el documento ha cargado bien");
	inicio(); // llama a la función inicio
});

function inicio(){
	
	
	miposx = 225; // posicion x,y dle jugador
	miposy = 450;
	movimientopersonaje = ""; // se inicia la variable de la dirección de movimiento usada en movimientoJugador()

	balasmax = 0; // ponemos a 0 el contador de balas disparadas;
	balasmin = 0; //contador de balas dentro del terreno de juego

	balastiempo = 30; // contador de tiempo para el lanzamiento de balas
	
	balaenemigomax = 0; // ponemos a 0 el contador de balas disparadas;
	balaenemigomin = 0; //contador de balas dentro del terreno de juego

	balasenemigotiempo = 0; // contador de tiempo para el lanzamiento de balas
	
	enemigoposx[0] = 25;
	enemigoposx[1] = 75;
	enemigoposx[2] = 125;
	enemigoposx[3] = 175;
	enemigoposx[4] = 225;
	enemigoposx[5] = 275;
	
	enemigoposy = 25; // y común ya que se mueven en bloque
	enemigos = 1; // número de enemigos con los que se inicia el nivel 
	hasganado = enemigos; // contador para saber cuando se han eliminado a todos los enemigos
	
	enemigoposxold = enemigoposx[0];
	enemigoposyold = enemigoposy;
	movimientoenemigosold = movimientoenemigos;

	enemigovivo = new Array(); //almacena si el enemigo está vivo o no
	for(var i = 0;i<enemigos;i++){ //inicializa todos en true
		enemigovivo[i] = true;
	}
	movimientoenemigos = "derecha";  // se inicia la variable de la dirección de movimiento usada en movimientoEnemigo()
	
	gameOver = false;
	
	conjunto = 0;
	iteracion = 1;
	nIteraciones = 3000000;
	frameTime = 0;
	
	precision = 25; //Entrenado con 20
	incrementoyenemigo = 25;
	incrementoxenemigo = 3;
	rebota = false;

	tipoArranque = 0;	
	
	// Arranque de juego normal	
	if (tipoArranque == 0){		
	
		// Abre la BD para leer las posiciones 
		var db_name = 'trainingSetDB';
		var db_version = '1.0';
		var db_describe = 'BD trainingSetDB';
		var db_size = 10 * 1024 * 1024;
		db = openDatabase(db_name, db_version, db_describe, db_size, function(db) {        
			console.log("Database opened Successfully! Or created for the first time !");        
		});

		dibuja = true;	
		movimientopersonaje = "derecha";
		temporizador = setTimeout("bucle()", 1000);  // llama al bucle tras 1 segundo	
		controlesJugador();
	}	

	// IA con temporizador
	if (tipoArranque == 1){	
		// No se activan los listeners del jugador	
		movimientopersonaje = "derecha";	
		dibuja = true;	
		temporizador = setTimeout("bucleIATemporizador()", 1000);  // llama al bucle tras 1 segundo			
	}	
	
	// IA puro, no dibuja nada y funciona lo más rápido posible en una cantidad de iteraciones 	
	if (tipoArranque == 2){		
		movimientopersonaje = "derecha";
		// No se activan los listeners del jugador
		dibuja = false;	// De esta forma no dibuja absolutamente nada
		console.log("Proceso iniciado ");
		for (var i = 0; i < nIteraciones ; i++) {
			bucleIA();
		}
		console.log("Proceso terminado en " + trainingSet.length + " registros obtenidos");
		gameOver = true;	
		createDb();
	}
	

}

function bucle(){

	// Si llega al suelo vuelve a empezar
	if(enemigoposy >= miposy){	
		enemigoposy = 25;
	}
	
	// Comprueba si le ha dado una bala al jugador o si algún alien le ha tocado o si ha llegado al suelo
	//hasPerdido();
	
	// Hace que se mueva y dibuja el enemigo
	movimientoEnemigo();
	
	// Gestiona las balas del jugador moviéndolas y gestionando los array
	gestionBalas(); 	
		
	// Disparo de los enemigos		
	//balasAliens();
	
	// Comprueba si se ha matado a algún alien
	matarAlien(); 
	
	// Movimiento del jugador
	//movimientoJugador(); // función para dibjugar el movimiento del jugador dentro de los límites	
	movimientoIA();

	dispararIA(db); //  Mueve y lanza el bucle	
	
}

function lanzaBucle(){

	balastiempo++;; // aumenta el contador de tiempo para el próximo lanzamiento
	balasenemigotiempo++; // aumenta el contador de tiempo para el próximo lanzamiento
		
	iteracion++;	
	
	clearTimeout(temporizador); // limpia el temporizador			
	if (gameOver) {
		inicio();		
		gameOver = false;
	}
	temporizador = setTimeout("bucle()", frameTime); //pone un nuevo temporizador para crear el bucle 33ms=30fps;
}

function bucleIATemporizador(){

	// Comprueba si le ha dado una bala al jugador o si algún alien le ha tocado o si ha llegado al suelo
	//hasPerdido();
	
	// Si llega al suelo vuelve a empezar desde arriba
	if(enemigoposy >= miposy){	
		enemigoposy = 25;
	}


	// Hace que se mueva y dibuja el enemigo
	movimientoEnemigo();
	
	// Gestiona las balas del jugador moviéndolas y gestionando los array
	gestionBalas(); 	
		
	// Disparo de los enemigos		
	//balasAliens();
	
	// Comprueba si se ha matado a algún alien
	matarAlien(); 
	
	// Movimiento del jugador
	//movimientoJugador(); // función para dibjugar el movimiento del jugador dentro de los límites

	// Dispara balas de una en una y además mueve el jugador cuando la bala ha terminado
	dispararUnaBalaIA();	
	
	balastiempo++;; // aumenta el contador de tiempo para el próximo lanzamiento
	balasenemigotiempo++; // aumenta el contador de tiempo para el próximo lanzamiento
		
	iteracion++;
	
	if (iteracion > nIteraciones) {
		gameOver = true;
	}	
	
	clearTimeout(temporizador); // limpia el temporizador			
	if (gameOver) {		
		createDb();		
		console.log("Actualizando datos");
	} else {
		temporizador = setTimeout("bucleIATemporizador()", frameTime); //pone un nuevo temporizador para crear el bucle 33ms=30fps;
	}

	
}

function bucleIA(){

	// Comprueba si le ha dado una bala al jugador o si algún alien le ha tocado o si ha llegado al suelo
	//hasPerdido();

	// Si llega al suelo vuelve a empezar
	if(enemigoposy >= miposy){	
		enemigoposy = 25;
	}

	// Hace que se mueva y dibuja el enemigo
	movimientoEnemigo();
	
	// Gestiona las balas del jugador moviéndolas y gestionando los array
	gestionBalas(); 	
		
	// Disparo de los enemigos		
	//balasAliens();
	
	// Comprueba si se ha matado a algún alien
	matarAlien(); 
	
	// Movimiento del jugador
	//movimientoJugador(); // función para dibjugar el movimiento del jugador dentro de los límites
	
	// Dispara balas de una en una
	dispararUnaBalaIA();
	
	balastiempo++;; // aumenta el contador de tiempo para el próximo lanzamiento
	balasenemigotiempo++; // aumenta el contador de tiempo para el próximo lanzamiento
	
	iteracion++;	
	
}







