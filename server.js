var http = require('http');
var md5 = require('MD5');


httpServer = http.createServer((req, res) => {
    console.log('Un utilisateur a affiche la page');

});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {

    console.log('Nouveau utilisateur');

    socket.on('login',function(user){
        me = user;
        me.id = user.mail.replace('@','-').replace('.','-');
        me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
        socket.emit('logged');
        io.sockets.emit('newusr',me);
    })


});