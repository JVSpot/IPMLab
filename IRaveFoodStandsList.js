var foodstandsData = { 

	stands:[
	{	
		name: 'Stand1',
		item_types:[
		{
			name:'Menu',
			items:[{name:'Hamburger menu', descrition:'Hamburger + Coke + Icecream', price:7.50, time:7}, 
					{name:'Steak menu', descrition:'Steak + Chips + Beer + Coffee', price:8.50, time:12},
					{name:'Nuggets menu', descrition:'Nuggets + Coke + Icecream', price:6.50, time:5} 
			]
		},
		{
			name:'Eats',
			items:[{name:'Hamburger', price:4.30, time:7},
					{name:'Steak', price:5.00, time:12},
					{name:'Nuggets', price:3.00, time:5}
			]
		},
		{
			name:'Drinks',
			items:[{name:'Beer', price:0.50, time:0},
					{name:'Water', price:0.50, time:0},
					{name:'Orange juice', price:1.00, time:0},
					{name:'Soda', price:0.75, time:0},
					{name:'Coffee', price:0.80, time:0}
			]
		}

		]
	},
	{	
		name: 'Stand2',
		item_types:[
		{
			name:'Menu',
			items:[{name:'Kebbab menu', descrition:'Kebbab + Coke + Jelly', price:4.50, time:5}, 
					{name:'Steak menu', descrition:'Steak + Chips + Beer + Coffee', price:7.95, time:9},
					{name:'Soup menu', descrition:'Soup + Coke + Icecream', price:6.50, time:5}
			]
		},
		{
			name:'Eats',
			items:[{name:'Kebbab', price:2.30, time:5},
					{name:'Steak', price:5.00, time:9},
					{name:'Soup', price:4.00, time:5},
			]
		},
		{
			name:'Drinks',
			items:[{name:'Beer', price:0.50, time:0},
					{name:'Water', price:0.50, time:0},
					{name:'Orange juice', price:1.00, time:0},
					{name:'Soda', price:0.75, time:0},
					{name:'Coffee', price:0.80, time:0}
			]
		}
		]
	}
	]
};

function getData() {
	return scheduledata.days;
}
