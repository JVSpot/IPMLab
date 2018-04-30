
	var lastscreens=[];
	var tid=setInterval(drawDateandHours, 1000);

	var menu1 = {
		title: "Menu Principal",
		text: "Escolha uma opcao",
		opcoes: [
		{
			id: "Map",
			img: "icons/map.png",
			texto: "Map",
			class: "menuIcon",
			onclick: "information('Em desenvolvimento')"
		},
		{
			id: "Schedule",
			img: "icons/schedule.png",
			texto: "Schedule",
			class: "menuIcon",
			onclick: "openScreen('ScheduleMenuDays')"
		},
		{
			id: "Contacts",
			img: "icons/contacts.png",
			texto: "Contacts",
			class: "menuIcon",
			onclick: "openScreen('ContactsMenu')"
		},
		{
			id: "OrderMe",
			img: "icons/food.png",
			texto: "OrderMe",
			class: "menuIcon",
			onclick: "information('Em desenvolvimento')"
		},
		{
			id: "Definition",
			img: "icons/settings.png",
			texto: "Definitions",
			class: "menuIcon",
			onclick: "information('Em desenvolvimento')"
		}
		]
	}

	//screen functions

	//função que prepara o ecra que se deseja abrir e adiciona-o a lista de ecras abertos
	function openScreen(screename){   
		lastscreens.push(screename);
		if(screename=="LockScreen"){
			drawDateandHours();
			notificationsls();
		}
		if(screename=="MainMenu"){
			setNotificationsNum()
			drawMainMenu(menu1);
		};	
		if(screename=="NotificationsMenu"){
			drawNotificationsList("NotificationsList2");
		}
		if(screename=="ContactsMenu"){
	    	drawContactsMenu();
		};
		if(screename=="ContactMenu"){
			//loadContacts(contactsdata);
			drawContactMenu();
		};
		if(screename=="ScheduleMenuDays"){
			drawScheduleMenuDays();
		}
		if(screename=="ScheduleMenuStages"){
			drawScheduleMenuStages();
		}
		if(screename=="ScheduleScreen"){
			drawScheduleScreen();
		}
		showScreen(screename);

	}

	//abre o ecra em questao e fecha todos os outros
	function showScreen(screename) {	
		document.getElementById("LockScreen").style.display = "none";
		document.getElementById("MainMenu").style.display = "none";
		document.getElementById("NotificationsMenu").style.display = "none";
		document.getElementById("ContactsMenu").style.display = "none";
		document.getElementById("ContactMenu").style.display = "none";
		document.getElementById("AddContactMenu").style.display = "none";
		document.getElementById("ScheduleMenuDays").style.display = "none";
		document.getElementById("ScheduleMenuStages").style.display = "none";
		document.getElementById("ScheduleScreen").style.display = "none";
		document.getElementById(screename).style.display = "block";
		console.log(screename);
	}


	//button functions


	function lockbutton(){
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		if(LockScreen.style.display=="block"){
			openScreen("MainMenu");
		}
		else{
			lastscreens=[];
			openScreen("LockScreen");
		};
	}

	function backbutton(){	
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		if(LockScreen.style.display!="block" ){
			if(lastscreens[lastscreens.length-2]!="LockScreen"){ //verifica se o ecra nao é o de bloqueio nem se o anterior é
				lastscreens.pop();                                //remove o ecra atual do array
				var lastscreen=lastscreens.pop();				  //remove o ecra anterior do array e guarda-o para o abrir
				openScreen(lastscreen);	
			}	
			else{
				openScreen("NotificationsMenu");
			};
		}	
	}

	//botao yes para mensagens de aviso
	function allow(){
		var currentmsg = JSON.parse(localStorage.getItem("Msg"));
		if (document.getElementById("ConfirmationMsg").style.display=="block"){
			var currentcontact = JSON.parse(localStorage.getItem("CurrentContact"));
			document.getElementById("buttons_confirm").style.visibility = 'hidden';
			document.getElementById("ShareLocalization").style.display = "none";
			document.getElementById("DeleleContact").style.display = "none";	
			
			if (currentmsg=="sharelocalization"){			//caso seja a mensagem de aviso de partilhar localização
				lastscreens.pop();
				document.getElementById("ConfirmationMsg").onclick= function(){opencontactscreen(currentcontact);};
				var notification = {id:'', type:'Location-send', user:currentcontact};
				var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
				var numNotifications=Object.keys(notificationsData.notifications).length
				notification.id=numNotifications;
				notificationsData.notifications.push(notification);
				loadNotifications(notificationsData);
				document.getElementById("ConfirmationMsg").innerHTML ='<div id="ConfirmationMsg"> Your location is being shared with ' + currentcontact +'.</div>'; 		
			}
			if(currentmsg=="delelecontact"){				//caso seja a mensagem de eliminacao de contacto
				var contactsData = JSON.parse(localStorage.getItem("AllContactsData"));
				var num_contacts = contactsData.contacts.length;
				var index_contact;
				for(let i=0; i<num_contacts; i++){
					if (contactsData.contacts[i].name==currentcontact)
						index_contact=i;
				};
				contactsData.contacts.splice(index_contact,1);  
				loadContacts(contactsData);
				document.getElementById("ConfirmationMsg").innerHTML +='<div id="ConfirmationMsg"> You delete ' + currentcontact +'.</div>';
				document.getElementById("ConfirmationMsg").onclick = function(){openScreen("ContactsMenu")};
				backbutton();
			}
		}
	}	

	//botao no para mensagems de aviso
	function deny(){
		var lastscreen=lastscreens.pop();
		openScreen(lastscreen);
	}

	//LockScreen
	function getTime(){
	    var d = new Date();
	    var h = addZero(d.getHours());
	    var m = addZero(d.getMinutes());
	    var s = addZero(d.getSeconds());
	    return (h + ":" + m + ":" + s);
	}

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}
	function getcurrentDate(){
		var today = new Date();
		var dd = addZero(today.getDate());
		var mm = addZero(today.getMonth()+1);
		var yyyy = today.getFullYear();
		return (mm + '/' + dd + '/' + yyyy);
	}

	function drawDateandHours(){
		var hours = getTime();
		var date = getcurrentDate();
		document.getElementById("LSDate").innerHTML = "";
		document.getElementById("LSDate").innerHTML += '<div id="LSDate">' + date +'</div>';
		document.getElementById("LSHours").innerHTML = "";
		document.getElementById("LSHours").innerHTML += '<div id="LSHours">' + hours +'</div>';
	}

	function notificationsls(){
	var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
	document.getElementById("NotificationsList").innerHTML ="";
		for(var notification of notificationsData.notifications){
			if (notification.type=="Location-receive")
				document.getElementById("NotificationsList").innerHTML += '<li><marquee  class="notification" behavior="scroll" direction="left">' + notification.user + ' is sharing his location with you.</marquee>' +' </li>';  
				
			if(notification.type=="Location-send")
				document.getElementById("NotificationsList").innerHTML += '<li><marquee  class="notification" behavior="scroll" direction="left">You are sharing you location with ' + notification.user + '.</marquee>' +' </li>';  
		}
	}


	//MainMenu
	function drawMainMenu(menu) {
		//document.getElementById("MenuOptionsHeader").innerHTML = ""
		document.getElementById("MenuOptionsVals").innerHTML = "";
		for(var option of menu.opcoes) {
			document.getElementById("MenuOptionsVals").innerHTML += '<i > <img  class="' + option.class + ' selectable" id="' + option.id + '" src="' + option.img + '" onclick="'+ option.onclick +'" onmouseover="setMainMenuText(\''+ option.texto+'\')"></i>'; 
		}
	}

	function setMainMenuText(s)
	{
		document.getElementById("iconName").innerHTML = s;
	}

	function setNotificationsNum(){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		document.getElementById("notificationNum").innerHTML= notificationsData.notifications.length+'!';
	}


	//ContactsMenu

	function drawContactsMenu(){
		var contactsData = JSON.parse(localStorage.getItem("AllContactsData"));
		var num_contacts = contactsData.contacts.length;
		document.getElementById("ContactsName").innerHTML = "";
		if(num_contacts != null){
			for(let i=0; i<num_contacts; i++){
				document.getElementById("ContactsName").innerHTML += '<li class="selectable" onclick="' +contactsData.contacts[i].onclick +'"> <div class="'+contactsData.contacts[i].class+ '" id="' + contactsData.contacts[i].name + '">'+ contactsData.contacts[i].name+'</div> </li>'; 
			}
		}
	}


	//ContactMenu

	function opencontactscreen(contact){
		localStorage.setItem("CurrentContact", JSON.stringify(contact));		//guarda na localstorage o contacto que se prentende abrir para se poder aceder ao mesmo mais facilmente
		
		openScreen("ContactMenu");
	}

	function drawContactMenu(){
		var contactsData = JSON.parse(localStorage.getItem("AllContactsData"));
		var currentcontact = JSON.parse(localStorage.getItem("CurrentContact"));
		var num_contacts = contactsData.contacts.length;
		document.getElementById("ConfirmationMsg").innerHTML = "";
		document.getElementById("ContactName").innerHTML = "";
		document.getElementById("ContactNumber").innerHTML = "";
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		document.getElementById("ShareLocalization").style.display = "block";
		document.getElementById("DeleleContact").style.display = "block";
		document.getElementById("ConfirmationMsg").onclick= null;
		if(num_contacts != null){
			for(let i=0; i<num_contacts; i++){
				if (contactsData.contacts[i].name==currentcontact){
					document.getElementById("ContactName").innerHTML += '<div id="ContactName">' + contactsData.contacts[i].name + ' </div>'; 
					document.getElementById("ContactNumber").innerHTML += '<div id="ContactNumber"> Number:'+contactsData.contacts[i].number+'</div>'; 
				}
			}
		}
		else{
			alert("You don't have contacts added");
		}
	}

		//mostra no visor mensagens de alerta para confirmar acoes (neste cado a partilha de localizacao e o apagar contacto)
	function confirmation(type){
		localStorage.setItem("Msg", JSON.stringify(type));
		var currentcontact = JSON.parse(localStorage.getItem("CurrentContact"));
		document.getElementById("ConfirmationMsg").innerHTML = "";
		if(type=="sharelocalization"){
			var notification = {id:'', type:'Location-send', user:currentcontact};
			if (verifyNotification(notification)==true){
				document.getElementById("ConfirmationMsg").innerHTML +='<div id="ConfirmationMsg"> Share location with ' + currentcontact +'?</div>';
			}
			else{
				document.getElementById("ConfirmationMsg").innerHTML ='<div id="ConfirmationMsg"> You are already sharing your location with ' + currentcontact +'.</div>';
				document.getElementById("ConfirmationMsg").onclick= function(){opencontactscreen(currentcontact);};
				var lastscreen=lastscreens.pop();
				document.getElementById("ShareLocalization").style.display = "none";
				document.getElementById("DeleleContact").style.display = "none";
				return(0); 
			}
		}
		if(type=="delelecontact"){
			document.getElementById("ConfirmationMsg").innerHTML +='<div id="ConfirmationMsg"> Delete ' + currentcontact +'?</div>';
		}
		document.getElementById("ShareLocalization").style.display = "none";
		document.getElementById("DeleleContact").style.display = "none";
		document.getElementById("ConfirmationMsg").style.display = "block";
		document.getElementById("buttons_confirm").style.visibility = 'visible';
		document.getElementById("Yes_button").onclick=function(){allow()};

	}


	//notifications

	function drawNotificationsList(screen){
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		document.getElementById("NotificationOptions").innerHTML="";
		document.getElementById("NotificationOptions").style.display="none";
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		document.getElementById(screen).innerHTML ="";
		for(var notification of notificationsData.notifications){
			if (notification.type=="Location-receive"){
				document.getElementById(screen).innerHTML += '<li class="selectable" class="notificationListed" id="not' + notification.id+ '" onclick="notificationOptions('+notification.id+')">' + notification.user + ' is sharing his location with you.</li>';  
			}
			if(notification.type=="Location-send"){
				document.getElementById(screen).innerHTML += '<li class="selectable" class="notificationListed" id="not' + notification.id + '" onclick="notificationOptions('+notification.id+')">You are sharing you location with ' + notification.user +'.</li>';
			}
		}
	}

	function notificationOptions(notificationID){
		document.getElementById("buttons_confirm").style.visibility = 'visible';
		document.getElementById("NotificationsList2").innerHTML="";
		document.getElementById("NotificationOptions").style.display="block";
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		localStorage.setItem("currentnotification", JSON.stringify(notification));
		for(var allnotification of notificationsData.notifications){
			if(notificationID==allnotification.id){
				var notification = allnotification;
				console.log(notification.id);
				if (notification.type=="Location-send") {
					document.getElementById("NotificationOptions").innerHTML="Do you want to stop sending your location to "+notification.user+"?";
					document.getElementById("Yes_button").onclick=function(){removeNotification(notification.id)};
				}
				if (notification.type=="Location-receive") {
					document.getElementById("NotificationOptions").innerHTML="Do you want to see "+notification.user+" location?";
					document.getElementById("Yes_button").onclick=function(){getLocalization(notification.id)};
				}
			}
		}
	}

	function removeNotification(notificationID){
		console.log("ola");
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		for (let i=0; i < notificationsData.notifications.length ; i ++) {
			if (notificationsData.notifications[i].id==notificationID)
				index_notification=i;
		}
		notificationsData.notifications.splice(index_notification,1);  
		loadNotifications(notificationsData);
		document.getElementById("NotificationOptions").innerHTML = "";
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		drawNotificationsList("NotificationsList2");
		console.log(lastscreens);
	}

	function getLocalization(notificationID){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		for (notification of notificationsData.notifications) {
			if (notification.id==notificationID)
				document.getElementById("NotificationOptions").innerHTML='<div id=NotificationOptions"> Localization of '+notification.user+'</div>';
		}		
		document.getElementById("NotificationOptions").onclick = function(){drawNotificationsList("NotificationsList2");};
		document.getElementById("buttons_confirm").style.visibility = 'hidden';
		console.log(lastscreens);
	}

	function verifyNotification(n){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		for(var notification of notificationsData.notifications){
			if (notification.type==n.type && notification.user==n.user)
				return false;
		}
		return true;
	}


	//schedulemenu


	function drawScheduleMenuDays(){
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		document.getElementById("Days").innerHTML = "";
		document.getElementById("ScheduleDaysTitle").innerHTML = 'Days';
		for(var days of currentSchedule.days){
			document.getElementById("Days").innerHTML += '<div id="'+days.day+'" onclick="openScheduleStagesscreen('+days.day+')">'+days.day+'</div>';	
		}
	}

	function openScheduleStagesscreen(day){
		localStorage.setItem("Currentday", JSON.stringify(day));
		openScreen("ScheduleMenuStages");
	}

	function drawScheduleMenuStages(){
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var currentday = JSON.parse(localStorage.getItem("Currentday"));
		var index_schedule= currentday-1;
		document.getElementById("ScheduleStagesTitle").innerHTML = 'Stages';
		document.getElementById("Stages").innerHTML = '';
		for(var stages of currentSchedule.days[index_schedule].stages){
			console.log(stages.stage);	
			document.getElementById("Stages").innerHTML += '<div id="sta'+stages.stage+'" onclick="openScheduleScreen('+stages.stage+')">'+stages.stage+'</div>';	
		}
	}

	function openScheduleScreen(stage){
		localStorage.setItem("Currentstage", JSON.stringify(stage));	
		openScreen("ScheduleScreen");
	}

	function drawScheduleScreen(){
		console.log("ola");
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var currentday = JSON.parse(localStorage.getItem("Currentday"));
		var currentstage = JSON.parse(localStorage.getItem("Currentstage"));
		document.getElementById("ScheduleTitle").innerHTML = currentday+'-'+currentstage;
		console.log("ola");
	}
	//others

	function information(msg) {
		alert(msg);
	}
	function loadContacts(contactsData){
		localStorage.setItem("AllContactsData", JSON.stringify(contactsData));
	}

	function loadNotifications(notificationsData){
		localStorage.setItem("NotificationsData", JSON.stringify(notificationsData));
	}

	function loadSchedule(scheduleData){
		localStorage.setItem("Schedule", JSON.stringify(scheduleData));
	}
	window.addEventListener('DOMContentLoaded', function() {
		loadContacts(contactsdata);
		loadNotifications(notificationsdata);
		loadSchedule(scheduledata);
		drawNotificationsList("NotificationsList2");
		openScreen("LockScreen");
	})
