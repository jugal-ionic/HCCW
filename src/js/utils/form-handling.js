var FormHandler = function(userConfig) {

	var validate,
		fieldErrors = {},
		fieldErrorContainers = {},
		config = {
			form: false,
			submitBlacklist: {},
			onFieldChanged: false,
			onSubmitSuccess: false
		},
		request,
		submitting = false;

	for (i in userConfig) {
		if (userConfig.hasOwnProperty(i)) {
			config[i] = userConfig[i]
		}
	}

	function resetValidation() {

		var i,
			wrapper;

		for (i in fieldErrors) {
			if (i && fieldErrors.hasOwnProperty(i)) {
				wrapper = getParentWithClass(config['form'].elements[i], 'field-wrapper');
				wrapper.className = 'field-wrapper';

			}
		}

		for (i in fieldErrorContainers) {
			if (i && fieldErrorContainers.hasOwnProperty(i)) {
				fieldErrorContainers[i].innerHTML = '';
			}
		}

		fieldErrors = {};
		fieldErrorContainers = {};

	}

	function updateFieldError(field) {

		var wrapper = getParentWithClass(field, 'field-wrapper');

		if (fieldErrors[field.name]) {
			swapClass(wrapper, 'ok', 'error');

			if (!fieldErrorContainers[field.name]) {
				fieldErrorContainers[field.name] = wrapper.querySelector('p.field-error');
			}

			if (fieldErrorContainers[field.name]) {
				fieldErrorContainers[field.name].textContent = fieldErrors[field.name];
			}

		} else {
			swapClass(wrapper, 'error', 'ok');

			if (fieldErrorContainers[field.name]) {
				fieldErrorContainers[field.name].innerHTML = '';
			}

		}

	}

	//Full processing of a single field validation
	function validateField(e) {

		var field = e.target || e,
			fieldName = field.name,
			fieldValidation = validate.field(field),
			linkedField;

		//Update form errors
		if (fieldValidation.valid && fieldErrors[fieldName]) {
			fieldErrors[fieldName] = false;
		} else {
			fieldErrors[fieldName] = fieldValidation.error;
		}

		updateFieldError(field);

		if (e.target && config.onFieldChanged) {
			config.onFieldChanged(fieldName, fieldValidation);
		}
		
		linkedField = field.getAttribute('linkeddate') || field.getAttribute('linkedtime') || false;

		//Validate linked field
		//Compare the field and value of e to avoid an infinite loop of linked fields
		if (linkedField && field !== e) {
			linkedField = field.form.elements[linkedField];
			validateField(linkedField);
		}

		return fieldValidation;

	}

	//Full processing of an entire form validation
	function validateForm() {

		var isValid = true,
			fields = config['form'].elements,
			i,
			fieldValidation,
			validationBlacklist = ['fieldset', 'button', 'hidden', 'reset', 'submit'];

		for (i = 0; i < fields.length; i++) {

			if (validationBlacklist.indexOf(fields[i].type) < 0) {

				fieldValidation = validateField(fields[i]);

				if (!fieldValidation.valid) {
					isValid = false;
				}

			}

		}

		return isValid;

	}

	function disableFormActions() {

		var formFields = config['form'].elements;

		if (formFields['submit-btn']) {
			formFields['submit-btn'].disabled = true;
		}

		if (formFields['reset-btn']) {
			formFields['reset-btn'].disabled = true;
		}

	}

	function enableFormActions() {

		var formFields = config['form'].elements;

		if (formFields['submit-btn']) {
			formFields['submit-btn'].disabled = false;
		}

		if (formFields['reset-btn']) {
			formFields['reset-btn'].disabled = false;
		}

	}

	function formResponse(e) {

		var target = e.target,
			response,
			onSuccessGoTo;

		if (target.readyState !== 4) {
			return;
		}

		if (target.status >= 200 && target.status < 400) {

			response = JSON.parse(target.responseText);

			if (response.success) {

				onSuccessGoTo = config['form'].getAttribute('onsuccessgoto');

				if (onSuccessGoTo) {
					return window.location = onSuccessGoTo;
				}

				if (config['onSubmitSuccess']) {
					config['onSubmitSuccess']();
				}

			} else {

			}

			if (config['form'].getAttribute('onsuccessgoto')) {

			}

		} else {
			console.error('Error submitting form.', target.responseText);
		}

		enableFormActions();
		submitting = false;

	}

	function serializeFormData() {

		var fields = config['form'].elements,
			fieldType,
			i,
			j,
			valuePairs = [];

		for (i = 0; i < fields.length; i++) {
			if (fields[i].name && !config.submitBlacklist[fields[i].name]) {

				fieldType = fields[i].type;
				nodeName = fields[i].nodeName.toLowerCase();

				if (nodeName === 'button' || nodeName === 'fieldset') {
					continue;
				}

				if (fieldType === 'checkbox' || fieldType === 'radio') {
					if (!fields[i].checked) {
						continue;
					}
				}

				if (fieldType !== 'select-multiple') {
					valuePairs.push(encodeURIComponent(fields[i].name) + '=' + encodeURIComponent(fields[i].value));
					continue;
				}

				for (j = 0; j < fields[i].selectedOptions.length; j += 1) {
					valuePairs.push(encodeURIComponent(fields[i].name) + '=' + encodeURIComponent(fields[i].selectedOptions[j].value));
				}

			}
		}

		return valuePairs.join('&');

	}

	function sendFormData() {

		var formData = serializeFormData(),
			method = config['form'].method.toUpperCase(),
			action = config['form'].action + (method === 'GET' ? '?' + formData : '');

		request = new XMLHttpRequest();
		request.onreadystatechange = formResponse;
		request.open(method, action, true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		if (method === 'POST') {
			request.send(formData);
		} else {
			request.send();
		}
		
	}

	function submitForm(e) {

		e.preventDefault();

		if (submitting) {
			return;
		}

		var isValid = validateForm(),
			formData;

		if (isValid) {

			submitting = true;
			config['form'].classList.add('submitting');
			disableFormActions();

			sendFormData();

		} else {
			console.log('errors in the form');
		}

	}

	function formReset() {

		var photoPreviews = config.form.getElementsByClassName('photo-crop-preview'),
			photoPreview,
			i;

		for (i = 0; i < photoPreviews.length; i++) {
			photoPreview = photoPreviews[i];
			photoPreview.parentNode.removeChild(photoPreview);
		}
		
		setTimeout(resetValidation, 50);

	}

	function initDateUI(dateField) {

		dateField.readOnly = true;

		var datePickerOpts = {
				field: dateField,
				format: 'YYYY-MM-DD'
			},
			datePicker,
			minDate = dateField.getAttribute('min'),
			maxDate = dateField.getAttribute('max');

		if (minDate) {
			datePickerOpts['minDate'] = moment(minDate, 'YYYY-MM-DD').toDate();
		}

		if (maxDate) {
			datePickerOpts['maxDate'] = moment(maxDate, 'YYYY-MM-DD').toDate();
		}

		datePicker = new Pikaday(datePickerOpts);

	}

	function initTimeUI(timeField) {

		timeField.readOnly = true;

		var timePicker = new TimePicker({
			target: timeField
		});

		timePicker.init();

	}

	//Remove event listeners
	function destroy() {

		config['form'].removeEventListener('change', validateForm);
		config['form'].removeEventListener('submit', submitForm);
		config['form'].removeEventListener('reset', formReset);

		config['form'].reset();

		enableFormActions();

		config = {
			form: false,
			submitBlacklist: []
		};

		fieldErrors = undefined;
		fieldErrorContainers = undefined;

		validate = undefined;

		if (request) {
			request.abort();
			request = undefined;
		}

	}

	//Add event listeners and required attributes
	function init() {

		if (!config['form']) {
			return;
		}

		enableFormActions();

		var i,
			fields = config['form'].elements,
			dateInputSupport = dateInputSupported();

		for (i = 0; i < fields.length; i += 1) {
			if (fields[i].getAttribute('type') === 'date' && !dateInputSupport) {
				initDateUI(fields[i]);
			} else if (fields[i].getAttribute('type') === 'time' && !dateInputSupport) {
				initTimeUI(fields[i]);
			}
		}

		validate = new Validate();

		config['form'].addEventListener('change', validateField);
		config['form'].addEventListener('submit', submitForm);
		config['form'].addEventListener('reset', formReset);

		config['form'].setAttribute('novalidate', 'novalidate');

	}

	return {
		init: init,
		destroy: destroy,
		validateField: validateField
	};

};