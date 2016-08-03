/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function UserDetailsScreen() {
	
	var self = this,
		detailsForm,
		fullName,
		email,
		postcode,
		termsAndCond,
		newsletterSignup,
		validator = new Validate(),
		isSubmitting = false;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'user-details-screen';
	this.name = 'User details page';
	this.templateId = 'user-details-template';

	function loadHomePage(){
		self.scrManager.addScreen(HomePageScreen);
	}
	
	function validateFields(e){

		if (e && e.preventDefault) {
			e.preventDefault();
		}

		if (isSubmitting) {
			return;
		}

		isSubmitting = true;

		var errorCount = 0,
			nameError = document.getElementById('nameError'),
			emailError = document.getElementById('emailError'),
			postcodeError = document.getElementById('postcodeError'),
			generalError = document.getElementById('generalError'),
			nameValidation = validator.field(fullName),
			emailValidation = validator.field(email),
			postcodeValidation = validator.field(postcode),
			fullNameStr = fullName.value.toLowerCase().trim(),
			emailStr = email.value.toLowerCase().trim();

			fullNameStr = latinize(fullNameStr);
			emailStr = latinize(emailStr);

		if (nameValidation.valid) {
			nameError.innerHTML = "";
		} else {
			errorCount = errorCount + 1;
			nameError.textContent = "Check your name.";
		}

		if (emailValidation.valid) {
			emailError.innerHTML = "";
		} else {
			errorCount = errorCount + 1;
			emailError.textContent = "Check the email format.";
		}

		if (postcodeValidation.valid) {
			postcodeError.innerHTML = "";
		}

		if (termsAndCond.checked == false) {
			errorCount = errorCount + 1;
			generalError.textContent = "Please accept Terms / Conditions.";
		} else {
			generalError.innerHTML = "";
		}

		if (errorCount == 0) {

			var updateCRM = true;

			//if (currentUser.attributes.receiveEmails != newsletterSignup.checked) {
			//	updateCRM = true;
			//}
			
			// save data first
			currentUser.set('username', emailStr);
			currentUser.set('password', fullNameStr);
			currentUser.set('email', emailStr);
			currentUser.set('name', fullNameStr);
			currentUser.set('postcode', postcode.value);
			currentUser.set('receiveEmails', newsletterSignup.checked);

			if (updateCRM) {
				signUpNewsletter(this.screenData.standalone);
			}

			currentUser.signUp(null, {
				success: function(user) {
					currentUser = user;
					welcomeNewUser();
					loadHomePage();
					ga('send', 'event', "Details", "Submit", "submit success");
				},
				error: function(user, error) {

					if (error.code === 202) {

						Parse.User.logIn(emailStr, fullNameStr, {
							success: function(user) {
								currentUser = user;

								if (user.attributes.drinkRedeemed) {
									return self.scrManager.addScreen(ThankYouScreen);
								} else {
									return loadHomePage();
								}

							},
							error: function(user, error) {
								isSubmitting = false;

								if (error.code === 101) {
									emailError.textContent = 'The email address is already registered.';
								} else {
									console.error(error);
								}

								ga('send', 'event', "Details", "Submit", "submit fail");

							}
						});

					} else {
						ga('send', 'event', "Details", "Submit", "submit fail");
					}

				}
			});

		} else {

			ga('send', 'event', "Details", "Submit", "submit fail");
			
			isSubmitting = false;
			return false;
		}

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

	//Do post container creation processing
	this.processContainer = function() {
		
		this.events.publish(this.id + 'ContainerReady', this);

		detailsForm = document.getElementById('detailsForm');
		fullName = document.getElementById('fullNameInput');
		email = document.getElementById('emailInput');
		postcode = document.getElementById('postcodeInput');
		termsAndCond = document.getElementById("checkboxOne");
		newsletterSignup = document.getElementById("checkboxTwo");
		console.log(currentUser);
		if(currentUser === null)
		{
			fullName.value = "";
			email.value = "";
		}
		else
		{
			fullName.value = currentUser.attributes.name;
			email.value = currentUser.attributes.email;
		}		
		
		if(fullName.value === 'undefined' && email.value === 'undefined'){

			fullName.value = "";
			email.value = "";

		} 

		detailsForm.addEventListener('keypress', limitFieldInput);
		detailsForm.addEventListener('submit', validateFields);

		return this.container;

	}

}

UserDetailsScreen.prototype = new Screen();