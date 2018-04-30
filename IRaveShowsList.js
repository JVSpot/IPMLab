var scheduledata = { 

	days:[
	{	
		name: 'Day 1',
		day:'abcda',
		stages:[
		{
			name:'Stage A',
			stage:'A',
			concerts:[{time:"18:30", artist:"Band1"}, {time:"20:30", artist:"Band2"}, {time:"22:30", artist:"Band3"}, {time:"00:30", artist:"Band4"}]
		},
		{
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Band1"}, {time:"21:00", artist:"Band2"}, {time:"22:30", artist:"Band3"}, {time:"00:00", artist:"Band4"}]
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
			concerts:[{time:"18:30", artist:"Band5"}, {time:"20:30", artist:"Band6"}, {time:"22:30", artist:"Band7"}, {time:"00:30", artist:"Band8"}]
		},
		{	
			name:'Stage B',
			stage:'B',
			concerts:[{time:"19:30", artist:"Band5"}, {time:"21:00", artist:"Band6"}, {time:"22:30", artist:"Band7"}, {time:"00:00", artist:"Band8"}]
		}
		]
	}
	]
};

function getData() {
	return scheduledata.days;
}
