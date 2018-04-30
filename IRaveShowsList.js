var scheduledata = { 

	days:[
	{	
		day:'1',
		stages:[
		{
			stage:'A',
			concerts:[{time:"18:30", artist:"Band1"}, {time:"20:30", artist:"Band2"}, {time:"22:30", artist:"Band3"}, {time:"00:30", artist:"Band4"}]
		},
		{
			stage:'B',
			concerts:[{time:"19:30", artist:"Band1"}, {time:"21:00", artist:"Band2"}, {time:"22:30", artist:"Band3"}, {time:"00:00", artist:"Band4"}]
		}
		]
	},
	{	
		day:'2',
		stages:[
		{
			stage:'A',
			concerts:[{time:"18:30", artist:"Band5"}, {time:"20:30", artist:"Band6"}, {time:"22:30", artist:"Band7"}, {time:"00:30", artist:"Band8"}]
		},
		{	
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
