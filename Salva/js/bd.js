function createDb() {
    var db_name = 'trainingSetDB';
    var db_version = '1.0';
    var db_describe = 'BD trainingSetDB';
    var db_size = 10 * 1024 * 1024;
    db = openDatabase(db_name, db_version, db_describe, db_size, function(db) {
        //console.log(db);
        console.log("Database opened Successfully! Or created for the first time !");        
    });
	createTable(db);
}

function createTable(db) {
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS " + "registro( " 
												  + "conjunto int, "
												  + "iteracion int, "
												  + "posXJugador int, "
												  + "posXBot int, "
												  + "posYBot int, "
												  + "movimientoBot text, "
												  + "acierto int, "
												  + "PRIMARY KEY(conjunto, iteracion)"
												  + ")", [], function(transaction, result) {
            
            deleteRecords(db);
			for (var i = 0; i < trainingSet.length; i++){
				insertRecord(db,i);
			}
			console.log("Registros borrados e insertados");
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);	
}

function transError(t, e) {
	/*
    console.log(t);
    console.log(e);
    console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
	*/
}

function transSuccess(t, r) {
	/*
    console.info("Transaction completed Successfully!");
    console.log(t);
    console.log(r);
	*/
}

function insertRecord(db, indice) {
	
	if (db) {
		db.transaction(function(tx) {
            tx.executeSql("INSERT INTO REGISTRO(conjunto,iteracion, posXJugador, posXBot, posYBot, movimientoBot, acierto) " + "VALUES(?,?,?,?,?,?,?)",
						 [trainingSet[indice].conjunto,
						  trainingSet[indice].iteracion,
						  trainingSet[indice].posXJugador,
						  trainingSet[indice].posXBot,
						  trainingSet[indice].posYBot,
						  trainingSet[indice].movimientoBot,
						  trainingSet[indice].acierto],
						 function(transaction, result) {
							 //console.log(result.insertId);
						 }, function(transaction, error) {
							 console.log(error);
						 });			
        }, transError, transSuccess);
    } else {
        console.log('No existe la BD o aún no está abierta!');
    }
}

function deleteRecords(db) {
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM registro', [], function(transaction, result) {
            
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}


function displayNotes(db) {
    db.transaction(function(tx) {
        tx.executeSql("SELECT id,data FROM notes", [], function(sqlTransaction, sqlResultSet) {
            var rows = sqlResultSet.rows;
            var len = rows.length;
            for (var i = 0; i < len; i++) {
                var cur_item = rows[i]; // or u can use the item methid ---> var cur_item = rows.item(i);
                console.log("the id is : " + cur_item.id + " the data is : " + cur_item.data);
            }
            console.log('Done!!!');
            UpdateNote(db);
        }, function(sqlTransaction, sqlError) {
            switch (sqlError.code) {
                case sqlError.SYNTAX_ERR:
                    console.error("Syntax error has occurred. " + sqlError.message);
                    break;
                default:
                    console.error("Other error");
            }
        });
    }, transError, transSuccess);
}

function UpdateNote(db) {
    db.transaction(function(tx) {
        tx.executeSql('update notes set data=? where id=?', ["rane", 1], function(transaction, result) {
            console.log(result);
            console.info('Record Updated Successfully!');
            deleteNote(db);
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}


