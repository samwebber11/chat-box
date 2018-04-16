[
{
	id:'#123432',
	name:'sambhav',
	room:'yaaron'
}];

class Users
{
	constructor()
	{
		this.users=[];
	};
	 addUser(id,name,room)
	 {
	 	var user1={id,name,room};
	 	this.users.push(user1);
	 	return user1;
	 }
	 getUserList(room)
	 {
	 	var user1=this.users.filter((user)=>{user.room===room});
	 	var nameArray=user1.map((user)=>
	 	{
	 		return user.name;
	 	});
	 	return nameArray;
	 };
	 getUser(id)
	 {
	 	return this.users.filter((user)=>
	 	{
	 		return user.id===id;
	 	})[0];
	 };
	 removeUser(id)
	 {
	 	var user2=getUser(id);
	 	if(user2)
	 	{
	 	var user1=this.users.filter((user)=>
	 	{
	 		return user.id!==id;
	 	});

	 }
	 return user1;
}
}

module.exports={Users};