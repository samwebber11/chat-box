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

io.on('connection',(socket)=>
{
	console.log('New User generated');
	socket.on('disconnect',()=>
	{
		console.log('Disconnected');
	});
});

server.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});