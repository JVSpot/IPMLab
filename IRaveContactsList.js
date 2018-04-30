var contactsdata = { 

	contacts : [

	{
		name:"Afonso",
		class:"Contact",
		number:"96000002",
		onclick: "opencontactscreen('Afonso')"
	},

	{
		name:"Antonio",
		class:"Contact",
		number:"96000001",
		onclick: "opencontactscreen('Antonio')"

	},
	{
		name:"Carlos",
		class:"Contact",
		number:"96000004",
		onclick: "opencontactscreen('Carlos')"
	},

	{
		name:"Joao",
		class:"Contact",
		number:"96000002",
		onclick: "opencontactscreen('Joao')"
	},

	{
		name:"Miguel",
		class:"Contact",
		number:"96000003",
		onclick: "opencontactscreen('Miguel')"
	},

	
	{
		name:"Pedro",
		class:"Contact",
		number:"96000004",
		onclick: "opencontactscreen('Pedro')"
	},

	{
		name:"Rui",
		class:"Contact",
		number:"96000003",
		onclick: "opencontactscreen('Rui')"
	}
	
]
};


function getData() {
	return contactsdata.contacts;
}
