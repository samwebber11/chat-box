var socket=io();

socket.on('connect',()=>
{
	console.log('Connected to Chat App');

	// socket.emit('newMessage',{
	// 	from:'Admin',
	// 	text:'Welcome to the group'
	// });
});

socket.emit('createMsg',{
		from:'Server',
		text:'New Update'
	},function (err,data)
	{
		if(err)
		{
			console.log('Error!!UGH');
		}
		else
		{
		console.log('Got it',data);
		}
	});

jQuery('#message').on('submit',function(e)
{
	e.preventDefault();

	socket.emit('createMsg',{
		from:'User',
		text:jQuery('[name=message-grp]').val()
	},function(){});
});

socket.on('disconnect',()=>
{
	console.log('Disconnecting App');
});

socket.on('newMsg',(msg)=>
{
	console.log('New Msg Arrived');
	console.log(msg);

	var li=jQuery('<li></li>');
	li.text(`${msg.from}:${msg.text}`);

	jQuery('#messages').append(li);
});