const path=require('path');
const express=require('express');

const finalPath=path.join(__dirname , '../client');
console.log(finalPath);
var port=process.env.PORT||3000;
var app=express();
// app.set('view engine','html');
// app.engine('html',require('hbs').__express);
// console.log(port);
app.use(express.static(finalPath));
app.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});