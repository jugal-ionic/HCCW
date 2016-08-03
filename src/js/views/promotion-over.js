/*********************

Authors:
	Luis Rodrigues

Description:
	Promotion over class

*********************/

function PromotionOverScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'promotion-over-screen';
	this.name = 'Promotion over';
	this.templateId = 'promotion-over-template';

	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	//Do post container creation processing
	this.processContainer = function() {
		
		// document.getElementById('tile1').style.display = "none";
		// document.getElementById('tile2').style.display = "none";
		// document.getElementById('tile3').style.display = "none";
		// document.getElementById('tile4').style.display = "none";
		// document.getElementById('tile5').style.display = "none";
		// document.getElementById('tile6').style.display = "none";
		this.events.publish(this.id + 'ContainerReady', this);

		//document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);

		return this.container;

	}

}

PromotionOverScreen.prototype = new Screen();