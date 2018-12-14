
$(document).ready(function(){ //comprueba que el documento haya cargado al completo
	console.log("el documento ha cargado bien");
	inicio(); // llama a la función inicio
});

function inicio(){
	temporizador = setTimeout("bucle()", 1000);  // llama al bucle tras 1 segundo
	
	controlesJugador();
}

function bucle(){
	/*hasFallado()
	hasPerdido();*/
	if(miposx > 340){midireccion = "izquierda";miposx = 320;}
	if(miposx < 40){midireccion = "derecha";miposx = 60;}
	if(midireccion == "derecha"){miposx++;}
	if(midireccion == "izquierda"){miposx--;}
	console.log(midireccion)
	movimientoEnemigo();
	// Pregunto si es cierto el acierto
	gestionBalas(); 
	
	//balasAliens();
	
	matarAlien();
	
	// Vamos a ver si es cierto que debo disparar
	disparas = false;
	
	
	
	db.transaction(function (tx) {
		//console.log("SELECT * FROM intentos WHERE miposx = '"+miposx+".0' AND botx = '"+enemigoposx[0]+".0' AND direccion = '"+movimientoenemigos+"'")
				tx.executeSql("SELECT * FROM intentos WHERE miposx = '"+miposx+".0' AND botx = '"+enemigoposx[0]+".0' AND direccion = '"+movimientoenemigos+"'", [], function(tx, results) {
					console.log(results.rows.length)
					
					//if(results.rows.length > 0) {
						console.log("aqui entras")
						disparas = true;
						console.log("disparas:"+disparas)
					//}
				});
			});
	
	if(disparas == true){
		
		balaposx[balasmax] = miposx+22; // coge las coordenadas iniciales de la bala
			balaposy[balasmax] = miposy;
			balaviva[balasmax] = true; // activa la bala
			balasmax++; //aumenta el contador de balas totales
			balastiempo = 0; // reinicia el contador de tiempo apra el pr�ximo disparo
	}

	
	
 // detecta cuando un alien toca al jugador
	
	movimientoJugador() // función para dibjugar el movimiento del jugador dentro de los límites
	
	clearTimeout(temporizador); // limpia el temporizador
	temporizador = setTimeout("bucle()", 33); //pone un nuevo temporizador para crear el bucle 33ms=30fps;
	balastiempo++;; // aumenta el contador de tiempo para el próximo lanzamiento
	balasenemigotiempo++; // aumenta el contador de tiempo para el próximo lanzamiento
}