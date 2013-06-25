var App = {};

App.Vibrate = (function(){
	var _vibrate_duration = 1;

	function setVibrateDuration(){
		var s = "s";
		_vibrate_duration = parseInt($(this).val(), 10);
		if(_vibrate_duration === 1){
			s = "";
		}
		$("[data-page='vibrate'] output").text(_vibrate_duration.toString() + " second" + s);
	}

	function doVibrate(submit_event){
		submit_event.preventDefault();
		$("body > section").addClass("vibrating");
		setTimeout(function(){
			$("body > section").removeClass("vibrating");
		}, _vibrate_duration * 1000);
		try{
			App.Phonegap.Vibrate.doVibrate(_vibrate_duration * 1000);
		}catch(e){
			console.info("Phonegap does not exist right now, if you on the web app you will see an error here it's ok RELAX >  " + e);
		}
	}

	return {
		setVibrateDuration: setVibrateDuration,
		doVibrate: doVibrate	
	}
})();





App.LetsGo = (function(){
	App.Phonegap = {};//looks out no need to expose

	App.Phonegap.Vibrate = (function(){
		function doVibrate(duration_ms){
			var s = "s";
			if(duration_ms === 1000){
				s = "";
			}
			try{
				navigator.notification.vibrate(duration_ms);
			}catch(e){
				alert("App.Phonegap.Vibrate.doVibrate: " + e);
			}
		}

		return {
			doVibrate: doVibrate
		}
	})();
});//DO NOT USE A SIF as you are using a callback

/**
 * Init
 * 
 * Kick the event handlers off
 */
(function init(){
	$("#vibrate_length_input").change(App.Vibrate.setVibrateDuration);
	$("[data-page='vibrate'] form").submit(App.Vibrate.doVibrate);
	$("#toggle").click(function(){
		$(this).toggleClass("clicked");
	});
})();

if(APP_PRODUCTION_TYPE === 1 || APP_PRODUCTION_TYPE === 3){
	document.addEventListener("deviceready", function(){
		console.log("%cPhonegap device is now ready", "background-color: yellowgreen, color: whitesmoke");
		App.LetsGo();
	}, false);
	if(APP_PRODUCTION_TYPE === 1){
		console.log("We are using PG in %cproduction", "color: hotpink");
	}else if(APP_PRODUCTION_TYPE === 3){
		console.log("We are using PG in %cdevelopment", "color: hotpink");
	}else{
		alert("WTF more");
	}
}else{
	if(APP_PRODUCTION_TYPE === 2){
		console.log("We are using HTML5 in %cproduction", "color: hotpink");
	}else if(APP_PRODUCTION_TYPE === 4){
		console.log("We are using HTML5 in %cdevelopment", "color: hotpink");
	}else{
		alert("WTF");
	}
}


