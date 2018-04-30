var scheduledata = { 

	days:[
	{	
		name: 'Day 1',
		day:'abcda',
		stages:[
		{
			name:'Stage A',
			stage:'A',
			concerts:[{time:"18:30", artist:"Band1", going: ["a", "b"], notification: false}, {time:"20:30", artist:"Band2", going: [], notification: false}, {time:"22:30", artist:"Band3", going: [], notification: false}, {time:"00:30", artist:"Band4", going: [], notification: false}]
		},
		{
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Band1", going: [], notification: false}, {time:"21:00", artist:"Band2", going: [], notification: false}, {time:"22:30", artist:"Band3", going: [], notification: false}, {time:"00:00", artist:"Band4", going: [], notification: false}]
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
			concerts:[{time:"18:30", artist:"Band5", going: [], notification: false}, {time:"20:30", artist:"Band6", going: [], notification: false}, {time:"22:30", artist:"Band7", going: [], notification: false}, {time:"00:30", artist:"Band8", going: [], notification: false}]
		},
		{	
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Band5", going: [], notification: false}, {time:"21:00", artist:"Band6", going: [], notification: false}, {time:"22:30", artist:"Band7", going: [], notification: false}, {time:"00:00", artist:"Band8", going: [], notification: false}]
		}
		]
	}
	]
};

function getData() {
	return scheduledata.days;
}
