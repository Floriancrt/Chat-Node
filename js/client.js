(function($){

    var socket = io.connect('http://localhost:1337');

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

    socket.on('newusr', function(user){
        $('#users').append('<img src="' + user.avatar +'">');
    })

})(jQuery);