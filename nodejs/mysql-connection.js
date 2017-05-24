var mysql =  require('mysql');

var connection =  mysql.createConnection({
  	host : '',
  	user : '',
  	password: '',
	database: '',
	port: ''
  });
  
connection.connect(function(err) {
  if (err) {
    console.error('<<<<<<<<<<<<<<<<<<error connecting>>>>>>>>>>: ' + err.stack);
    return;
  }

  console.log('WWWWWWWWWWWWWWWWW connected as id ' + connection.threadId);
});

