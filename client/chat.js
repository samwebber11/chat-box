var socket=io();

socket.on('connect',()=>
{
	console.log('Connected to Chat App');

	// socket.emit('newMessage',{
	// 	from:'Admin',
	// 	text:'Welcome to the group'
	// });
});

// socket.emit('createMsg',{
// 		from:'Server',
// 		text:'New Update'
// 	},function (err,data)
// 	{
// 		if(err)
// 		{
// 			console.log('Error!!UGH');
// 		}
// 		else
// 		{
// 		console.log('Got it',data);
// 		}
// 	});

jQuery('#message').on('submit',function(e)
{
	e.preventDefault();
	var chatt=jQuery('[name=message-grp');
	socket.emit('createMsg',{
		from:'User',
		text:chatt.val()
	},function(){
		chatt.val('');
	});
});

socket.on('disconnect',()=>
{
	console.log('Disconnecting App');
});

socket.on('newMsg',(msg)=>
{
	console.log('New Msg Arrived');
	console.log(msg);

    var time=moment(msg.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
    	text:msg.text,
    	from:msg.from,
    	createdAt:time
    });

	// var li=jQuery('<li></li>');
	// li.text(`${msg.from} ${time}:${msg.text}`);

	jQuery('#messages').append(html);
});


// socket.on('newLoc',(msg)=>
// {
// 	var time=msg.createdAt;
// 	var time=moment(msg.createdAt).format('h:mm a');
// 	var template=jQuery('#message-location').html();
// 	var html=Mustache.render(template,{
// 		from:msg.from,
// 		url:msg.url,
// 		createdAt:time
// 	});
// });


var message1=jQuery('#btn2');
message1.on('click',function(position){
if(!navigator.geolocation)
{
	return alert('Browser not supported');
}

message1.attr('disabled','disabled').text('Sending Location...');
	navigator.geolocation.getCurrentPosition(function(position)
	{
		message1.removeAttr('disabled').text('Send Location');
		socket.emit('locateMe',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		});
	},function()
	{
		message1.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch the position');
	});


});



