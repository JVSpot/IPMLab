var names = ["Maria","Leonor","Matilde","Beatriz","Carolina","Mariana","Ana","Sofia","Francisca","Inês","Santiago","Francisco","João","Afonso","Rodrigo","Martim","Tomás","Duarte","Miguel","Gabriel"]

function pick_rand_name(){
	return names[ Math.floor( Math.random() * names.length ) + 1 ];
}

function create_new_contact(){
	var cont_num = Math.floor( Math.random() * 9999999 ) + 1;
	var cont_name = pick_rand_name();
	var new_cont = {name : cont_name,
					class:"contact",
					number:"96"+cont_num.toString(),
					onclick:"opencontactscreen('"+cont_name+"')"
				   };
	return new_cont;
}

