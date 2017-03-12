var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');

var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch(path){
    case '/login' :
     fs.readFile('./login.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
    default:
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
    break;
  }
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('login', false);
});

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

io.sockets.on('connection', function (socket, username) {

   // Quand le serveur reçoit un signal de type "message" du client    

     socket.on('login', function (data){
       var id = data.userid;
       var pass = data.password;

       if (id == "FloRon") {
        if (pass == "Flo974"){
          var loged = true;
          socket.emit('login', loged);
          var username = "Florent";
          socket.username = "Florent";
          socket.emit('username', username);
        }
       }

      if (id == "AdriChien") {
        if (pass == "jepue"){
          var loged = true;
          socket.emit('login', loged);
          var username = "Adrien";
          socket.username = "Arien";
          socket.emit('username', username);
        }
      }
       console.log(id + pass);
    });

     socket.on('message', function(message){
       socket.broadcast.emit('message', {user: socket.username, message: message});
       console.log('Un client me parle !' + socket.Username +' me dit : ' + message);
     });
});
