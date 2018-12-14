/*
    Web SQL Database Basic CRUD ( Create,Read,Update,Delete )
    @autor: sid24rane
*/

function createDb() {
    var db_name = 'jabber';
    var db_version = '1.0';
    var db_describe = 'Bro,its jabber';
    var db_size = 2048;
    var db = openDatabase(db_name, db_version, db_describe, db_size, function(db) {
        console.log(db);
        console.log("Database opened Successfully! Or created for the first time !");
        createTable(db);
    });
}

function createTable(db) {
    db.transaction(function(tx) {
        tx.executeSql('create table notes(id int primary key , data text)', [], function(transaction, result) {
            console.log(result);
            console.log('Table created Successfully!');
            insertRecords(db);
        }, function(transaction, error) {
            console.log(error);
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
    if (db) {
        db.transaction(function(tx) {
            tx.executeSql('insert into notes(id,data) values(?,?)', [1, "rane"], function(transaction, result) {
                console.log(result.insertId);
            }, function(transaction, error) {
                console.log(error);
            });
            tx.executeSql('insert into notes(id,data) values(?,?)', [2, "siddhes"], function(transaction, result) {
                console.log(result.insertId);
            }, function(transaction, error) {
                console.log(error);
            });
            tx.executeSql('insert into notes(id,data) values(?,?)', [3, "santosh"], function(transaction, result) {
                console.log(result.insertId);
                console.log('Record inserted Successfully!');
                displayNotes(db);
            }, function(transaction, error) {
                console.log(error);
            });
        }, transError, transSuccess);
    } else {
        console.log('No Database man! wait creating it for you!');
        createDb();
    }
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

function deleteNote(db) {
    db.transaction(function(tx) {
        tx.executeSql('delete from notes where id=?', [1], function(transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}

createDb();