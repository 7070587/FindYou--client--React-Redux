import io from 'socket.io-client';

// 客戶端連接server，得到與server的連接對象
// io是一個函數，需要指定服server的地址
const socket = io('ws://localhost:4000');
// 綁定監聽，接收server發送的消息
socket.on('receiveMsg', (data) => {
    console.log(`------- 客戶端接收到server發送的消息：`, data, `-------`);

});


// 發送消息
socket.emit('sendMsg', {name: 'sci'});
console.log(`------- 客戶端向server發送消息`, {name: 'sci'}, `-------`);

