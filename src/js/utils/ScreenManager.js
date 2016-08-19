function ScreenManager() {

	var self = this,
		screens = [],
		events = new Event();

	this.container = null;

	//Get the current screen (the last screen in the chain)
	function getCurrentScreen() {

		var screenCount = screens.length,
			screenIndex = screenCount - 1;

		return screens[screenIndex];

	}

	function getPreviousScreen() {

		var screenCount = screens.length,
			screenIndex = screenCount - 2;

		return screens[screenIndex] || false;

	}

	//Check if the screen is a root screen and remove all previous screens if so
	function rootScreen(target) {

		if (!target.root && !target.forceRoot) {
			return;
		}

		var i,
			removeCount = screens.length - 1;

		//Destroy the screens that will be removed
		for (i = 0; i < removeCount; i ++) {
			screens[i].destroy();
		}

		screens.splice(0, removeCount);

	}

	//Destroy and remove the last screen
	function clearLastScreen() {

		var screenCount = screens.length,
			lastIndex = screenCount - 1;

		screens[lastIndex].destroy();

		screens.splice(lastIndex, 1);

	}

	function queueScreenSlideLeft(direction) {

		direction = direction || 1;

		var target = getCurrentScreen(),
			prevScreen = getPreviousScreen(),
			startPos = 100,
			endPos = 0,
			tweener = new Tweenable();

		if (direction === -1) {

			startPos = 0;
			endPos = 100;
			target.container.style.left = '0%';

			if (prevScreen) {
				prevScreen.container.style.display = '';
			}
			
		} else {
			target.container.style.left = '100%';
			target.container.style.visibility = '';
		}

		tweener.tween({
			from: {
				left: startPos
			},
			to: {
				left: endPos
			},
			easing: 'easeInOutCubic',
			duration: 400,
			step: function(state) {
				target.container.style.left = state['left'] + '%';
			},
			finish: function(state) {

				if (direction === 1) {

					if (prevScreen) {
						prevScreen.container.style.display = 'none';
					}

					rootScreen(target);

				} else {

					clearLastScreen();

				}

			}
		});

	}

	//Show a screen with no transition
	function queueScreenNoTransition(direction) {

		direction = direction || 1;

		var target = getCurrentScreen(),
			prevScreen = getPreviousScreen();

		if (direction === 1) {

			target.container.style.visibility = '';
			target.container.style.display = '';

			if (prevScreen) {
				prevScreen.container.style.display = 'none';
			}

			rootScreen(target);

		} else {

			target.container.style.visibility = 'hidden';
			target.container.style.display = 'none';

			if (prevScreen) {
				prevScreen.container.style.display = '';
			}

			clearLastScreen();

		}

	}

	//Trigger a screen transition animation
	function triggerScreenTransition(direction) {
		
		direction = direction || 1;
		
		var target = getCurrentScreen();

		switch(target.transition) {
			case 'slideLeft':
				queueScreenSlideLeft(direction);
				break;
			default:
				queueScreenNoTransition(direction);
				break;
		}
	}

	//Add the screen to the history and 
	function screenReady() {

		events.unsubscribe(this.id + 'ContainerReady', screenReady);

		screens.push(this);

		triggerScreenTransition();

	}

	//Go back one screen
	this.goBack = function() {
		
		triggerScreenTransition(-1);

	};

	//Init a screen from its constructor
	this.addScreen = function(screen, screenData, forceRoot) {

		var screenConstructor = new screen(self, events, screenData, forceRoot);

		//Listen for when the screen container and its contents are ready to be displayed
		events.subscribe(screenConstructor.id + 'ContainerReady', screenReady);

		screenConstructor.init();

	};

	//Destroy the screen manager and all the currently loaded screens
	this.destroy = function() {

		var i;

		for (i = 0; i < screens.length; i++) {
			screens[i].destroy();
		}

		screens = [];

	};
	
	//Initiate the screen manager
	this.init = function() {

		this.container = document.getElementById('app');

		//Load StartScreen by default
		if (StartScreen) {
			this.addScreen(StartScreen);
		}

	};

	this.init();

}