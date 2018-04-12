const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const finalPath=path.join(__dirname , '../client');
console.log(finalPath);
const {check}=require('./checker.js');
const moment=require('moment');
var port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
// var generator=require('./message.js');
// app.set('view engine','html');
// app.engine('html',require('hbs').__express);
// console.log(port);
var date=moment();
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
		createdAt: moment().valueOf()
	});

       	socket.broadcast.emit('newMsg',{
		from:'Admin',
    	text:'A new member added',
    	createdAt: moment().valueOf()   		
    	});
	socket.on('createMsg',(msg,callback)=>
	{
		console.log('New Msg recieved',msg);
		io.emit('newMsg',{
			from:msg.from,
			text:msg.text,
			createdAt:moment().valueOf()
		});
		return callback(null,'This is from the server');
		
	});

	socket.on('join',(param,callback)=>
	{
		if(!check(param.name) || !check(param.room))
		{
			return callback('Name and room are not available');
		}
		return callback();
	});
	// socket.on('locateMe',(coords)=>
	// {
	// 	console.log(coords);
	// 	socket.broadcast.emit('newLoc'),
	// 	{
	// 		from:'Admin',
	// 		url:'https://www.google.com/maps?@${coords.latitude},${coords.longitude}',
	// 		createdAt:moment().valueOf()
	// 	};
	// });

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