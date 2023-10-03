const socket = io();

Swal.fire({
  title: "Identificate",
  input:"text",
  text:"Ingresa un nombre para identificarte en el chat",
  inputValidator: (value) => {
    return !value && 'Necesitas ingresar un nombre para continuar!'
  },
  allowOutsideClick: false
}).then(result => {
  user=result.value
});

chatBox.addEventListener('keyup', evt => {
  if(evt.key==="Enter"){
    if(chatBox.value.trim().length > 0) {
      socket.emit('message',{ user: user, message:chatBox.value});
      chatBox.value=""
    }
  }
})

socket.on('messageLogs', data => {
  let log = document.getElementById('messageLogs');
  let messages = "";
  data.forEach(message => {
    messages = messages+`${message.user}: ${message.message}</br>`
  })
  log.innerHTML = messages;
})