function controlesJugador(){
	$(document).keydown(function(){ //cuando pulsamos una tecla...
		if(event.which == 38 && balastiempo>=30){ // cuando se polsa direcci�n arriba y han pasado 30 bucles(1seg en 30 fps)
			balaposx[balasmax] = miposx+22; // coge las coordenadas iniciales de la bala
			balaposy[balasmax] = miposy;
			balaviva[balasmax] = true; // activa la bala
			balasmax++; //aumenta el contador de balas totales
			balastiempo = 0; // reinicia el contador de tiempo apra el pr�ximo disparo
		}
		if(event.which == 37){movimientopersonaje = "izquierda"} // direcci�n movimiento izquierda
		if(event.which == 39){movimientopersonaje = "derecha"} // direcci�n movimiento derecha
	});
	
	$(document).keyup(function(){ // cuando se suelta el bot�n para el movimiento 
		if(event.which == 37){movimientopersonaje = 0;}
		if(event.which == 39){movimientopersonaje = 0;}
	})
}

function movimientoJugador(){
	if(movimientopersonaje == "derecha"){miposx+=3;} //mueve al jugador en la direccion pulsada
	if(movimientopersonaje == "izquierda"){miposx-=3;}
	if(miposx>440)miposx=440; //comprueba que le jugador no salga de los l�mites del contenedor
	if(miposx<10)miposx=10;
	$("#jugador img").css("left", miposx+"px"); // dibuja la img de jugador
}

function gestionBalas(){
		//Gesti�n balas:
	$("#balas").html(""); // limpia el .html
	for(var i = balasmin;i<balasmax;i++){ //blucle para pasar por todas las lalas creadas
		balaposy[i]-=3; //mueve la bala en 3px
		if(balaposy[i]>0){ //dibuja solo las balas solo si est�n dentro del contenedor
			//console.log(balaviva[i]);
			if(balaviva[i]){ // si la bala est�a viva dibuja el movimiento por css 
				$("#balas").append('<div class="bala" style=left:'+balaposx[i]+'px;top:'+balaposy[i]+'px;></div>'); 
			}
		}else{
			balasmin++; // si no entra dentro del contenedor, no se vuelve a intentar dibujar ya que su posici�n ser� menor a 0
		}
	}
}

function balasAliens(){
	if(balasenemigotiempo==35){
		var random = Math.floor(Math.random()*(enemigos+1)); // selecciona un enemigo al azar
		console.log(random); 
		balasenemigotiempo=0; // reinicia el contador de tiempo para las balas
		if(enemigovivo[random]){
			balaenemigoviva[balaenemigomax]	 = true; // activa al bala
			balaenemigoposx[balaenemigomax] = enemigoposx[random]; // coge las posx y posy del enemigo del que saldr� la bala
			balaenemigoposy[balaenemigomax] = (enemigoposy+50);
			// console.log("La bala n�mero "+balaenemigomax+" tiene la posX "+balaenemigoposx[0]+" y la posY "+balaenemigoposy[0]+"/ X:"+enemigoposx[random]+"Y:"+enemigoposy)
			balaenemigomax++; //aumenta en uno el contador de balas 
		}			
	}
	for(var i = balaenemigomin;i<balaenemigomax;i++){
		balaenemigoposy[i] +=3; //mueve la bala en 3px
		if(balaenemigoposy[i]<470){ //dibuja solo las balas solo si est�n dentro del contenedor
			// console.log(balaenemigoviva);
			if(balaenemigoviva[i]){
				$("#balas").append('<div class="balaenemigo" style=left:'+balaenemigoposx[i]+'px;top:'+balaenemigoposy[i]+'px;></div>'); //dibuja el movimiento de las balas por css 
			}else{
				balasmin++; // si no entra dentro del contenedor, no se vuelve a intentar dibujar ya que su posici�n ser� menor a 0
			}
		}
	}
}

function movimientoEnemigo(){
	$("#enemigos").html(""); // limpia el html
	
	if(enemigoposx[0]<=10){		// comprueba que no se salgan por la izquierda
		movimientoenemigos = "derecha";//si lo hacen cambia direccion
		//enemigoposy += 45; //mueve los aliens una linea hacia abajo
	}
	if(enemigoposx[0]>=440){ // comprueba que no se salgan por la derecha
		movimientoenemigos = "izquierda";//si lo hacen cambia direccion
		//enemigoposy += 45; //mueve los aliens una linea hacia abajo
	}
	if(movimientoenemigos == "derecha"){ // mueve todos los aliens a la derecha
		for(var i = 0;i <= enemigos;i++){
			enemigoposx[i]+=3;
		}
	}
	if(movimientoenemigos == "izquierda"){ // mueve todos los aliens a la izquierda
		for(var i = 0;i <= enemigos;i++){
			enemigoposx[i]-=3;
		}
	}
		
	//$("#enemigos").append('<img class="bala" style=left:'+balaposx[i]+'px;top:'+balaposy[i]+'px;></div>');
	// He intentado hacerlo de varias maneras, estas son las dos �ltimas:
	for(var i = 0;i<=enemigos;i++){
		if(enemigovivo[i]){
			$("#enemigos").append('<img class="imgenemigo" src="img/enemigo.png" style="top:'+enemigoposy+'px;left:'+enemigoposx[i]+'px;">');
		}
	}
	//$("#enemigos").append('<div class="enemigo" ><img class="imgenemigo" style=top:'+enemigoposy+'px;left:'+enemigoposx[i]+'px; src="img/enemigo.png"></div>')
		// console.log para comprobar el funcionamiento correcto
	//console.log(enemigoposx[0]+"/"+enemigoposx[1]+"/"+enemigoposx[2]+"/"+enemigoposx[3]+"/"+enemigoposx[4]+" - Y:"+enemigoposy+"Posx de i:"+i);
}

