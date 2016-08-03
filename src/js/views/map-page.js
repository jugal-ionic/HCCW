/*********************

Authors:
	Dan Dvoracek
	Luis Rodrigues

Description:
	Map page class

*********************/

function MapPageScreen() {

	var self = this,
		listWrap,
		barList,
		map,
		geoCoder,
		minZoomLevel = 6,
		mapBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(49.378087, -8.906589),
			new google.maps.LatLng(61.039487, 2.730992)
		),
		barBounds,
		userLocation,
		mapCenterLocation,
		mapMarkers = [],
		barListItemTemplate = '',
		listedBars = [],
		activeBar,
		directionsService,
		directionsDisplay,
		errorMessage = document.getElementById('dateErrorMessage'),
		errorWrapper = document.getElementById('error-overlay'),
		isReceivingData = false,
		userSearch = '';

	barListItemTemplate += '<h2 class="bar-name">{{ name }}</h2>';
	barListItemTemplate += '{{#directionsEnabled}}';
	barListItemTemplate += '<div class="bar-more-info">';
	barListItemTemplate += '<span class="distance">{{ distance }}</span>';
	barListItemTemplate += '<span class="getDirectionsArrow" data-bar="{{ index }}"></span>';
	barListItemTemplate += '</div>';
	barListItemTemplate += '{{/directionsEnabled}}';
	barListItemTemplate += '<address>{{ address }}</address>';
	barListItemTemplate += '<p class="phoneNumber">Tel. <a href="tel:{{ phoneClean }}" title="Call the bar!">{{ phone }}</a></p>';
	barListItemTemplate += '<div class="clearfix"></div>';
	barListItemTemplate += '<div class="dots-border"></div>';

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'map-page-screen';
	this.name = 'Map page';
	this.templateId = 'map-page-template';
	this.root = false;

	if (localStorage && localStorage.getItem("usersLocation")) {

		var userCoordinates = JSON.parse(localStorage.getItem("usersLocation"));

		userLocation = new google.maps.LatLng(userCoordinates[0], userCoordinates[1]);

	}

	// Close that same popup...
	function hideBarDetails(e){

		if (e && e.preventDefault) {
			e.preventDefault();
		}

		if (directionsDisplay) {
			directionsDisplay.setMap(null);
		}

		var barInfoOverlay = document.getElementById("bar-details-overlay");
			barInfoOverlay.style.display = 'none';
	
	}

	// Show the bar list on map-page; different behavior depending on if the user enabled geolocation or not
	function showBarsList(e){

		if (e && e.preventDefault) {
			e.preventDefault();

			ga('send', 'event', 'Find a bar', 'click', 'List');

		}

		var filtersMap = document.getElementById('show-map'),
			filtersList = document.getElementById('show-list'),
			listOverlay = self.container.querySelector('.bars-list-view'),
			listWrap = document.getElementById('bars-list-wrap');

			listOverlay.style.display = 'block';

			hideBarDetails();

		if (filtersMap.className.indexOf('map-filter-active') >= 0) {
			filtersMap.className = '';
			filtersList.className = 'map-filter-active';
		}

	}

	// Hide bar list when switch to map view
	function hideBarsList(e){

		if (e && e.preventDefault) {
			e.preventDefault();

			ga('send', 'event', 'Find a bar', 'click', 'Map');

		}

		var listOverlay = self.container.querySelector('.bars-list-view'),
			filtersMap = document.getElementById('show-map'),
			filtersList = document.getElementById('show-list');
		
		if(filtersList.className.indexOf('map-filter-active') >= 0) {
			filtersList.className = '';
			filtersMap.className = 'map-filter-active';
		}

		listOverlay.style.display = 'none';
	
	}

	//Prevent zooming out the map too much
	function restrictMapZoom() {

		if (map.getZoom() < minZoomLevel) {
			map.setZoom(minZoomLevel);
		}

	}

	//Prevent panning the map to other countries
	function restrictMapCenter() {

		var center = map.getCenter(),
			x,
			y,
			maxX,
			maxY,
			minX,
			minY;

		if (!mapBounds.contains(center)) {

			x = center.lng(),
			y = center.lat(),
			maxX = mapBounds.getNorthEast().lng(),
			maxY = mapBounds.getNorthEast().lat(),
			minX = mapBounds.getSouthWest().lng(),
			minY = mapBounds.getSouthWest().lat();

			if (x < minX) {
				x = minX;
			} else if (x > maxX) {
				x = maxX;
			}

			if (y < minY) {
				y = minY;
			} else if (y > maxY) {
				y = maxY;
			}

			map.setCenter(new google.maps.LatLng(y, x));

		}

	}

	function getDirectionsToBar(e, barData) {

		if (e && e.preventDefault) {
			e.preventDefault();
		}

		ga('send', 'event', 'Find a bar', 'Search', 'get directions');

		barData = barData || activeBar;

		var request = {
				origin: userLocation || mapCenterLocation,
				destination: new google.maps.LatLng(barData.latitude, barData.longitude),
				travelMode: google.maps.TravelMode.DRIVING
			};

		hideBarDetails();
		
		directionsDisplay.setMap(map);

		directionsService.route(request, function(result, status) {

			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
			} else {
				errorMessage.textContent = 'It was not possible to get directions from the location provided.';
				errorWrapper.style.display = 'block';
			}

		});

	}

	function showBarDetails(barData) {

		if (!barData) {
			ga('send', 'event', 'Find a bar', 'Search', 'select bar');
		}
	
		if (barData && barData.latLng) {
			barData = false;
		}

		var barMarker = this,
			barData = barData || barMarker.get('barData'),
			nameField = document.getElementById("barName"),
			addressField = document.getElementById("barAddress"),
			phoneNumField = document.getElementById("barPhoneNum"),
			barInfoOverlay = document.getElementById("bar-details-overlay"),
			barPostcode = document.getElementById("barPostcode"),
			distance = document.getElementById("barDistance"),
			distanceOrigin = userLocation || mapCenterLocation || false,
			distanceToBar;

		if (distanceOrigin) {

			distanceToBar = google.maps.geometry.spherical.computeDistanceBetween(
				new google.maps.LatLng(barData.latitude, barData.longitude),
				distanceOrigin
			);

			distanceToBar = (distanceToBar * 0.000621371192).toFixed(2) + ' miles';

		}

		barInfoOverlay.style.display = 'block';
		nameField.textContent = barData.name1 + (barData.name2 ? ' ' + barData.name2 : '');
		addressField.textContent = barData.address1 + (barData.address2 ? "\n" + barData.address2 : '') + (barData.address3 ? "\n" + barData.address3 : '') + (barData.address4 ? "\n" + barData.address4 : '');
		barPostcode.textContent = barData.postcode;
		distance.textContent = distanceToBar ? distanceToBar : '';

		if (barData.phone) {
			phoneNumField.innerHTML = barData.phone;
			phoneNumField.href = 'tel:' + barData.phone.replace(/ /g,'');
			phoneNumField.parentNode.style.display = 'block';
		} else {
			phoneNumField.parentNode.style.display = 'none';
		}

		activeBar = barData;

	}

	function addBarMarker(barData) {

		barData = barData.attributes;

		var barCoordinates = new google.maps.LatLng(barData.latitude, barData.longitude),
			barMarker = new google.maps.Marker({
				position: barCoordinates,
				map: map,
				icon: 'assets/img/pin.png',
				title: barData.name1 + (barData.name2 ? ' ' + barData.name2 : '')
			});

		barMarker.set('barData', barData);

		google.maps.event.addListener(barMarker, 'click', showBarDetails);

		mapMarkers.push(barMarker);

		barBounds.extend(barCoordinates);

	}

	function renderBarListItem(barData, index) {
		
		barData = barData.attributes;
		
		var template,
			barItemData,
			distanceOrigin = userLocation || mapCenterLocation || false,
			distanceToBar;

		if (distanceOrigin) {

			distanceToBar = google.maps.geometry.spherical.computeDistanceBetween(
				new google.maps.LatLng(barData.latitude, barData.longitude),
				distanceOrigin
			);

			distanceToBar = (distanceToBar * 0.000621371192).toFixed(2) + ' miles';

		};

		barItemData = {
			name: barData.name1 + (barData.name2 ? ' ' + barData.name2 : ''),
			distance: distanceToBar,
			address: barData.address1 + (barData.address2 ? "\n" + barData.address2 : '') + (barData.address3 ? "\n" + barData.address3 : '') + (barData.address4 ? "\n" + barData.address4 : '') + (barData.postcode ? "\n" + barData.postcode : ''),
			phone: barData.phone,
			phoneClean: (barData.phone ? barData.phone.replace(/ /g,'') : false),
			directionsEnabled: (!distanceToBar || self.screenData.standalone) ? false : true,
			index: index
		}

		return Mustache.render(barListItemTemplate, barItemData);

	}

	function removeBarPins() {

		var i;

		for (i = 0; i < mapMarkers.length; i++) {
			mapMarkers[i].setMap(null);
		}

	}

	function populateBars(barData) {

		var i,
			output = '';
		
		listedBars = barData;
		barBounds = new google.maps.LatLngBounds();

		//Only deal with map markers if not showing the standalone bar list
		if (!self.screenData.standalone) {

			removeBarPins();

			mapMarkers = [];

			for (i = 0; i < barData.length; i++) {
				addBarMarker(barData[i]);
			}

		}

		for (i = 0; i < barData.length; i++) {
			output += renderBarListItem(barData[i], i);
		}

		if (map && barBounds) {
			map.fitBounds(barBounds);
		}

		barList.innerHTML = output;

		isReceivingData = false;

	}

	function getNearestToMapCenter() {

		if (!mapCenterLocation) {
			return;
		}

		//No bars should be displayed with no user location or addres searched
		if (!userSearch && !userLocation) {
			isReceivingData = false;
			return removeBarPins();
		}

		isReceivingData = true;

		var BarsList = Parse.Object.extend("Bars"),
			query = new Parse.Query(BarsList),
			parseGeopoint = new Parse.GeoPoint(mapCenterLocation.lat(), mapCenterLocation.lng());

		if (!self.screenData.standalone) {
			query.limit(25);
		} else {
			query.limit(1000);
		}

		query.near("geopoints", parseGeopoint);
		query.find().then(populateBars);

	}

	function initMap() {

		var defaultZoom = 6;

		mapCenterLocation = userLocation || mapBounds.getCenter();

		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: mapCenterLocation,
			zoom: defaultZoom,
			disableDefaultUI: true,
		});

		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});

		geoCoder = new google.maps.Geocoder();

		if (userLocation) {

			new google.maps.Marker({
				position: userLocation,
				map: map,
				icon: 'assets/img/pin-user.png'
			});

		}

		//Prevent zooming out too much
		google.maps.event.addListener(map, 'zoom_changed', restrictMapZoom);

		//Prevent panning to other countries
		google.maps.event.addListener(map, 'center_changed', restrictMapCenter);

	}

	function showNoResults() {

		errorMessage.textContent = 'No bars were found near the location provided.';
		errorWrapper.style.display = 'block';

		isReceivingData = false;

	}

	function searchNearAddress(address) {
		var search_text=address.toLowerCase();
		// birmingham - B1 2DS
		// newport - NP20 1DS
		// cambridge - CB2 1AB
		// worcester - WR1 3LD
		// lincoln - LN2 1JG
		// sheffield - S9 1EP
		// york - YO1 8AD
		// carlisle - CA1 1RP
		if(search_text===('birmingham'.toLowerCase()))
		{
			search_text='B1 2DS';
		}
		else
		if(search_text===('newport'.toLowerCase()))
		{
			search_text='NP20 1DS';
		}
		else
		if(search_text===('cambridge'.toLowerCase()))
		{
			search_text='CB2 1AB';
		}
		else
		if(search_text===('worcester'.toLowerCase()))
		{
			search_text='WR1 3LD';
		}
		else
		if(search_text===('lincoln'.toLowerCase()))
		{
			search_text='LN2 1JG';
		}
		else
		if(search_text===('sheffield'.toLowerCase()))
		{
			search_text='S9 1EP';
		}
		else
		if(search_text===('york'.toLowerCase()))
		{
			search_text='YO1 8AD';
		}
		else
		if(search_text===('carlisle'.toLowerCase()))
		{
			search_text='CA1 1RP';
		}
		isReceivingData = true;

		geoCoder.geocode({
			address: search_text
		}, function(results, status) {

			var locationCoordinates;
			
			if (status == google.maps.GeocoderStatus.OK && results.length) {

				//Use the first result
				locationCoordinates = results[0].geometry.location;

				if (mapBounds.contains(locationCoordinates)) {
					mapCenterLocation = locationCoordinates;
					getNearestToMapCenter();
				} else {
					showNoResults();
				}

			} else {
				showNoResults();
			}
		
		});

	}

	function getDirectionsFromList(e) {

		if (e.target.className === 'getDirectionsArrow') {

			e.preventDefault();

			activeBar = listedBars[e.target.getAttribute('data-bar')];
			activeBar = activeBar.attributes;

			hideBarsList();
			showBarDetails(activeBar);

			getDirectionsToBar(null, activeBar);

		}

	}

	function resetSearch() {

		if (userLocation) {
			mapCenterLocation = userLocation;
		}

		map.setCenter(mapCenterLocation);

	}

	function searchFromList(e) {

		e.preventDefault();

		if (isReceivingData) {
			return;
		}

		isReceivingData = true;

		var listSearchField = document.getElementById('list-search'),
			mapSearchField = document.getElementById('map-search');

		mapSearchField.value = listSearchField.value.trim();

		userSearch = mapSearchField.value;

		ga('send', 'event', 'Find a bar', 'Search', mapSearchField.value);

		if (mapSearchField.value) {
			searchNearAddress(listSearchField.value);
		} else {
			resetSearch();
		}

	}

	function searchFromMap(e) {

		e.preventDefault();

		if (isReceivingData) {
			return;
		}

		isReceivingData = true;

		var listSearchField = document.getElementById('list-search'),
			mapSearchField = document.getElementById('map-search');

		listSearchField.value = mapSearchField.value.trim();

		userSearch = listSearchField.value;

		ga('send', 'event', 'Find a bar', 'Search', listSearchField.value);

		if (listSearchField.value) {
			searchNearAddress(mapSearchField.value);
		} else {
			resetSearch();
		}

	}

	//Do post container creation processing
	this.processContainer = function() {
		this.events.publish(this.id + 'ContainerReady', this);

		var backBtn = document.getElementById('backBtn'),
			getDirectionsBtn;

		listWrap = this.container.querySelector('.bar-list-wrapper');
		barList = document.getElementById('bars-list-wrap');

		if (this.screenData.standalone) {

			mapCenterLocation = userLocation || mapBounds.getCenter();

			showBarsList();

			this.container.className += ' standalone-version';

			listWrap.style.paddingTop = "60px";

			backBtn.parentNode.removeChild(backBtn);

		} else {

			this.container.className += ' full-version';

			document.getElementById("show-list").addEventListener("click", showBarsList);
			document.getElementById('show-map').addEventListener("click", hideBarsList);
			document.getElementById('closeBtn').addEventListener("click", hideBarDetails);
			document.getElementById('searchBarMapForm').addEventListener("submit", searchFromMap);
			document.getElementById('searchBarListForm').addEventListener("submit", searchFromList);
			document.getElementById('getDirections').addEventListener("click", getDirectionsToBar);

			backBtn.addEventListener("click", self.scrManager.goBack);

			listWrap.addEventListener('click', getDirectionsFromList);

			initMap();

		}

		getNearestToMapCenter();
		
		if(window.location.hash==='#/voucher')
			document.getElementById('backBtn').style.display ="none";
		return this.container;

	};

}

MapPageScreen.prototype = new Screen();