function controlesJugador(){
	$(document).keydown(function(){ //cuando pulsamos una tecla...
		if(event.which == 38 && balastiempo>=30){ // cuando se pulsa dirección arriba y han pasado 30 bucles(1seg en 30 fps)
			balaposx[balasmax] = miposx+22; // coge las coordenadas iniciales de la bala
			balaposy[balasmax] = miposy;
			balaviva[balasmax] = true; // activa la bala
			balasmax++; //aumenta el contador de balas totales
			balastiempo = 0; // reinicia el contador de tiempo apra el próximo disparo
		}
		if(event.which == 37){movimientopersonaje = "izquierda"} // dirección movimiento izquierda
		if(event.which == 39){movimientopersonaje = "derecha"} // dirección movimiento derecha
	});
	
	$(document).keyup(function(){ // cuando se suelta el botón para el movimiento 
		if(event.which == 37){movimientopersonaje = 0;}
		if(event.which == 39){movimientopersonaje = 0;}
	})
}

function movimientoJugador(){
	if(movimientopersonaje == "derecha"){miposx+=3;} //mueve al jugador en la direccion pulsada
	if(movimientopersonaje == "izquierda"){miposx-=3;}
	if(miposx>440)miposx=440; //comprueba que le jugador no salga de los límites del contenedor
	if(miposx<10)miposx=10;
	if (dibuja) $("#jugador img").css("left", miposx+"px"); // dibuja la img de jugador
}

function gestionBalas(){
	//Gestión balas:
	if (dibuja) $("#balas").html(""); // limpia el .html
	for(var i = balasmin; i < balasmax ; i++){ //blucle para pasar por todas las balas creadas	
		balaposy[i]-=3; //mueve la bala en 3px
		if(balaposy[i]>0){ //dibuja solo las balas solo si están dentro del contenedor			
			if(balaviva[i]){ // si la bala estña viva dibuja el movimiento por css 
				if (dibuja) $("#balas").append('<div class="bala" style=left:'+balaposx[i]+'px;top:'+balaposy[i]+'px;></div>'); 
			}
		}else{
			if(balaviva[i]) {
				IAInsertar(0);
			}
			balasmin++; // si no entra dentro del contenedor, no se vuelve a intentar dibujar ya que su posición será menor a 0			
		}
	}
}

//
function dispararUnaBalaIA(){	
	//
	if (balasmax - balasmin <= 0){ // Sólo dispara de 1 en 1
		balaposx[balasmax] = miposx + 22; // coge las coordenadas iniciales de la bala
		balaposy[balasmax] = miposy;
		balaviva[balasmax] = true; // activa la bala
		balasmax++; //aumenta el contador de balas totales
		balastiempo = 0; // reinicia el contador de tiempo apra el próximo disparo		
		
		// Se mueve y no lo vuelve a hacer hasta que no se dispara otra vez. De esta forma se espera a moverse 
		movimientoIA(); 
		// Se guarda la posición del enemigo y la mía aunque en principio no hace falta
		enemigoposxold = enemigoposx[0];
		enemigoposyold = enemigoposy;
		movimientoenemigosold = movimientoenemigos;

	}
}

function disparar(){
	
	if(balastiempo >= 30){ // cuando se pulsa dirección arriba y han pasado 30 bucles(1seg en 30 fps)		
		balaposx[balasmax] = miposx+22; // coge las coordenadas iniciales de la bala
		balaposy[balasmax] = miposy;
		balaviva[balasmax] = true; // activa la bala
		balasmax++; //aumenta el contador de balas totales
		balastiempo = 0; // reinicia el contador de tiempo apra el próximo disparo
	}
}

function movimientoIA(){
	//miposx = 243;

	
	if(movimientopersonaje == "derecha"){
		miposx += 1;
	}
	if(movimientopersonaje == "izquierda"){
		miposx -= 1;
	}	
	if(miposx > 440){
		miposx = 440;
		movimientopersonaje = "izquierda";		
	}
	if(miposx < 10){
		miposx=10;
		movimientopersonaje= "derecha";
	}
	
	if (dibuja) $("#jugador img").css("left", miposx+"px"); // dibuja la img de jugador	
	
}




