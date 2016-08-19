var Validate = function() {

	//Validate the maximum value of a field
	function isMaxValueValid(field) {

		var output = {
				valid: true,
				field: field
			},
			type = field.type,
			altType = field.getAttribute('type'),
			max = field.getAttribute('max'),
			value;

		if (max !== null) {

			if (type === 'file') {

				max = parseFloat(max);

				if (field.files.length > max) {

					output.valid = false;
					output.error = 'The maximum accepted number of uploaded files is ' + max + '.';

				}

			} else if (field.value.length > 0) {

				max = parseFloat(max);

				value = parseFloat(field.value);

				if (value > max) {

					field.value = max;

					output.valid = false;
					output.error = 'The maximum accepted value is ' + max + '.';

				}

			}
		}

		return output;

	}

	//Validate the minimum value of a field
	function isMinValueValid(field) {

		var output = {
				valid: true,
				field: field
			},
			type = field.type,
			altType = field.getAttribute('type'),
			min = field.getAttribute('min'),
			value;

		if (min !== null) {

			if (type === 'file' && field.files.length > 0) {

				min = parseFloat(min);

				if (field.files.length < min) {

					output.valid = false;
					output.error = 'The minimum accepted number of uploaded files is ' + min + '.';

				}

			} else if (field.value.length > 0 ) {

				min = parseFloat(min);

				value = parseFloat(field.value);

				if (value < min) {

					field.value = min;

					output.valid = false;
					output.error = 'The minimum accepted value is ' + min + '.';

				}

			}
		}

		return output;

	}

	//Validate the maximum length of the value of a field
	function isMaxLengthValid(field) {

		var output = {
				valid: true,
				field: field
			},
			maxLength = field.getAttribute('maxlength');

		if (maxLength !== null && field.value.length > parseInt(maxLength, 10)) {
			
			field.value = field.value.substring(0, maxLength);

			output.valid = false;
			output.error = 'TThe maximum accepted length is ' + maxLength + ' characters.';

		}

		return output;

	}

	//Validate the minimum length of the value of a field
	function isMinLengthValid(field) {

		var output = {
				valid: true,
				field: field
			},
			minLength = field.getAttribute('minlength');

		if (minLength !== null && field.value.length > 0 && field.value.length < parseInt(minLength, 10)) {
			
			output.valid = false;
			output.error = 'The minimum accepted length is ' + minLength + ' characters.';

		}

		return output;

	}

	//Validate the value pattern of the field
	function isPatternValid(field) {

		var output = {
				valid: true,
				field: field
			},
			pattern = field.getAttribute('pattern');

		pattern = pattern !== null ? new RegExp(pattern) : false;

		if (pattern && field.value.length > 0 && !pattern.test(field.value)) {
			
			output.valid = false;
			output.error = 'The format is not valid.';

		}

		return output;

	}

	//Validate an email address in the field
	function isEmailValid(field) {

		var output = {
				valid: true,
				field: field
			},
			type = field.type,
			emailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (type === 'email' && field.value.length > 0 && !emailRegEx.test(field.value)) {
			
			output.valid = false;
			output.error = 'The email address provided is not valid.';

		}

		return output;

	}

	//Validate the requirement of a field
	function isRequiredValid(field) {

		var output = {
				valid: true,
				field: field
			},
			type = field.type;

		if (field.required) {

			if (type === 'file') {

				if (field.files.length === 0) {
					output.valid = false;
					output.error = 'This field is required.';
				}

			} else if (type === 'select-multiple') {

				if (field.selectedOptions.length === 0) {
					output.valid = false;
					output.error = 'This field is required.';
				}

			} else if (field.value.length === 0) {
				output.valid = false;
				output.error = 'This field is required.';
			}

		}

		return output;

	}

	//Full processing of a single field validation
	function validateField(field) {

		if (!field) {
			console.warn('Tried to validate a form field, but no field was provided.');
			return;
		}

		var type = field.type,
			validationOutput = {
				valid: true,
				field: field
			},
			requiredValidations = [
				isRequiredValid,
				isPatternValid,
				isEmailValid,
				isMinLengthValid,
				isMaxLengthValid,
				isMinValueValid,
				isMaxValueValid
			],
			i;

		//Remove white space on the ends
		if (type !== 'file' && type !== 'select' && type !== 'select-multiple') {

			if (type === 'number') {
				field.value = parseFloat(field.value);
			} else {
				field.value = field.value.trim();
			}
			
		}

		for (i = 0; i < requiredValidations.length; i++) {

			validationOutput = requiredValidations[i](field);

			if (!validationOutput.valid) {
				return validationOutput;
			}

		}

		return validationOutput;

	}

	return {
		field: validateField
	};

};