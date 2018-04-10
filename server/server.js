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
// var generator=require('./message.js');
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
		from:'Admin',
		text:'Welcome to the chat group',
		createdAt:123
	});

       	socket.broadcast.emit('newMsg',{
		from:'Admin',
    	text:'A new member added',
    	createdAt: new Date().getTime()    		
    	});
	socket.on('createMsg',(msg,callback)=>
	{
		console.log('New Msg recieved',msg);
		io.emit('newMsg',{
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});
		return callback(null,'This is from the server');
		
	});

	socket.on('locateMe',(coords)=>
	{
		console.log(coords);
		socket.broadcast.emit('newMsg',
		{
			from:'Admin',
			text:[
			latitude=coords.latitude,
			longitude=coords.longitude
			]
		});
	});

	socket.on('disconnect',()=>
	{
		console.log('Disconnecting from the server');
	});


});

server.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});