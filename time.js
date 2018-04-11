var moment=require('moment');

var date=moment();
date.add(8,'hours')
console.log(date.format('HH:mm a'));