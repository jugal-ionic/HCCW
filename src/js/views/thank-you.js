/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function ThankYouScreen() {

	Screen.apply(this, Array.prototype.slice.call(arguments));

	var subscribeSection,
		subscribeBtn;

	this.id = 'thank-you-screen';
	this.name = 'Thank you page';
	this.templateId = 'thank-you-template';
	this.templateData = {
		userName: currentUser.attributes.name,
		userSubscribedNewsletter: currentUser.attributes.receiveEmails
	};

	this.subscribeNewsletter = function(e) {

		currentUser.set('receiveEmails', true);
		currentUser.save();

		signUpNewsletter();

		subscribeSection.innerHTML = '<p class="promotion-text1">Thank you!</p>';

	};

	//Do post container creation processing
	this.processContainer = function() {
		
		
		subscribeSection = document.getElementById('newsletter-signup-section');

		if (subscribeSection) {
			subscribeBtn = subscribeSection.querySelector('#subscribe-newsletter-btn');
			subscribeBtn.addEventListener('click', this.subscribeNewsletter);
		}

		this.events.publish(this.id + 'ContainerReady', this);

		return this.container;

	};

}

ThankYouScreen.prototype = new Screen();