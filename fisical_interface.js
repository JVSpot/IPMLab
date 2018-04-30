//Interaction via "fisical buttons"


function option_selector(optionID){
	document.getElementById("scroll_ok").onclick = document.getElementById(optionID).onclick;
	document.getElementById(optionID).style.borderColor = "white";
}

function option_deselector(optionID){
	document.getElementById(optionID).style.borderColor = 'transparent';
}

function scroll_up(option_array,array_index){
	var next_option;
	if (array_index == 0){
		next_option = option_array.length - 1;
	}
	else{
		next_option = array_index - 1;
	}
	document.getElementById("scroll_up").onclick = scroll_up(option_array,next_option);
	option_deselector(option_array[array_index]);
	option_selector(option_array[ next_option ]);
}

function scroll_down(option_array,array_index){
	var next_option;
	if (array_index == option_array.length - 1){
		next_option = 0;
	}
	else{
		next_option = array_index + 1;
	}
	document.getElementById("scroll_down").onclick = scroll_down(option_array,next_option);
	option_deselector(option_array[array_index]);
	option_selector(option_array[ next_option ]);
}

function set_selection_array(option_array){
	option_selector(option_array[0]);
	document.getElementById("scroll_down").onclick = scroll_down(option_array,0);
	document.getElementById("scroll_up").onclick = scroll_up(option_array,0);
}
