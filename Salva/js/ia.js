
function IARegistro() {
	// Propiedades
	this.iteracion;
	this.posXJugador; 
	this.posXBot; 
	this.posYBot; 
	this.dirBot;
	this.acierto;
	// Métodos
}

function IAInsertar(acierto){
	var indice;
	
	if (acierto) {

		indice = trainingSet.length;
		trainingSet[indice] = new IARegistro();	
		trainingSet[indice].conjunto = conjunto;
		trainingSet[indice].iteracion = iteracion;
		trainingSet[indice].posXJugador = miposx;
		trainingSet[indice].posXBot = enemigoposxold;
		trainingSet[indice].posYBot = enemigoposyold;
		trainingSet[indice].movimientoBot = movimientoenemigosold;
		trainingSet[indice].acierto = acierto;
		console.log(iteracion + " Acierto");		
	}	
	else {
		console.log(iteracion + " Fallo");
	}
	
}	

function dispararIA(db){
	
	db.transaction(function(tx) {
        tx.executeSql(
					"SELECT * FROM registro " + 
					"WHERE posXJugador = ? AND " +
					"      posxBot = ? AND " +
					"      posYBot = ? AND " +
					"      movimientoBot = ? AND " +
					"      acierto = ?",
					//////////////////////////
					[miposx,
					 enemigoposx[0],
					 enemigoposy,
					 movimientoenemigos,
					 1],										
					//////////////////////////
					function(sqlTransaction, sqlResultSet) {
						var rows = sqlResultSet.rows;
						
						if (rows.length > 0){							
							disparar();							
							/*
							console.log("                   ");
							console.log(miposx);
							console.log(rows[0].iteracion);
							console.log(enemigoposx[0]);							
							console.log(movimientoenemigos);
							*/
							
						}
						lanzaBucle();						
					},
					//////////////////////////
					function(sqlTransaction, sqlError) {
						switch (sqlError.code) {
						case sqlError.SYNTAX_ERR:
							console.error("Syntax error has occurred. " + sqlError.message);
							break;
						default:
							console.error("Other error");
						}
					}
		);
    }, transError, transSuccess);	
}
