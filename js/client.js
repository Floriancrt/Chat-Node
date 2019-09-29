(function($){

    var socket = io.connect('http://localhost:1337');
    var msg = $('#msgtpl').html();
    $('#msgtpl').remove();

    $('#loginform').submit(function(event){
        event.preventDefault();
        socket.emit('login',{
            username : $('#username').val(),
            mail     : $('#mail').val()
        })
    })

    socket.on('logged',function(){
        $('#login').fadeOut();
    });

    /**
     * Envois de message
     */
    $('#form').submit(function(event){
        event.preventDefault();
        socket.emit('newmsg', {message: $('#message').val()});
        $('#message').val('');
        $('#message').focus();
    });

    socket.on('newmsg', function(message) {
        $('#messages').append('<div class="message">' + Mustache.render(msg, message) + '</div>');
    });


    /**
     * Gestion des connectés
     * 
     */

    socket.on('newusr', function(user){
        $('#users').append('<img src="' + user.avatar +'" id="' + user.id + '">');
    })

    socket.on('disusr', function(user){
        $('#' + user.id).remove();
    })

})(jQuery);