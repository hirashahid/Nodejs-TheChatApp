const socket = io('http://localhost:8000');

var audio = new Audio('ringtone.mp3');

const append = (message, position) => {
    $('.container').append(`<div class="message ${position}">${message}</div>`);
    if (position == 'left') {
        audio.play();
    }
}

$('#send-container').submit((e) => {
    e.preventDefault();
    const message = $('#messageInp').val();
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    $('#messageInp').val('');
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => append(`${name} joined the chat`, 'right'));

socket.on('receive', (data) => append(`${data.name}: ${data.message}`, 'left'));

socket.on('left', name => append(`${name} left the chat`, 'left'));

socket.on('Connection-Failed', () => append(`Something went wrong`, 'left'));


/*const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);*/