const socket = io();

const user = prompt('Enter your name : ');
document.getElementById('welcomemsg').innerHTML = ('Welcome '+user+'!');
socket.emit('newclient',user);
function createChat(user,msg){
    let newdiv = document.createElement('div');
    newdiv.innerHTML = '<p>'+user+'</p><p>'+msg+'</p>'; 
    console.log(newdiv.childNodes[0].style.fontSize = 'small');
    newdiv.childNodes[0].style.color = 'blue';
    if(user == 'You'){
        newdiv.id = 'usermsg';
    }
    else{
        newdiv.id = 'recmsg';
    }
    return newdiv;
}

let chat = document.querySelector('#chat');

socket.on('newuser',(user)=>{
    let newpara = document.createElement('p');
    newpara.id = 'newuser';
    newpara.innerHTML = user+' has joined !';
    chat.appendChild(newpara);
});

socket.on('message',(user,msg)=>{
    chat.appendChild(createChat(user,msg));
})

socket.on('left',(username)=>{
    let newpara = document.createElement('p');
    newpara.id = 'newuser';
    newpara.innerHTML = username+' has left !';
    chat.appendChild(newpara);
})
const msgForm = document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.draft.value;
    if(msg === ''){}
    else{
        chat.appendChild(createChat('You',msg));
        socket.emit('newmessage',user, msg);
    }
    e.target.elements.draft.value = '';
});