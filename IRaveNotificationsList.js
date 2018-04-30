var notificationsdata = { 

	notifications : [
	{
		id:1,
		type:"Location-receive",
		user:"Antonio",
	},
	{
		id:2,
		type:"Location-receive",
		user:"Joao",
	},
	{
		id:3,
		type:"Location-send",
		user:"Rui",
	}
]
};


function getData() {
	return notificationsdata.notifications;
}