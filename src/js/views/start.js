/*********************

Authors:
	Luis Rodrigues

Description:
	Start screen class

*********************/

function StartScreen() {

	var self = this,
		startDate = new Date(2016, 7, 18, 0, 0, 0, 0),
		endDate = new Date(2016, 7, 20, 12, 0, 0, 0),
		now = new Date(),
		contentLoadedCheck,
		cssLoaded = false,
		greenBackground,
		whiteBackground,
		headerBackground,
		progressContainer,
		loggedIn = false,
		sessionExpired = false,
		isAllow = false,
		geoCoder = new google.maps.Geocoder(),
		errorMessage = document.getElementById('dateErrorMessage'),
		errorWrapper = document.getElementById('error-overlay'),
		isReceivingData = false;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'start-screen';
	this.name = 'Loading';
	this.templateId = 'start-template';
	this.transition = false;

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

		localStorage.setItem("usersLocation", JSON.stringify(UsersLatLng));

	}

	function errorPositionCallBack(){
		//alert("Please enable geolocation on your device");
	}

	function updateProgress(loaded, total) {

	}

	function checkLoadedAssets() {

		var loadedAssets = 1,
			totalAssets = 7;

		if (currentUser) {
			totalAssets = 8;
		}

		if (currentUser && loggedIn) {
			loadedAssets += 1;
		}

		//Check if Facebook SDK is loaded
		//Only needed if a user is not logged in
		if (typeof FB !== 'undefined') {
			loadedAssets += 1;
		}

		//Check if Google Maps is loaded
		if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
			loadedAssets += 1;
		}

		//Check if the CSS is loaded
		if (cssLoaded) {
			loadedAssets += 1;
		}

		//Check if the green background is loaded
		if (greenBackground.complete) {
			loadedAssets += 1;
		}

		//Check if the white background is loaded
		if (whiteBackground.complete) {
			loadedAssets += 1;
		}

		//Check if the header background is loaded
		if (headerBackground.complete) {
			loadedAssets += 1;
		}

		progressContainer.style.width = Math.round((loadedAssets / totalAssets) * 100) + '%';

		if (loadedAssets < totalAssets) {
			return false;
		}

		clearInterval(contentLoadedCheck);

		self.routeUser();

	}

	self.routeUser = function() {
		var deepLink=window.location.hash;
		if(deepLink=='#/login')
		{
			//localStorage.setItem("deepLink", '#/login');
			currentUser = new Parse.User();
			return self.scrManager.addScreen(UserDetailsScreen, {standalone: true}, true);
		}else
		if (deepLink == '#/bars') {
			return self.scrManager.addScreen(MapPageScreen, {standalone: true}, true);
		}else
		if(deepLink=='#/voucher')
		{
			return self.scrManager.addScreen(HomePageScreen, {standalone: true}, true);
		}
		else
		{
			if (now < startDate) {
		 		return self.scrManager.addScreen(CommingSoonScreen, {standalone: true}, true);
			}else 
			if (now > endDate) {
			 	return self.scrManager.addScreen(PromotionOverScreen, {standalone: true}, true);
			} 
			if (loggedIn && !sessionExpired && currentUser.attributes.drinkRedeemed) {
				return self.scrManager.addScreen(ThankYouScreen);
			} else if (loggedIn && !sessionExpired) {
				return self.scrManager.addScreen(HomePageScreen);
			} else 
			{
				currentUser = new Parse.User();
				return self.scrManager.addScreen(AgeGateScreen);
			}
		}
		

	};

	//Do post container creation processing
	self.processContainer = function() {

		currentUser = Parse.User.current();

		if (currentUser) {
			Parse.User.logIn(currentUser.attributes.email, currentUser.attributes.name, {
				success: function(user) {
					currentUser = user;
					loggedIn = true;
					sessionExpired = false;
				},
				error: function(user, error) {
					Parse.User.logOut({
						success: function(user) {
								console.log(user);
						},error: function(user, error) {
								console.log(user,error);
					}});
					loggedIn = true;
					sessionExpired = true;
					console.warn(user, error);
				}
			});
		}

		self.events.publish(self.id + 'ContainerReady', self);

		progressContainer = document.getElementById('progress-container');
		progressContainer.style.width = '0%';

		getUserLocation();

		greenBackground = new Image();
		greenBackground.src = '/assets/img/backgrounds/mobile-footer-wrap-bg.png';

		whiteBackground = new Image();
		whiteBackground.src = '/assets/img/backgrounds/mobile-body-bg.jpg';

		headerBackground = new Image();
		headerBackground.src = '/assets/img/backgrounds/mobile-header-bg.png';

		self.cssRequest = new XMLHttpRequest();

		self.cssRequest.onreadystatechange = function(e) {
			self.processLoadedCSS.call(self, e);
		};

		self.cssRequest.open('GET', '/assets/css/main.css');
		self.cssRequest.send();

		contentLoadedCheck = setInterval(checkLoadedAssets, 100);

		return self.container;

	};

	self.processLoadedCSS = function(e) {

		var target = e.target;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {
			document.getElementById('mainStylesheet').innerHTML = target.responseText;
			cssLoaded = true;
		}

		return;

	};

}

StartScreen.prototype = new Screen();