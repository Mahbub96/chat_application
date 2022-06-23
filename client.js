const socket = io('https://demo-chat-backend.herokuapp.com');

const form = document.getElementById('form');
const msg = document.getElementById("message");
const chats = document.querySelector('.chats');
const chat_box = document.querySelector(".chat-box")
let client_name = document.getElementById('client_name');

function addChat(msg,pos){
    const messageElement = document.createElement('p');
    messageElement.innerText = msg;

    messageElement.classList.add("my-2","px-3","py-2","text-light");
   
    if(pos == 'left'){
        messageElement.classList.add("bg-dark")
    }

    else {
        messageElement.classList.add("bg-primary")
    }
    
    messageElement.classList.add("rounded")
    messageElement.classList.add(pos)
    chats.append(messageElement);
}

function saveName(){
    client_name = client_name.value;
    chat_box.style.display = "block";
    document.querySelector('.client-name').style.display = "none";
    document.getElementById("avater_name").innerText = client_name.toUpperCase();



    socket.emit("new-user-joined",client_name);

    socket.on('user-joined',client_name=>{
        addChat(`${client_name} joined the chat!`,"left");
    })


    socket.on('leave',client_name=>{
        addChat(`${client_name} leave from the chat!`,"left");
    })


    socket.on('received',(data)=>{
        addChat(`${data.name} : ${data.message}`,"left");
    })
    
}


form.addEventListener('submit',e=>{
    e.preventDefault();
    const messages = msg.value;
    addChat(`${messages} `,"right");
    socket.emit('send',messages);
    msg.value = "";
})




