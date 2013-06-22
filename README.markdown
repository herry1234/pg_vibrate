#PG_VIBRATE

You are going to create a web app that takes advantage of Cordova's access to the vibration feature on compatible devices.

- Draw a mockup using moqups.com
- Construct the markup
- Make it look good for a mobile device using CSS
- Keyframe animate the screen upon the click event based on the slider using jQuery
- Bring in phonegap.js, alert on device ready, and test in ripple
- Set up fallback so it works as a web app and a hybrid app6
- Set up configuration file ready for production
- Push to the web using using the QR reader
- Test your webapp using Adobe Inspect
- Beautify the css for the device you are on
- Push to phonegap build and install the app on your phone
- Test your app physically


#isues
I want one code base that is run through grunt
The same git pull should be on my server (serving HTML5 apps), as is on my localhost dev machine, as is on my localhost dev machine running ripple.


- You go to phonegap build, pull latest, and press build, push it to the app store for new approval (only if config changed), else just update JSON on the server (Autoupdates).

Once approved push latest to app store. And trigger an update required via JSON, so existing users will be forced to get their version update.


If you are running a version number higher that the version.json (say you may experience issues with this app until DATE when we update our servers).

#single code base

//bottom of index.html after jquery.js etc
//whether to load PG file, set an app constant

var APP_PRODUCTION_TYPE = null;

	if(location.protcol === "file://"){
		alert("phonegap in production");
		document.write("<script src="phonegap.js"></script>");
		//this file does not exist in your repo it is injected when needed by build
	}else{
		//not phonegap in production
		//hence localhost (HTML5 dev or PG dev) or HTML5 in production
		if(location.pathname !== "localhost"){
			alert("HTML5 app in domain name production");
		}else{
			//localhost either HTML5 development or PG development
			if(location.pathname === "localhost" && window.ripple){
				alert("PG dev");
			}else{
				alert("HTML5 dev env");
			}
		}
	}

	//APP.PRODUCTION_TYPE cannot be null here
	alert(APP_PRODUCTION_TYPE);
//load your JS and init on device ready (if applicable)






