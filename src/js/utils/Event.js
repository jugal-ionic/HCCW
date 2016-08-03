function Event() {
 
	var subscriptions = {};

	//Remove a listener for an event
	this.unsubscribe = function(eventName, callbackFunction) {
 
		//Check if there are listeners for the event type
		if (!subscriptions[eventName]) {
			return false;
		}
 
		//Remove the existing listner
		var subscriptionIndex = subscriptions[eventName].indexOf(callbackFunction);

		if (subscriptionIndex < 0) {
			return false;
		}

		subscriptions[eventName].splice(subscriptionIndex, 1);

		return true;
 
	};
 
	//Add a listener for an event
	this.subscribe = function(eventName, callbackFunction) {
 
		//Create a list of listeners for a certain event type if it doesn't exist yet
		if (!subscriptions[eventName]) {
			subscriptions[eventName] = [];
		}
 
		//Check if the listener already exists
		if (subscriptions[eventName].indexOf(callbackFunction) < 0) {
			subscriptions[eventName].push(callbackFunction);
		}
 
	};
 
	//Fire an event
	this.publish = function(eventName, caller, eventData) {
 
		//Check if there are subscriptions for the event type
		if (!subscriptions[eventName]) {
			return false;
		}
		 
		//Notify each of the subscriptions
		var i;
 
		for (i = 0; i < subscriptions[eventName].length; i++) {
			subscriptions[eventName][i].call(caller, eventName, eventData);
		}
 
	};
 
};