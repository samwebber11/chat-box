const moment=require('moment');
var date=moment();
var generateMsg=(from,text)=>
{
	return 
	{
		from,
		text,
		createdAt=moment().valueOf()
	};
};

// var generateMsgLocation=(from,latitude,longitude)=>
// {
// 	return 
// 	{
// 		from,
// 		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
// 		createdAt: new Date().getTime()
// 	};
// };

module.exports={generateMsg};