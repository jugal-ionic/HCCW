/*********************

Authors:
	Luis Rodrigues

Description:
	Main application script

*********************/

var parseIds = {
		"127.0.0.1":{
			appId: '3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT',
			jsKey: 'SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu'
		},
		"192.168.10.100":{
			appId: '3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT',
			jsKey: 'SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu'
		},
		"cubanweekender.co.uk":{
			appId: '3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT',
			jsKey: 'SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu'
		},
		"www.cubanweekender.co.uk":{
			appId: '3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT',
			jsKey: 'SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu'
		},
		"hccw2016.parseapp.com":{
			appId: '3gF3K1Hv9nHFSkntYWGpCJGpEcENVNepL6hXe4YT',
			jsKey: 'SWp0jlfH6G5tN9H9TWjN74AKPPJg0SuudVyB3Klu'
		}
	},
	parseId = {
		appId: '',
		jsKey: ''
	}; // default (invalid host)                

if(!parseIds[window.location.host.replace('/', '')]) {
	console.error('Parse ID error: Host not valid (no Parse id defined).');
} else {
	parseId = parseIds[window.location.host.replace('/', '')];
}

Parse.initialize(parseId['appId'], parseId['jsKey']);

window.getCookie = function(name) {
	
	var name = name;
	match = document.cookie.match(new RegExp(name + '=([^;]+)'));
	if (match) return match[1];

};

function setCookie(){

	var cssString = "margin-top: 0px; transition: all 0.2s ease-in;";

	document.getElementById('app').style.cssText = cssString;

	document.getElementById('cookieWrap').style.display = "none";
    document.cookie = "HavanaClubCookie2016 = accepted";

}

function hideErrorWrapper(){
	var errorWrapper = document.getElementById('error-overlay');
	errorWrapper.style.display = 'none';
}

function App() {

	var screenMngr;

	this.destroy = function() {

		if (screenMngr) {
			screenMngr.destroy();
		}

		window.removeEventListener('unload', this.destroy);

	};

	this.checkCookie = function(){
		
		var cookie = window.getCookie("HavanaClubCookie2016");

	    if (cookie == "accepted") {
	        document.getElementById('cookieWrap').style.display = "none";
	    } else {
	    	document.getElementById('cookieWrap').style.display = "block";
	    }

	};

	this.init = function() {

		screenMngr = new ScreenManager();
		document.getElementById("cookie-alert").addEventListener("click", setCookie);
		document.getElementById("close-btn").addEventListener("click", hideErrorWrapper);
		
	};

	this.checkCookie();
	this.init();

}

function welcomeNewUser() {

	if (window.location.host !== 'www.cubanweekender.co.uk') {
		return;
	}

	var formData = getUserCrmData();

	function getUserCrmData() {

		var userData = {
				email: currentUser.attributes.email,
			},
			keyValuePairs = [],
			i;

		for (i in userData) {
			if (userData.hasOwnProperty(i)) {
				keyValuePairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(userData[i]));
			}
		}

		return keyValuePairs.join('&');

	}

	function emailTriggerResponse(e) {

		var target = e.target,
			response;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {

			response = JSON.parse(target.responseText);

			if (response.success) {
				//console.log(response);
			} else {
				console.error(response);
			}

		} else {
			console.error('Error submitting form.', target.responseText);
		}

	}

	var emailTriggerRequest = new XMLHttpRequest();
	emailTriggerRequest.onreadystatechange = emailTriggerResponse;
	emailTriggerRequest.open('POST', '/welcome-user', true);
	emailTriggerRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	emailTriggerRequest.send(formData);

}

function signUpNewsletter(skipDob) {

	if (window.location.host !== 'www.cubanweekender.co.uk') {
		return;
	}

	var newsletterRequest,
		formData = getUserCrmData();

	function getUserCrmData() {
		var userData = {};
		if(localStorage.getItem("deepLink"))
		{
			userData = {
				email: currentUser.attributes.email,
				name: currentUser.attributes.name,
				dobDay: null,
				dobMonth: null,
				dobYear: null,				
				postCode: currentUser.attributes.postcode || '',
				optIn: (currentUser.attributes.receiveEmails ? 'Y' : 'N')
			};
		}
		else
		{
			userData = {
				email: currentUser.attributes.email,
				name: currentUser.attributes.name,

				dobDay: currentUser.attributes.birthday.getDate(),
				dobMonth: currentUser.attributes.birthday.getMonth() + 1,
				dobYear: currentUser.attributes.birthday.getFullYear(),
				
				postCode: currentUser.attributes.postcode || '',
				optIn: (currentUser.attributes.receiveEmails ? 'Y' : 'N')
			};
		}
		
			var keyValuePairs = [],
			i;

		for (i in userData) {
			if (userData.hasOwnProperty(i)) {
				keyValuePairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(userData[i]));
			}
		}

		return keyValuePairs.join('&');

	}

	function signupResponse(e) {

		var target = e.target,
			response;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {

			response = JSON.parse(target.responseText);

			if (response.success) {
				console.log(response);
			} else {
				console.log(response);
			}

		} else {
			console.log('Error submitting form.', target.responseText);
		}

	}

	newsletterRequest = new XMLHttpRequest();
	newsletterRequest.onreadystatechange = signupResponse;
	newsletterRequest.open('POST', '/subscribe', true);
	newsletterRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	newsletterRequest.send(formData);

}

	// CACHE geolocation -- I suppose it's a good thing to do it here as later it takes way too much time...(on the map page)
	function getUserLocation() {
		navigator.geolocation.getCurrentPosition(callbackPosition, errorPositionCallBack, {timeout:10000});
	}

	function callbackPosition(position) {

		var latitude = position.coords.latitude,
			longitude = position.coords.longitude;  
		
		window.UsersLat = latitude;
		window.UsersLng = longitude;
		window.UsersLatLng = [latitude, longitude];
		if(latitude!==null || longitude!==null)
		{
			ga('send', 'event', 'location', 'share');
			localStorage.setItem("usersLocation", JSON.stringify(UsersLatLng));
		}
		else
		{
			localStorage.setItem("usersLocation",JSON.stringify([52.6344122,-1.1368473]));
		}
	}

	function errorPositionCallBack(){
		//alert("Please enable geolocation on your device");
		localStorage.setItem("usersLocation",JSON.stringify([52.6344122,-1.1368473]));
		var errorMessage = document.getElementById('dateErrorMessage'),
		errorWrapper = document.getElementById('error-overlay');
		errorMessage.innerHTML = 'PLEASE REFRESH BROWSER AND ENABLE LOCATION SERVICE TO VIEW BARS';
		errorWrapper.style.display = 'block';
	}

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
	// do something when device orientation changes
	var appContainer = document.getElementById(app),
		scrollableContainer = document.getElementsByClassName('scrollable')[0],
		fullHeight = window.innerHeight;
	
	appContainer.style.height = fullHeight;
	scrollableContainer.style.height = fullHeight;

}, false);

var currentUser,
	app = new App();