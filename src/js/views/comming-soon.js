/*********************

Authors:
	Oli

Description:
	Comming soon class

*********************/

function CommingSoonScreen() {

	var self = this;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'comming-soon-screen';
	this.name = 'Promotion over';
	this.templateId = 'comming-soon-template';

	//Do post container creation processing
	this.processContainer = function() {
		this.events.publish(this.id + 'ContainerReady', this);
		return this.container;

	}

}

CommingSoonScreen.prototype = new Screen();