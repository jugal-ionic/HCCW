/*********************

Authors:
	Luis Rodrigues

Description:
	Home page class

*********************/

function HomePageScreen() {

	var self = this,
		startDate = new Date(2016, 7, 18, 12, 0, 0, 0),
		now = new Date(),
		voucherCTA,		
		errorMessage = document.getElementById('dateErrorMessage'),
		errorWrapper = document.getElementById('error-overlay'),
		checkDate;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'home-page-screen';
	this.name = 'Home page';
	this.templateId = 'home-page-template';

	function loadMapPage(e){

		e.preventDefault();
		userCoordinates = JSON.parse(localStorage.getItem("usersLocation"));
		if(userCoordinates[0]===52.6344122 && userCoordinates[1]===-1.1368473)
			{
		    // Opera 8.0+
				var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
				    // Firefox 1.0+
				var isFirefox = typeof InstallTrigger !== 'undefined';
				    // At least Safari 3+: "[object HTMLElementConstructor]"
				var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
				    // Internet Explorer 6-11
				var isIE = /*@cc_on!@*/false || !!document.documentMode;
				    // Edge 20+
				var isEdge = !isIE && !!window.StyleMedia;
				    // Chrome 1+
				var isChrome = !!window.chrome && !!window.chrome.webstore;
				    // Blink engine detection
				var isBlink = (isChrome || isOpera) && !!window.CSS;
					if(isFirefox)
					{
						errorMessage.innerHTML = 'PLEASE REFRESH BROWSER AND ENABLE LOCATION SERVICE TO VIEW BARS';
						errorWrapper.style.display = 'block';
					}
			}
			else
			{
				self.scrManager.addScreen(MapPageScreen);
				ga('send', 'event', 'Find a bar', 'click', 'click initial button');
			}
		
		
	}

	function loadEnterVoucherPage(e){
		
		e.preventDefault();

		if (now >= startDate) {

			ga('send', 'event', 'Voucher', 'click', 'click initial button');
			self.scrManager.addScreen(VoucherPageScreen);

		} else {
			// self.scrManager.addScreen(VoucherPageScreen);
			var errorWrapper = document.getElementById('error-overlay'),
				errorMessage = document.getElementById('dateErrorMessage'),
				voucherError = 'You’re keen! It’s not quite time to enjoy a Cuban Cocktail! just yet though, you’ll have to wait until midday on the 18th, 19th and 20th of August.';
			errorMessage.innerHTML = voucherError;
			errorWrapper.style.display = 'block';

		}

	}

	function updateVoucherStatus() {

		if (now >= startDate) {
			clearInterval(checkDate);
			voucherCTA.style.opacity = '';
		} else {
			return;
		}

	}

	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	//Do post container creation processing
	this.processContainer = function() {
		this.events.publish(this.id + 'ContainerReady', this);

		document.getElementById("find-a-bar-btn").addEventListener("click", loadMapPage);
		
		voucherCTA = document.getElementById("voucher-cta");

		if (now < startDate) {
			voucherCTA.style.opacity = '0.5';
			checkDate = setInterval(updateVoucherStatus, 5000);
		}

		voucherCTA.addEventListener("click", loadEnterVoucherPage);


		var calendarCTA = document.getElementById("calendarCTA"),
			ua = navigator.userAgent.toLowerCase(),
			isAndroid = ua.indexOf("android") > -1;

		//if(ua.indexOf('ios') >= 0 || ua.indexOf('os x') >= 0 || ua.indexOf('macintosh') >= 0) {
			calendarCTA.href = "/calendar/mnpcd.ics";
			calendarCTA.addEventListener('click', function() {
				ga('send', 'event', 'Calendar', 'click');
			});
		//} else {
		//	calendarCTA.style.display = "none";
		//}

		return this.container;

	}

}

HomePageScreen.prototype = new Screen();