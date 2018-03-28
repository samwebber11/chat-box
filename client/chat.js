var socket=io();

socket.on('connect',()=>
{
	console.log('Connected to Chat App');

	socket.emit('createMsg',{
		from:'Server',
		text:'New Update'
	});

	// socket.emit('newMessage',{
	// 	from:'Admin',
	// 	text:'Welcome to the group'
	// });
});

socket.on('disconnect',()=>
{
	console.log('Disconnecting App');
});

socket.on('newMsg',(msg)=>
{
	console.log('New Msg Arrived');
	console.log(msg);
});