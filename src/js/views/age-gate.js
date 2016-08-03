/*********************

Authors:
	Luis Rodrigues

Description:
	Age Gate class

*********************/

function AgeGateScreen() {

	var self = this,
		ageGateForm,
		dayField,
		monthField,
		yearField,
		formValidation = new Validate(),
		isSubmitting = false;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'age-gate-screen';
	this.name = 'Age gate';
	this.templateId = 'age-gate-template';

	// added function to set custom button and to be able to get the users data
	function fb_login(){
		FB.login(function(response) {
			if (!response.authResponse) {
				return console.log('User cancelled login or did not fully authorize.');
			}
			
		FB.api('/me?fields=age_range,first_name,last_name,email', function(response) {
		    console.log(response);
		    var user_email = response.email,
		     user_firstName = response.first_name,
		     user_lastName = response.last_name,
		     day = 1,
		     month = 1,
		     // Facebook only returns a minimum age, for our purposes this is enough
		     // as we don't really care when the user was born, just that they are
		     // old enough
		     currentYear = new Date().getFullYear(),
		     year = currentYear - response.age_range.min;
		    currentUser.set('email', user_email);
		    currentUser.set('name', user_firstName + ' ' + user_lastName);
		    dayField.value = day;
		    monthField.value = month;
		    yearField.value = year;
		    validateInputs();
			});
		}, {
			scope: 'email,user_birthday'
		});
	}
	// Facebook widget END
	function loadUserDetailsPage(){
		self.scrManager.addScreen(UserDetailsScreen);
	}

	function validateInputs(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		}
		if (isSubmitting) {
			return;
		}
		isSubmitting = true;
		var errorWrapper = document.getElementById('error-overlay'),
			errorMessage = document.getElementById('dateErrorMessage'),
			generalDateMessage = '<p class="intro-text middle"><span class="lower blue">but </span><span class="upper blue">Y</span><span class="lower blue">ou must be 18 or over to </span><span class="upper red">FREE </span><span class="lower red">Havana Club <br>Cuban Cocktail </span><span class="lower blue"> with us.</span></p>';
		if(parseInt(yearField.value,10)==1998 && parseInt(monthField.value,10) == 1 && parseInt(dayField.value,10) == 1)
			{
				document.getElementById('birth-month').value='';
				document.getElementById('birth-day').value='';
				document.getElementById('birth-day').style.display = "inline";
				document.getElementById('birth-month').style.display = "inline";
				isSubmitting = false;
				return false;
			}
		if (!formValidation.field(dayField).valid || !formValidation.field(monthField).valid || !formValidation.field(yearField).valid) {

			errorMessage.innerHTML = generalDateMessage;
			errorWrapper.style.display = 'block';
			isSubmitting = false;
			return false;
		}
		var minAge = 18,
			dayVal = dayField.value,
			monthVal = (monthField.value) - 1,
			yearVal = yearField.value,
			today = new Date(),
			minBirthDateUnix = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()+1, 12, 0, 0, 0).getTime(),
			usersBirthday = new Date(yearVal, monthVal, dayVal, 12, 0, 0, 0),
			usersBirthdayUnix = usersBirthday.getTime();			
		if (usersBirthdayUnix - minBirthDateUnix < 0) {
			ga('send', 'event', 'Age Gate', 'Submit', 'submit success');
			currentUser.set('birthday', usersBirthday);
			loadUserDetailsPage();

		} else {
			ga('send', 'event', 'Age Gate', 'Submit', 'submit fail');
			errorMessage.innerHTML = generalDateMessage;
			errorWrapper.style.display = 'block';
			isSubmitting = false;
			return false;
		}
		return true;
	}

	function limitFieldInput(e) {
		var target = e.target,
			maxLength = target.getAttribute('maxlength');
		if (maxLength && target.value.length >= maxLength) {
			e.preventDefault();
			return false;
		}		
		return true;
	}

	function loadPrivacyPolicy(e){
		e.preventDefault();
		self.scrManager.addScreen(PrivacyPolicyScreen);
	}

	function validateFieldInput(e) {
		var key = e.keyCode,
			field = e.target,
			nextSibling = field.nextElementSibling,
			maxLength = field.getAttribute('maxlength');
		if ((e.charCode < 48 || e.charCode > 57 || field.value.length >= parseInt(maxLength, 10)) && key !== 8 && key !== 13 && key !== 9) {
			return false;
		}
		if (key === 8) {
			return true;
		}
		if(field.value.length >= (maxLength - 1)){
			if (nextSibling && nextSibling.tagName.toLowerCase() === 'input') {
				setTimeout(function() {
					nextSibling.focus();
				}, 10);
			} else {
				setTimeout(function() {
					field.blur();
				}, 10);
			}
		}
	}
	function validateFieldInputYear(e) {
		var yearField = document.getElementById('birth-year').value;
		var monthField = document.getElementById('birth-month').value;
		var dayField = document.getElementById('birth-day').value;
		if(parseInt(yearField,10)==1998 && parseInt(monthField,10) == 0 && parseInt(dayField,10) == 0)
				{
					document.getElementById('birth-month').value='';
					document.getElementById('birth-day').value='';
					document.getElementById('birth-day').style.display = "inline";
					document.getElementById('birth-month').style.display = "inline";
					e.preventDefault();
					return false;
				}
		return true;
		}	
	//Do post container creation processing
	this.processContainer = function() {
		
		this.events.publish(this.id + 'ContainerReady', this);
		dayField = document.getElementById('birth-day');
		monthField = document.getElementById('birth-month');
		yearField = document.getElementById('birth-year');
		ageGateForm = document.getElementById('age-validation-form');
		ageGateForm.addEventListener('submit', validateInputs);
		ageGateForm.addEventListener('keypress', validateFieldInput);
		ageGateForm.addEventListener('keypress', limitFieldInput);
		ageGateForm.addEventListener('keyup', validateFieldInputYear);
		document.getElementById("facebook-login-button").addEventListener("click", fb_login);
		//document.getElementById("privacy-policy-link").addEventListener("click", loadPrivacyPolicy);
		return this.container;
	}
}
AgeGateScreen.prototype = new Screen();