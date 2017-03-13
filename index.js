var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
var ent = require('ent');
var http = require('http');
var fs = require('fs');

var helmet = require('helmet')

app.use(helmet())

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
   switch(path){
    case '/chatnotif.mp3' :
     fs.readFile( 'D:/Apps/theatrechat/TheatreChar/chatnotif.mp3', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "audio/mpeg"});
        res.end(content);
    });
     break;
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


app.set('port', (process.env.PORT || 8080));
server.listen(app.get('port'));
var save = ["Démarrage du chat"];
io.sockets.on('connection', function (socket, username) {

    socket.emit('logs', save );
   // Quand le serveur reçoit un signal de type "message" du client    

     socket.on('login', function (data){
       var id = data.userid;
       var pass = data.password;
       id = ent.encode(id);
       pass = ent.encode(pass);
       switch (id + " | " + pass){
          case "FloRon | Flo974":
            var loged = true;
            socket.emit('login', loged);
            var username = "Florent";
            socket.username = "Florent";
            socket.emit('username', username);
            socket.broadcast.emit('username', username);
            break;

          case "AdriChien | jepue":
             var loged = true;
             socket.emit('login', loged);
             var username = "Adrien";
             socket.username = "Adrien";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "test | test":
             var loged = true;
             socket.emit('login', loged);
             var username = "Robot";
             socket.username = "Robot";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Simon | moncul":
             var loged = true;
             socket.emit('login', loged);
             var username = "Robot";
             socket.username = "Robot";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Paul | mars":
             var loged = true;
             socket.emit('login', loged);
             var username = "Robot";
             socket.username = "Robot";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;
       }

       console.log(id + pass);
    });

     socket.on('message', function(message){
      message = ent.encode(message);
       row = "<strong>" + socket.username + "</strong>" + " : " + message;
       save.push(row);      
       socket.emit('messageu', {user: socket.username, message: message});
       socket.broadcast.emit('message', {user: socket.username, message: message});
       console.log( socket.username +' me dit : ' + message);
     });

     socket.on('disconnect', function(){
    socket.broadcast.emit('disco', socket.username);
});
});
