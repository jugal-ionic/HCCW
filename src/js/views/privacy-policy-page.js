/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function PrivacyPolicyScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'privacy-policy-screen';
	this.name = 'Privacy Policy page';
	this.templateId = 'privacy-policy-template';
	this.root = false;

	//Do post container creation processing
	this.processContainer = function() {
		
		// document.getElementById('tile1').style.display = "none";
		// document.getElementById('tile2').style.display = "none";
		// document.getElementById('tile3').style.display = "none";
		// document.getElementById('tile4').style.display = "none";
		// document.getElementById('tile5').style.display = "none";
		// document.getElementById('tile6').style.display = "none";
		this.events.publish(this.id + 'ContainerReady', this);

		ga('send', 'event', 'Privacy Policy', 'Viewed');
		
		var backBtn = document.getElementById('backBtn');

		if (this.screenData.standalone) {
			backBtn.parentNode.removeChild(backBtn);
		} else {
			backBtn.addEventListener("click", self.scrManager.goBack);
		}

		return this.container;

	};

}

ThankYouScreen.prototype = new Screen();