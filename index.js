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
          case "FloRon | flo974":
            var loged = 'log';
            socket.emit('login', loged);
            var username = "Florent";
            socket.username = "Florent";
            socket.emit('username', username);
            socket.broadcast.emit('username', username);
            break;

          case "AdriChien | jepue":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Adrien";
             socket.username = "Adrien";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "test | test":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Robot";
             socket.username = "Robot";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Simon | cul":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Simon";
             socket.username = "Simon";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Paul | mars":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Paul";
             socket.username = "Paul";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Denis | sansnez":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Denis";
             socket.username = "Denis";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Nancy | cynan":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Nancy";
             socket.username = "Nancy";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Mallaury | drago":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Mallaury";
             socket.username = "Mallaury";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          case "Jonathan | leblack":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Jonathan";
             socket.username = "Jonathan";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

           case "Amandine | bellatrix":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Amandine";
             socket.username = "Amandine";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

           case "Caroline | killian":
             var loged = 'log';
             socket.emit('login', loged);
             var username = "Caroline";
             socket.username = "Caroline";
             socket.emit('username', username);
             socket.broadcast.emit('username', username);
             break;

          default: 
            socket.emit('login', 'incorrect');
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
      if (socket.username != null){
        socket.broadcast.emit('disco', socket.username);
      }
    
});
});
