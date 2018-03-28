const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const finalPath=path.join(__dirname , '../client');
console.log(finalPath);
var port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

// app.set('view engine','html');
// app.engine('html',require('hbs').__express);
// console.log(port);
app.use(express.static(finalPath));
// app.get('/',(res,req)=>
// {
// 	res.sendFile(`finalPath + 'one.html'`);
// })

// io.on('connection',(socket)=>
// {
// 	console.log('New User generated');

// 	socket.emit('newEmail',
// 	{
// 		from:'samjain15291@gmail.com',
// 		text:'Hello World',
// 		createdAt:124
// 	});

// 	socket.on('createEmail',(email)=>
// 	{
// 		console.log('New Email is created');
// 		console.log(email);
// 	});

// 		socket.on('disconnect',()=>
// 	{
// 		console.log('Disconnected');
// 	});

// });

io.on('connection',(socket)=>
{
	console.log('New User Generated');
	socket.emit('newMsg',{
		from:'samjain15291@gmail.com',
		text:'Hello World',
		createdAt:123
	});

	socket.on('createMsg',(msg)=>
	{
		console.log('New Msg recieved');
		console.log(msg);
	})

	socket.on('disconnect',()=>
	{
		console.log('Disconnecting from the server');
	});


})

server.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});