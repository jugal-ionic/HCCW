/*********************

Authors:
	Luis Rodrigues

Description:
	Base screen class

*********************/

function Screen(scrManager, events, screenData, forceRoot) {

	//Screen properties
	this.id = 'screenId';
	this.name = 'Base screen';
	this.template = '';
	this.templateId = false;
	this.templateUrl = false;
	this.templateData = {};
	this.container = null;
	this.transition = 'slideLeft';
	this.root = true;

	if (forceRoot) {
		this.forceRoot = true;
	} else {
		this.forceRoot = false;
	}

	this.templateRequest;

	this.scrManager = scrManager;
	this.events = events;
	this.screenData = screenData || {};

	//Do post container creation processing
	this.processContainer = function() {

		this.events.publish(this.id + 'ContainerReady', this);

		return this.container;

	};

	//Create the screen container element
	this.createContainer = function(template) {

		var scrollableArea;

		this.container = document.createElement('div');
		this.container.className = 'screen ' + this.id;
		this.container.style.visibility = 'hidden';

		scrollableArea = document.createElement('div');
		scrollableArea.className = 'scrollable';
		scrollableArea.innerHTML = template;

		this.container.appendChild(scrollableArea);

		//Add the screen to the app container
		this.scrManager.container.appendChild(this.container);

		this.processContainer();

	};

	this.populateTemplate = function() {
		return Mustache.render(this.template, this.templateData);
	};

	//Check if the screen is ready and do all required actions before the screen is displayed
	this.isReady = function() {

		if (!this.template) {
			return false;
		}

		var tplRender = this.populateTemplate();

		this.createContainer(tplRender);

		return true;

	};

	//Notify that the template is ready and check if all the requirements are met
	this.templateReady = function() {
		this.isReady();
	};

	//Process the template loaded from a URL
	this.templateUrlLoaded = function(e) {

		var target = e.target;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {
			this.template = target.responseText;
			this.templateReady();
		}

		return;

	};

	//Load the template from the inner HTML of a DOM element
	this.loadTemplateFromDOM = function(templateId) {

		var templateContainer = document.getElementById(templateId);

		if (!templateContainer) {
			console.error('Template container with ID "' + templateId + '" not found.');
			return '';
		}

		this.template = templateContainer.innerHTML;
		this.templateReady();

		return this.template;

	};

	//Load the template from a given URL through AJAX
	this.loadTemplateFromUrl = function(templateUrl) {

		var self = this;

		this.templateRequest = new XMLHttpRequest();

		this.templateRequest.onreadystatechange = function(e) {
			self.templateUrlLoaded.call(self, e);
		};

		this.templateRequest.open('GET', templateUrl);
		this.templateRequest.send();

	};


	//Get the screen template
	this.loadTemplate = function() {

		if (this.template) {
			this.templateReady();
			return;
		}

		if (this.templateId) {
			this.loadTemplateFromDOM(this.templateId);
			return;
		}

		if (this.templateUrl) {
			this.loadTemplateFromUrl(this.templateUrl);
			return;
		}

	};

	//Destroy the screen
	this.destroy = function() {

		if (this.templateRequest) {
			this.templateRequest.abort();
		}

		if (this.container) {
			this.container.parentNode.removeChild(this.container);
			this.container = null;
		}

	};

	//Prepare the screen
	this.init = function() {
		this.loadTemplate();
	};
	
}