function hasPerdido(){ // detecta cuando un alien toca al jugador
	for(var i = 0;i<=enemigos;i++){ //si est�s a menos de 25px pierdes.
		if(enemigovivo[i]){
			if(enemigoposy>=miposy){ // si el enemigo tiwene una posY mayor a la mia, muero
				for(var i = 0;i<=enemigos;i++){
					enemigovivo[i] = false;
				}
				//console.log("Has perdido");
			}
			if(Math.abs(enemigoposx[i]-(miposx+25)) < 25 && Math.abs(enemigoposy-miposy) < 25){
				for(var i = 0;i<=enemigos;i++){ // si el enemigo choca conmigo muero
					enemigovivo[i] = false;
				}
				//console.log("Has perdido");
			}
		}
	}
	for(var i = balaenemigomin;i<balaenemigomax;i++){ //si la bala disparada por el enemigo choca conmigo, muero
		if(Math.abs((balaenemigoposx[i]+2)-(miposx+22))<25 && Math.abs((miposy+22)-(balaenemigoposy[i]+10))<25){
			if(balaenemigoviva[i]){ //si la bala est� viva muero
				//console.log("Has perdido");
			}else{ 
				//console.log("Error");
			}
		}
	}
}

function matarAlien(){
	for(var i = balasmin;i<balasmax;i++){ // recorre todas las balas disparadas por mi que est� a�n activas
		for(var x = 0;x<=enemigos;x++){ // recorre todos los enemigos
			if(Math.abs(balaposx[i]-(enemigoposx[x]+22))<25 && Math.abs((enemigoposy+22)-balaposy[i])<25){
				if(enemigovivo[x] && balaviva[i]){ // si la bala choca con un enemigo y ambos est�n a�n vivos/activos...
					//console.log("Has matado al alien: "+x);
					enemigovivo[x] = false; //muere el enemigo
					balaviva[i] = false; // muere la bala
					//hasganado--; // resta uno al contador para saber si est�n todos muertos
					//console.log("Has acertado")
					if(hasganado==0){
						//console.log("Has acertado"); // si todos han muerto he ganado
						
					}
					trainingset[numintento][0] = miposx;
					trainingset[numintento][1] = enemigoposx[0];
					trainingset[numintento][2] = enemigoposy;
					trainingset[numintento][3] = movimientoenemigos;
					trainingset[numintento][4] = 1;
					superacierto = 1
				
						insertRecords(db)
					
				setTimeout("juegoempiezadenuevo()",0);
					
				}else{
					//console.log("El enemigo ya estaba muerto");
				}
			}
		}
	}
	
}
function hasFallado(){
	if(balaposy[0] < 10){
		trainingset[numintento][0] = miposx;
		trainingset[numintento][1] = enemigoposx[0];
		trainingset[numintento][2] = enemigoposy;
		trainingset[numintento][3] = movimientoenemigos;
		trainingset[numintento][4] = 0;
		//console.log(movimientoenemigos)
		//window.location = window.location;
		db_name = 'ai';
		db_version = '';
		db_describe = '';
		db_size = 2048;
		
		
		superacierto = 0
			insertRecords(db)
	
		setTimeout("juegoempiezadenuevo()",0);
	}
}

function juegoempiezadenuevo(){
	numintento++;
	//console.log("vamos por numintento: "+numintento)
	temporizador; // se declara la variable del temporizador

	// posicion del jugador 
	miposx = Math.random()*440; // posicion x,y dle jugador
	miposy = 450;
	movimientopersonaje = ""; // se inicia la variable de la direcci�n de movimiento usada en movimientoJugador()

	//balas

	balaposx = new Array(); //declaramos los array de las posiciones de las balas
	balaposy = new Array();
	balasmax = 0; // ponemos a 0 el contador de balas disparadas;
	balasmin = 0; //contador de balas dentro del terreno de juego

	balaviva = new Array(); // variable bool para activar las balas

	balastiempo = 30; // contador de tiempo para el lanzamiento de balas

	// balas enemigos

	balaenemigoposx = new Array(); //declaramos los array de las posiciones de las balas
	balaenemigoposy = new Array();
	balaenemigomax = 0; // ponemos a 0 el contador de balas disparadas;
	balaenemigomin = 0; //contador de balas dentro del terreno de juego

	balaenemigoviva = new Array(); // variable bool para activar las balas
	balasenemigotiempo = 0; // contador de tiempo para el lanzamiento de balas

	// enemigos

	 
	enemigoposx = new Array(); // almacenan la posici�n x ,y de cada uno de los enemigos
	enemigoposx[0] = Math.round(Math.random()*440);
	enemigoposx[1] = 75;
	enemigoposx[2] = 125;
	enemigoposx[3] = 175;
	enemigoposx[4] = 225;
	enemigoposx[5] = 275;

	enemigoposy = 125; // y com�n ya que se mueven en bloque
	enemigos = 0; // n�mero de enemigos con los que se inicia el nivel 
	hasganado = (enemigos+1); // contador para saber cuando se han eliminado a todos los enemigos

	enemigovivo = new Array(); //almacena si el enemigo est� vivo o no
	for(var i = 0;i<=enemigos;i++){ //inicializa todos en true
		enemigovivo[i] = true;
	}
	movimientoenemigos = "derecha";  // se inicia la variable de la direcci�n de movimiento usada en movimientoEnemigo()
	// El jugador dispara una vez
	balaposx[balasmax] = miposx+22; // coge las coordenadas iniciales de la bala
	balaposy[balasmax] = miposy;
	balaviva[balasmax] = true; // activa la bala
	balasmax++; //aumenta el contador de balas totales
	balastiempo = 0; // reinicia el contador de tiempo apra el pr�ximo disparo
}


