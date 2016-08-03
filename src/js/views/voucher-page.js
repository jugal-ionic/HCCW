/*********************

Authors:
	Luis Rodrigues

Description:
	Voucher page class

*********************/

function VoucherPageScreen() {

	var self = this,
		form,
		validator = new Validate()
		isSubmitting = false;

	Screen.apply(this, Array.prototype.slice.call(arguments));

	this.id = 'voucher-page-screen';
	this.name = 'Voucher page';
	this.templateId = 'enter-code-template';
	this.root = false;

	function loadThankYouPage(e){
		e.preventDefault();
		self.scrManager.addScreen(ThankYouScreen);
	}

	function codeNotValid(e,invalidPin) {
		e.preventDefault();
		alert('The code you entered is not valid.');
		//self.scrManager.addScreen(VoucherPageScreen);
		//window.location.reload();
		//self.scrManager.addScreen(VoucherPageScreen);
	}

	function codeIsValid(barObject) {

		var relation;

		barObject.increment('drinksRedeemed');
		barObject.save();

		relation = currentUser.relation('redeemedAtBar');
		relation.add(barObject);
		currentUser.set('drinkRedeemed', true);
		currentUser.save();

		self.scrManager.addScreen(ThankYouScreen);

	}

	//Check that a bar with the code provided exists
	function redeemVoucher(code) {

		var BarsList = Parse.Object.extend("Bars"),
			query = new Parse.Query(BarsList);

		query.equalTo('pinNumber', code);

		query.first({
			success: function(object) {
				
				ga('send', 'event', 'Voucher', 'click', 'Validate');

				if (object) {
					codeIsValid(object);
				} else {
					codeNotValid(true);
				}
				isSubmitting = false;
			},
			error: function(error) {
				codeNotValid(true);
				isSubmitting = false;
			}
		});

	}

	//Make sure a 4 digit code is input
	function validateCode(e) {

		if (e && e.preventDefault) {
			e.preventDefault();
		}

		if (isSubmitting) {
			return false;
		}

		isSubmitting = true;

		var fields = form.elements,
			i,
			code = '';

		for (i = 0; i < fields.length; i++) {
			if (fields[i].tagName.toLowerCase() === 'input') {
				if (!validator.field(fields[i]).valid) {
					return codeNotValid(e);
				} else {
					code += fields[i].value;
				}
			}
		}

		//4 digit valid code present
		redeemVoucher(code);

	}

	//Make sure that only one digit is input into the field
	function validateFieldInput(e) {

		var key = e.keyCode,
			field = e.target,
			nextSibling = field.nextElementSibling;

		if ((e.charCode < 48 || e.charCode > 57 || field.value.length) && key !== 8 && key !== 13 && key !== 9) {
			return false;
		}

		if (key === 8) {
			return true;
		}

		if (nextSibling && nextSibling.tagName.toLowerCase() === 'input') {
			setTimeout(function() {
				nextSibling.focus();
			}, 10);
		} else {
			setTimeout(function() {
				field.blur();
			}, 10);
		}
		var digit4 = document.getElementById('digit4');
		if(digit4>=0)
		{
			save = document.getElementById('save');
			save.disabled=false;
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
		var backBtn = document.getElementById('backBtn');
		if (this.screenData.standalone) {
			backBtn.parentNode.removeChild(backBtn);
		}
		form = document.getElementById('enter-code-form');
		form.addEventListener('submit', validateCode);
		form.addEventListener('keypress', validateFieldInput);
		document.getElementById('backBtn').addEventListener("click", self.scrManager.goBack);
		
		form.elements['digit1'].focus();
	
		form.addEventListener('keypress', limitFieldInput);

		return this.container;

	}

}

VoucherPageScreen.prototype = new Screen();