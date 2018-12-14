
$(document).ready(function(){ //comprueba que el documento haya cargado al completo
	console.log("el documento ha cargado bien");
	inicio(); // llama a la función inicio
});

function inicio(){
	temporizador = setTimeout("bucle()", 1000);  // llama al bucle tras 1 segundo
	
	controlesJugador();
}

function bucle(){
	hasFallado()
	hasPerdido();
	
	movimientoEnemigo();
	
	gestionBalas(); 
	
	//balasAliens();
	
	matarAlien();
	
 // detecta cuando un alien toca al jugador
	
	movimientoJugador() // función para dibjugar el movimiento del jugador dentro de los límites
	
	clearTimeout(temporizador); // limpia el temporizador
	temporizador = setTimeout("bucle()", 0); //pone un nuevo temporizador para crear el bucle 33ms=30fps;
	balastiempo++;; // aumenta el contador de tiempo para el próximo lanzamiento
	balasenemigotiempo++; // aumenta el contador de tiempo para el próximo lanzamiento
}