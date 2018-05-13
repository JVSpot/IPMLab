var foodstandsData = { 

	stands:[
	{	
		name: 'Stand1',
		item_types:[
		{
			name:'Menu',
			items:[{name:'Hamburger menu', descrition:'Hamburger + Coke + Icecream', price:7.50}, 
					{name:'Steak menu', descrition:'Steak + Chips + Beer + Coffee', price:8.50},
					{name:'Nuggets menu', descrition:'Nuggets + Coke + Icecream', price:6.50} 
			]
		},
		{
			name:'Eats',
			items:[{name:'Hamburger', price:4.30},
					{name:'Steak', price:5.00},
					{name:'Nuggets', price:3.00}
			]
		},
		{
			name:'Drinks',
			items:[{name:'Beer', price:0.50},
					{name:'Water', price:0.50},
					{name:'Orange juice', price:1.00},
					{name:'Soda', price:0.75},
					{name:'Coffee', price:0.80}
			]
		}

		]
	},
	{	
		name: 'Stand2',
		item_types:[
		{
			name:'Menu',
			items:[{name:'Kebbab menu', descrition:'Kebbab + Coke + Jelly', price:4.50}, 
					{name:'Steak menu', descrition:'Steak + Chips + Beer + Coffee', price:7.95},
					{name:'Soup menu', descrition:'Soup + Coke + Icecream', price:6.50}
			]
		},
		{
			name:'Eats',
			items:[{name:'Kebbab', price:2.30},
					{name:'Steak', price:5.00},
					{name:'Nuggets', price:3.00}
			]
		},
		{
			name:'Drinks',
			items:[{name:'Beer', price:0.50},
					{name:'Water', price:0.50},
					{name:'Orange juice', price:1.00},
					{name:'Soda', price:0.75},
					{name:'Coffee', price:0.80}
			]
		}
		]
	}
	]
};

function getData() {
	return scheduledata.days;
}
