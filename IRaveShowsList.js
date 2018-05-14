var scheduledata = { 

	days:[
	{	
		name: 'Day 1',
		day:'abcda',
		stages:[
		{
			name:'Stage A',
			stage:'A',
			concerts:[{time:"18:30", artist:"My Chemical Romance", going: ["a", "b"], notification: false}, {time:"20:30", artist:"Muse", going: [], notification: false}, {time:"22:30", artist:"Pond", going: [], notification: false}, {time:"00:30", artist:"Strokes", going: [], notification: false}]
		},
		{
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Modernos", going: [], notification: false}, {time:"21:00", artist:"Andrage", going: [], notification: false}, {time:"22:30", artist:"Ty Segall", going: [], notification: false}, {time:"00:00", artist:"Foo Fighters", going: [], notification: false}]
		}
		]
	},
	{	
		name: 'Day 2',
		day:'cbhdsabcd',
		stages:[
		{
			name:'Stage A',
			stage:'A',
			concerts:[{time:"18:30", artist:"King Gizzard and the Lizard Wizard", going: [], notification: false}, {time:"20:30", artist:"Pink Floyd", going: [], notification: false}, {time:"22:30", artist:"The Doors", going: [], notification: false}, {time:"00:30", artist:"Nirvana", going: [], notification: false}]
		},
		{	
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Hinds", going: [], notification: false}, {time:"21:00", artist:"Modest Mouse", going: [], notification: false}, {time:"22:30", artist:"The Growlers", going: [], notification: false}, {time:"00:00", artist:"New Order", going: [], notification: false}]
		}
		]
	}
	]
};

function getData() {
	return scheduledata.days;
}
