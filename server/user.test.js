var expect=require('expect');
var {Users}=require('./users.js');

describe('Users',()=>
{
	var users;

	 beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

	 it('should add a user',()=>
	 {
	 	var user1=new Users();
	 	var user={
	 		id:'#123432',
	name:'sambhav',
	room:'yaaron'
	 	};
	 	var result=user1.addUser(user.id,user.name,user.room);

	 	expect(users.user1).toEqual([user]);
	 })
})