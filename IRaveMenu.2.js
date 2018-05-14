
	var lastscreens=[];
	var currentOrder=[];
	var tid=setInterval(drawDateandHours, 1000);
	var username = "Eu";

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
			onclick: "openScreen('FoodStandsScreen')"
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
		if(screename=="NotificationOptions"){
			drawNotificationOptions();
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
		if(screename=="ScheduleScreen"){
			drawScheduleScreen();
		}
		if(screename=="ConcertScreen"){
			drawConcertScreen();
		}
		if(screename=="ConcertNotificationTime"){
			drawConcertNotificationTime();
		}
		if(screename=="FoodStandsScreen"){
			drawFoodStandsScreen();
		}
		if(screename=="OrderTypesScreen"){
			drawOrderTypeScreen();
		}
		if(screename=="ItemsScreen"){
			drawItemsScreen();
		}
		if(screename=="CheckItemScreen"){
			drawCheckItemScreen();
		}
		if(screename=="ConcludeOrderScreen"){
			drawConcludeOrderScreen();
		}
		showScreen(screename);
	}

	//abre o ecra em questao e fecha todos os outros
	function showScreen(screename) {	
		document.getElementById("LockScreen").style.display = "none";
		document.getElementById("MainMenu").style.display = "none";
		document.getElementById("NotificationsMenu").style.display = "none";
		document.getElementById("NotificationOptions").style.display= "none";
		document.getElementById("ContactsMenu").style.display = "none";
		document.getElementById("ContactMenu").style.display = "none";
		document.getElementById("AddContactMenu").style.display = "none";
		document.getElementById("ScheduleMenuDays").style.display = "none";
		document.getElementById("ScheduleScreen").style.display = "none";
		document.getElementById("ConcertScreen").style.display = "none";
		document.getElementById("ConcertNotificationTime").style.display = "none";
		document.getElementById("FoodStandsScreen").style.display = "none";
		document.getElementById("OrderTypesScreen").style.display = "none";
		document.getElementById("ItemsScreen").style.display = "none";
		document.getElementById("CheckItemScreen").style.display = "none";
		document.getElementById("ConcludeOrderScreen").style.display = "none";
		document.getElementById(screename).style.display = "block";
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
			
			if(notification.type=="Concert-notification")
				document.getElementById("NotificationsList").innerHTML += '<li><marquee  class="notification" behavior="scroll" direction="left">Concert of ' + notification.artist + ' at ' + notification.concertTime + '.</marquee>' +' </li>';  
		}
	}


	//MainMenu
	function drawMainMenu(menu) {
		//document.getElementById("MenuOptionsHeader").innerHTML = ""
		document.getElementById("MenuOptionsVals").innerHTML = "";
		for(var option of menu.opcoes) {
			document.getElementById("MenuOptionsVals").innerHTML += '<i > <img  class="' + option.class + ' selectable" id="' + option.id + '" src="' + option.img + '" onclick="'+ option.onclick +'""></i>'; 
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
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		document.getElementById(screen).innerHTML ="";
		for(var notification of notificationsData.notifications){
			if (notification.type=="Location-receive"){
				document.getElementById(screen).innerHTML += '<li class="selectable" class="notificationListed" id="not' + notification.id+ '" onclick="openNotificationScreen('+notification.id+')">' + notification.user + ' is sharing his location with you.</li>';  
			}
			if(notification.type=="Location-send"){
				document.getElementById(screen).innerHTML += '<li class="selectable" class="notificationListed" id="not' + notification.id + '" onclick="openNotificationScreen('+notification.id+')">You are sharing you location with ' + notification.user +'.</li>';
			}
			if(notification.type=="Concert-notification"){
				document.getElementById(screen).innerHTML += '<li class="selectable" class="notificationListed" id="not' + notification.id + '" onclick="openNotificationScreen('+notification.id+')">Concert of ' + notification.artist + ' at ' + notification.concertTime + '.</li>';
			}
			if(notification.type=="FoodOrder-notification"){
				document.getElementById(screen).innerHTML +=  '<li class="selectable" class="notificationListed" id="not' + notification.id + '" onclick="openNotificationScreen('+notification.id+')">FoodOrder.</li>';
			}
			
		}
	}

	function openNotificationScreen(notificationID){
		localStorage.setItem("Currentnotification", JSON.stringify(notificationID));
		openScreen("NotificationOptions");
	}

	function drawNotificationOptions(){
		document.getElementById("Notification_button1").style.visibility = 'hidden';
		document.getElementById("Notification_button2").style.visibility = 'hidden';
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var notificationID=JSON.parse(localStorage.getItem("Currentnotification"));
		for(var notification of notificationsData.notifications){
			if(notificationID==notification.id){
				if (notification.type=="Location-send") {
					document.getElementById("Notification_button1").style.visibility = 'visible';
					document.getElementById("NotificationInfo").innerHTML="You are sending your location to "+notification.user+".";
					document.getElementById("Notification_button1").innerHTML="Stop sending location";
					document.getElementById("Notification_button1").onclick=function(){removeNotification(notification.id)};
				}
				if (notification.type=="Location-receive") {
					document.getElementById("Notification_button1").style.visibility = 'visible';
					document.getElementById("Notification_button2").style.visibility = 'visible';
					document.getElementById("NotificationInfo").innerHTML="Seeing "+notification.user+"'s location";
					document.getElementById("Notification_button1").innerHTML="See location on map";
					document.getElementById("Notification_button1").onclick=function(){openMap()};
					document.getElementById("Notification_button2").innerHTML="Stop receiving location";
					document.getElementById("Notification_button2").onclick=function(){removeNotification(notification.id)};
				}
				if (notification.type=="Concert-notification") {
					localStorage.setItem("CurrentConcert", JSON.stringify([notification.concertDay, notification.concertStage, notification.concertIndex]));
					document.getElementById("Notification_button1").style.visibility = 'visible';
					document.getElementById("Notification_button2").style.visibility = 'visible';
					document.getElementById("NotificationInfo").innerHTML='<p>'+notification.artist+'</p>';
					document.getElementById("NotificationInfo").innerHTML+='<p>Date:'+notification.concertDay+'</p>';
					document.getElementById("NotificationInfo").innerHTML+='<p>Stage:'+notification.concertStage+'</p>';
					document.getElementById("NotificationInfo").innerHTML+='<p>Time:'+notification.concertTime+'</p>';
					document.getElementById("NotificationInfo").innerHTML+='<p>Notify '+notification.notificationTime+' min before</p>';
					document.getElementById("Notification_button1").innerHTML="Set Timer";
					document.getElementById("Notification_button1").onclick=function(){openScreen("ConcertNotificationTime");};
					document.getElementById("Notification_button2").innerHTML="Delete Notification";
					document.getElementById("Notification_button2").onclick=function(){removeNotification(notification.id)};

				}
				if(notification.type=="FoodOrder-notification"){
					document.getElementById("NotificationInfo").innerHTML='<p>Your order:</p>';
					for(item of notification.order){
						document.getElementById("NotificationInfo").innerHTML+='<p>'+item.stand+'->'+item.name+' price='+item.price+'€'+'</p>';
					}
					document.getElementById("NotificationInfo").innerHTML+='<p>Hours of the order:'+notification.orderTime+'</p>';
				}
			}
		}
	}

	function removeNotification(notificationID){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		for (let i=0; i < notificationsData.notifications.length ; i ++) {
			if (notificationsData.notifications[i].id==notificationID){
				index_notification=i;
				if(notificationsData.notifications[index_notification].type=="Concert-notification"){
					var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
					currentSchedule.days[notificationsData.notifications[i].concertDay].stages[notificationsData.notifications[i].concertStage].concerts[notificationsData.notifications[i].concertIndex].notification = false;
				}
			}
		}
		notificationsData.notifications.splice(index_notification,1);  
		loadNotifications(notificationsData);
		loadSchedule(currentSchedule);
		backbutton();
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
		document.getElementById("ScheduleDaysTitle").innerHTML = 'Schedule';
		for(i=0; i<currentSchedule.days.length; i++){
			day=currentSchedule.days[i];
			document.getElementById("Days").innerHTML += '<div id="'+day.day+'">'+day.name+'</div>';	
			for(j=0; j<currentSchedule.days[i].stages.length; j++){
				stage=currentSchedule.days[i].stages[j];
				document.getElementById(day.day).innerHTML += '<div class="selectable stage" id="sta'+stage.stage+'" onclick="openScheduleScreen('+i+', '+j+')">'+stage.name+'</div>';	
			}
		}
	}


	function openScheduleScreen(index_day, index_stage){
		localStorage.setItem("Currentstage", JSON.stringify([index_day, index_stage]));	
		openScreen("ScheduleScreen");
	}

	function drawScheduleScreen(){
		document.getElementById("Shows").innerHTML = "";
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var index_day = JSON.parse(localStorage.getItem("Currentstage"))[0];
		var index_stage = JSON.parse(localStorage.getItem("Currentstage"))[1];
		document.getElementById("ScheduleTitle").innerHTML = currentSchedule.days[index_day].name + '-' +currentSchedule.days[index_day].stages[index_stage].name;
		for (i=0; i<currentSchedule.days[index_day].stages[index_stage].concerts.length; i++) {
			var concert = currentSchedule.days[index_day].stages[index_stage].concerts[i];
			document.getElementById("Shows").innerHTML += '<div class="concert selectable" onclick="openConcertScreen('+index_day+','+index_stage+','+i+')">'+concert.time + "</br>" + concert.artist+'</div>';	
		}
	}

	function openConcertScreen(day, stage, concert_index) {
		localStorage.setItem("CurrentConcert", JSON.stringify([day, stage, concert_index]));
		openScreen("ConcertScreen");
	}

	function drawConcertScreen(){
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];
		document.getElementById("ArtistName").innerHTML = currentSchedule.days[day].stages[stage].concerts[concert_index].artist;
		document.getElementById("ArtistStage").innerHTML = currentSchedule.days[day].stages[stage].name;
		document.getElementById("ArtistTime").innerHTML =  currentSchedule.days[day].stages[stage].concerts[concert_index].time;
		ConcertScreen_updateStatus();
	}

	function ConcertScreen_updateStatus() {
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];

		document.getElementById("FriendsGoing").innerHTML = "" + currentSchedule.days[day].stages[stage].concerts[concert_index].going.length + " friends going";
		if (currentSchedule.days[day].stages[stage].concerts[concert_index].notification) {
			document.getElementById("AddConcertNotification").innerHTML = "Cancel Notify";
			document.getElementById("AddConcertNotification").style.backgroundColor = "#FF0000";
		} else {
			document.getElementById("AddConcertNotification").innerHTML = "Notify";
			document.getElementById("AddConcertNotification").style.backgroundColor = "#38a7d3";
		}

		if (currentSchedule.days[day].stages[stage].concerts[concert_index].going.includes(username)) {
			document.getElementById("SetGoing").innerHTML = "I'm not going!";
			document.getElementById("SetGoing").style.backgroundColor = "#FF0000";
		} else {
			document.getElementById("SetGoing").innerHTML = "I'm going!";
			document.getElementById("SetGoing").style.backgroundColor = "#38a7d3";
		}
	}

	function verifyConcertNotification() {
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];

		if (currentSchedule.days[day].stages[stage].concerts[concert_index].notification) {
			//erase:
			currentSchedule.days[day].stages[stage].concerts[concert_index].notification = false;
			for (var i=notificationsData.notifications.length-1; i>=0; i--) {
				if (notificationsData.notifications[i].type === "Concert-notification") {
					notificationsData.notifications.splice(i, 1);
					break;
				}
			}
		} else {
			openScreen("ConcertNotificationTime");
		}
		loadNotifications(notificationsData);
		localStorage.setItem("Schedule", JSON.stringify(currentSchedule));
		ConcertScreen_updateStatus();
	}
	function drawConcertNotificationTime(){
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];
		document.getElementById("TimesofNotification").innerHTML='';
		if(lastscreens[lastscreens.length-2]=="ConcertScreen"){
			for(i=0; i<notificationsData.times.length; i++){
				document.getElementById("TimesofNotification").innerHTML += '<li class="selectable button" id="NotificationTime" onclick="addConcertNotification('+notificationsData.times[i]+')">' +notificationsData.times[i]+'min</li>';  
			}
		}
		if(lastscreens[lastscreens.length-2]=="NotificationOptions"){
			for(i=0; i<notificationsData.times.length; i++){
				document.getElementById("TimesofNotification").innerHTML += '<li class="selectable" id="NotificationTime" onclick="redifineTime('+notificationsData.times[i]+')">' +notificationsData.times[i]+'min</li>';  
			}
		}
	}

	function addConcertNotification(notTime){
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];
		currentSchedule.days[day].stages[stage].concerts[concert_index].notification = true;
		notificationsData.notifications.push({
			id: Math.random(),
			type:"Concert-notification",
			artist:currentSchedule.days[day].stages[stage].concerts[concert_index].artist,
			concertTime:currentSchedule.days[day].stages[stage].concerts[concert_index].time,
			concertDay:day,
			concertStage:stage,
			notificationTime:notTime,
			concertIndex:concert_index
		});
		loadNotifications(notificationsData);
		localStorage.setItem("Schedule", JSON.stringify(currentSchedule));
		backbutton();
	}

	function redifineTime(time){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		var notificationID=JSON.parse(localStorage.getItem("Currentnotification"));
		for(var notification of notificationsData.notifications){
			if(notificationID==notification.id){
				notification.notificationTime=time;
			}
		}
		loadNotifications(notificationsData);
		backbutton();
	}

	
	function setGoingToConcert() {
		var currentSchedule = JSON.parse(localStorage.getItem("Schedule"));
		var day = JSON.parse(localStorage.getItem("CurrentConcert"))[0];
		var stage = JSON.parse(localStorage.getItem("CurrentConcert"))[1];
		var concert_index = JSON.parse(localStorage.getItem("CurrentConcert"))[2];
		if (currentSchedule.days[day].stages[stage].concerts[concert_index].going.includes(username)) {
			for (var i=currentSchedule.days[day].stages[stage].concerts[concert_index].going.length-1; i>=0; i--) {
				if (currentSchedule.days[day].stages[stage].concerts[concert_index].going[i] === username) {
					currentSchedule.days[day].stages[stage].concerts[concert_index].going.splice(i, 1);
					break;
				}
			}
		} else {
			currentSchedule.days[day].stages[stage].concerts[concert_index].going.push(username);
		}
		localStorage.setItem("Schedule", JSON.stringify(currentSchedule));
		ConcertScreen_updateStatus();
	}

	function drawFoodStandsScreen(){
		document.getElementById("StandsList").innerHTML = '';
		document.getElementById("numItems1").innerHTML = currentOrder.length;
		var foodstands = JSON.parse(localStorage.getItem("FoodStands"));
		for(i=0; i<foodstands.stands.length; i++){
			stand=foodstands.stands[i];
			document.getElementById("StandsList").innerHTML += '<div id="stand'+stand.name+'" class="selectable" onclick="openOrderTypeScreen('+i+')">'+stand.name+'</div>';	
		}
	}

	function openOrderTypeScreen(standindex){
		localStorage.setItem("Currentstand", JSON.stringify(standindex));
		openScreen("OrderTypesScreen");
	}

	function drawOrderTypeScreen(){
		document.getElementById("numItems2").innerHTML = currentOrder.length;
		var foodstands = JSON.parse(localStorage.getItem("FoodStands"));
		var standindex = JSON.parse(localStorage.getItem("Currentstand"));
		document.getElementById("OrderTypesList").innerHTML="";
		document.getElementById("StandName").innerHTML=foodstands.stands[standindex].name;
		for(i=0; i< foodstands.stands[standindex].item_types.length; i++){
			type=foodstands.stands[standindex].item_types[i];
			document.getElementById("OrderTypesList").innerHTML += '<div class="selectable" id="type'+type.name+'" onclick="openItemsScreen('+i+')">'+type.name+'</div>';	
		}
	}

	function openItemsScreen(typeindex){
		localStorage.setItem("Currenttype", JSON.stringify(typeindex));
		openScreen("ItemsScreen");
	}

	function drawItemsScreen(){
		document.getElementById("numItems3").innerHTML = currentOrder.length;
		var foodstands = JSON.parse(localStorage.getItem("FoodStands"));
		var standindex = JSON.parse(localStorage.getItem("Currentstand"));
		var typeindex = JSON.parse(localStorage.getItem("Currenttype"));
		document.getElementById("FoodsList").innerHTML="";
		for(i=0; i<foodstands.stands[standindex].item_types[typeindex].items.length; i++) {
			item=foodstands.stands[standindex].item_types[typeindex].items[i];
			document.getElementById("FoodsList").innerHTML += '<div class="selectable" id="item'+item.name+'" onclick="openFoodInfoScreen('+i+')">'+item.name+'</div>';
		}
	}

	function openFoodInfoScreen(itemIndex){
		localStorage.setItem("CurrentItem", JSON.stringify(itemIndex));
		openScreen("CheckItemScreen");
	}

	function drawCheckItemScreen(){
		document.getElementById("numItems4").innerHTML = currentOrder.length;
		var foodstands = JSON.parse(localStorage.getItem("FoodStands"));
		var standindex = JSON.parse(localStorage.getItem("Currentstand"));
		var typeindex = JSON.parse(localStorage.getItem("Currenttype"));
		var itemindex = JSON.parse(localStorage.getItem("CurrentItem"));
		item = foodstands.stands[standindex].item_types[typeindex].items[itemindex];
		document.getElementById("ItemInfo").innerHTML = '<p>'+item.name+'</p>';
		document.getElementById("ItemInfo").innerHTML += '<p>'+(item.description||"")+'</p>';
		document.getElementById("ItemInfo").innerHTML += '<p>Price:'+item.price+'</p>';
	}

	function checkItem(){
		var foodstands = JSON.parse(localStorage.getItem("FoodStands"));								
		var standindex = JSON.parse(localStorage.getItem("Currentstand"));
		var typeindex = JSON.parse(localStorage.getItem("Currenttype"));
		var itemindex = JSON.parse(localStorage.getItem("CurrentItem"));
		item = foodstands.stands[standindex].item_types[typeindex].items[itemindex];
		currentOrder.push({
			stand:foodstands.stands[standindex].name,
			name:item.name,
			price:item.price
		});
		console.log(currentOrder);
		backbutton();
	}

	/*function removeItem(){

	}*/
	function drawConcludeOrderScreen(){
		document.getElementById("ItemsList").innerHTML='';
		/*document.getElementById("ConcludeOrderMensage").innerHTML='By checking you will be sharing your location with:';*/
		var total_price=0;
		for(item of currentOrder){
			document.getElementById("ItemsList").innerHTML+=item.stand+'->'+item.name+' price='+item.price+'€';
			/*document.getElementById("ConcludeOrderMensage").innerHTML+=item.stand;*/
			total_price+=item.price;
		}
		document.getElementById("totalPrice").innerHTML=total_price;
	}

	function checkOrder(){
		var notificationsData = JSON.parse(localStorage.getItem("NotificationsData"));
		notificationsData.notifications.push({
			id: Math.random(),
			type:"FoodOrder-notification",
			order:currentOrder,
			orderTime:getTime()
		});
		currentOrder=[];
		loadNotifications(notificationsData);
		backbutton();
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

	function loadFoodStands(foodstandsData){
		localStorage.setItem("FoodStands", JSON.stringify(foodstandsData));
	}

	window.addEventListener('DOMContentLoaded', function() {
		loadContacts(contactsdata);
		loadNotifications(notificationsdata);
		loadSchedule(scheduledata);
		loadFoodStands(foodstandsData);
		drawNotificationsList("NotificationsList2");
		openScreen("LockScreen");
	})