function balasAliens(){
	if(balasenemigotiempo==35){
		var random = Math.floor(Math.random()*(enemigos+1)); // selecciona un enemigo al azar		
		balasenemigotiempo=0; // reinicia el contador de tiempo para las balas
		if(enemigovivo[random]){
			balaenemigoviva[balaenemigomax]	 = true; // activa al bala
			balaenemigoposx[balaenemigomax] = enemigoposx[random]; // coge las posx y posy del enemigo del que saldrá la bala
			balaenemigoposy[balaenemigomax] = (enemigoposy+50);
			// console.log("La bala número "+balaenemigomax+" tiene la posX "+balaenemigoposx[0]+" y la posY "+balaenemigoposy[0]+"/ X:"+enemigoposx[random]+"Y:"+enemigoposy)
			balaenemigomax++; //aumenta en uno el contador de balas 
		}			
	}
	for(var i = balaenemigomin; i < balaenemigomax ; i++){
		balaenemigoposy[i] +=3; //mueve la bala en 3px
		if(balaenemigoposy[i]<470){ //dibuja solo las balas solo si están dentro del contenedor
			// console.log(balaenemigoviva);
			if(balaenemigoviva[i]){
				if (dibuja) $("#balas").append('<div class="balaenemigo" style=left:'+balaenemigoposx[i]+'px;top:'+balaenemigoposy[i]+'px;></div>'); //dibuja el movimiento de las balas por css 
			}else{				
				balasmin++; // si no entra dentro del contenedor, no se vuelve a intentar dibujar ya que su posición será menor a 0
			}
		}
	}
}

function movimientoEnemigo(){
	if (dibuja) $("#enemigos").html(""); // limpia el html
	
	if(enemigoposx[0]<=10){		// comprueba que no se salgan por la izquierda
		movimientoenemigos = "derecha";//si lo hacen cambia direccion
		enemigoposy += incrementoyenemigo; //mueve los aliens una linea hacia abajo
	}
	if(enemigoposx[enemigos-1]>=440){ // comprueba que no se salgan por la derecha
		movimientoenemigos = "izquierda";//si lo hacen cambia direccion
		enemigoposy += incrementoyenemigo; //mueve los aliens una linea hacia abajo
	}
	if(movimientoenemigos == "derecha"){ // mueve todos los aliens a la derecha
		for(var i = 0;i < enemigos;i++){
			enemigoposx[i]+=incrementoxenemigo;
		}
	}
	if(movimientoenemigos == "izquierda"){ // mueve todos los aliens a la izquierda
		for(var i = 0;i < enemigos;i++){
			enemigoposx[i]-=incrementoxenemigo;
		}
	}
	

	if ((enemigoposy < 25) && rebota) {
		enemigoposy = 25;
		incrementoyenemigo = - incrementoyenemigo;
	}


	// He intentado hacerlo de varias maneras, estas son las dos últimas:
	for(var i = 0; i < enemigos;i++){
		if(enemigovivo[i]){
			if (dibuja) $("#enemigos").append('<img class="imgenemigo" src="img/enemigo.png" style="top:'+enemigoposy+'px;left:'+enemigoposx[i]+'px;">');
		}
	}	
}

function hasPerdido(){ // detecta cuando un alien toca al jugador
	for(var i = 0;i < enemigos;i++){ //si estás a menos de 25px pierdes.
		if(enemigovivo[i]){
			if(enemigoposy >= miposy){ // si el enemigo tiwene una posY mayor a la mia, muero
				for(var i = 0; i < enemigos;i++){
					enemigovivo[i] = false;
				}
				console.log("Has perdido: los enemigos nos han invadido");
				gameOver = true;
				
			}
			if(Math.abs(enemigoposx[i]-(miposx+25)) < 25 && Math.abs(enemigoposy-miposy) < 25){
				for(var i = 0;i<enemigos;i++){ // si el enemigo choca conmigo muero
					enemigovivo[i] = false;
				}
				console.log("Has perdido: han chocado contigo");
				gameOver = true;
				
			}
		}
	}
	for(var i = balaenemigomin;i<balaenemigomax;i++){ //si la bala disparada por el enemigo choca conmigo, muero
		if(Math.abs((balaenemigoposx[i]+2)-(miposx+22))<25 && Math.abs((miposy+22)-(balaenemigoposy[i]+10))<25){
			if(balaenemigoviva[i]){ //si la bala está viva muero
				console.log("Has perdido: te han disparado");
				gameOver = true;
			}else{ 
				console.log("Error");
			}
		}
	}
}



function matarAlien(){
	for(var i = balasmin; i < balasmax; i++){ // recorre todas las balas disparadas por mi que está aún activas
		for(var x = 0;x<enemigos;x++){ // recorre todos los enemigos
			if(Math.abs(balaposx[i]-(enemigoposx[x]+22)) < precision && Math.abs((enemigoposy+22)-balaposy[i]) < precision){
				if(enemigovivo[x] && balaviva[i]){ // si la bala choca con un enemigo y ambos están aún vivos/activos...
					//console.log("Has matado al alien: " + (x + 1));
					// IA se contabiliza el acierto pero no muere el alien
					//enemigovivo[x] = false; //muere el enemigo
					balaviva[i] = false; // muere la bala
					//hasganado--; // resta uno al contador para saber si están todos muertos
					//if(hasganado==0){
						//console.log("Has ganado"); // si todos han muerto he ganado
						// IA
						//gameOver = true;
					//}					
					IAInsertar(1);
					if ((incrementoyenemigo > 0) && rebota){
						incrementoyenemigo = - incrementoyenemigo;
					}
				}else{
					//console.log("El enemigo ya estaba muerto");
				}
			}
		}
		
	}
}
