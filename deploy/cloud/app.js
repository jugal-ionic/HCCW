// These two lines are required to initialize Express.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.post('/subscribe', function(req, res) {
	
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'application/json');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

	var output = {
			success: false,
			message: '',
			response: ''
		},
		xmlreader = require('cloud/xmlreader'),
		smartFocusUser = 'API_MALIBU_DEV',
		smartFocusPassword = 'Anal0gF0lk!',
		smartFocusApiKey = 'CdX7Crxn3XiwvGFxeeAahL6iTnYHbdG6iF3tS5haM6-GLkgF',
		openConnectionURL = 'https://p2apic.emv2.com/apimember/services/rest/connect/open?login=' + encodeURIComponent(smartFocusUser) + '&password=' + encodeURIComponent(smartFocusPassword) + '&key=' + encodeURIComponent(smartFocusApiKey),
		addUpdateMemberURL = 'https://p2apic.emv2.com/apimember/services/rest/member/insertOrUpdateMember/';

	function addXmlEntry(key, value) {

		var entryOutput = '<entry>';

		entryOutput += '<key>' + key + '</key>';
		entryOutput += '<value>' + value + '</value>';
		entryOutput += '</entry>';

		return entryOutput;

	}

	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function escapeXml(unsafe) {
		return unsafe.replace(/[<>&'"]/g, function (c) {
			switch (c) {
				case '<': return '&lt;';
				case '>': return '&gt;';
				case '&': return '&amp;';
				case '\'': return '&apos;';
				case '"': return '&quot;';
			}
		});
	}

	function getTokenResponse(error, xmlResponse) {

		if (error) {
			return response.error('Request failed with response ' + error);
		}

		var token = xmlResponse.response.result.text(),
			requestData = '',
			emailData = req.body.email || '',
			nameData = req.body.name || '',
			nameData = nameData.replace(/\s\s+/g, ' ').split(' '),
			firstNameData = nameData[0] || '',
			lastNameData = nameData[1] || '',
			dayOfBirthData = req.body.dobDay || 1,
			monthOfBirthData = req.body.dobMonth || 1,
			yearOfBirthData = req.body.dobYear || 1915,
			emailOptInData = req.body.optIn || 0,
			postCodeData = req.body.postCode || '';

		firstNameData = capitalizeFirstLetter(firstNameData);
		lastNameData = capitalizeFirstLetter(lastNameData);

		dayOfBirthData = ('0'+ dayOfBirthData).slice(-2);
		monthOfBirthData = ('0'+ monthOfBirthData).slice(-2);
		yearOfBirthData = ('000'+ yearOfBirthData).slice(-4);
		emailOptInData = parseInt(emailOptInData, 10);

		requestData += '<?xml version="1.0" encoding="utf-8"?>';
		requestData += '<synchroMember>';
		requestData += '<memberUID>EMAIL:' + escapeXml(emailData) + '</memberUID>';
		requestData += '<dynContent>';
		requestData += addXmlEntry('FIRSTNAME', escapeXml(firstNameData));
        if (lastNameData) {
            requestData += addXmlEntry('LASTNAME', escapeXml(lastNameData));
        }
		requestData += addXmlEntry('DOB_DD', escapeXml(dayOfBirthData));
		requestData += addXmlEntry('DOB_MM', escapeXml(monthOfBirthData));
		requestData += addXmlEntry('DOB_YYYY', escapeXml(yearOfBirthData));
		requestData += addXmlEntry('POSTCODE', escapeXml(postCodeData));
        if (emailOptInData) { //to avoid unsubscribing already subscribed users
            requestData += addXmlEntry('EMAIL_OPTIN', emailOptInData);
        }
		requestData += addXmlEntry('NPCD_2015', 1);
		requestData += '</dynContent>';
		requestData += '</synchroMember>';

		Parse.Cloud.httpRequest({
			url: addUpdateMemberURL + token,
			followRedirects: true,
			method: 'POST',
			body: requestData,
			headers: {
				'Content-Type': 'application/xml',
				'Accept': 'application/xml'
			}
		}).then(function(httpResponse) {

			output.success = true;
			output.response = httpResponse.text;
			output.message = 'Done!';

			return res.send(JSON.stringify(output));

		}, function(httpResponse) {

			output.message = 'Request failed with response code ' + httpResponse.code;
			output.response = httpResponse.text;

			return res.send(JSON.stringify(output));

		});

	}

	Parse.Cloud.httpRequest({
		url: openConnectionURL,
		followRedirects: true
	}).then(function(httpResponse) {

		return xmlreader.read(httpResponse.text.trim(), getTokenResponse);

	}, function(httpResponse) {

		output.message = 'Request failed with response code ' + httpResponse.code;
		return res.send(JSON.stringify(output));

	});

});

app.post('/welcome-user', function(req, res) {
	
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'application/json');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

	var requestData = '',
		emailData = req.body.email || '',
		emailOptInData = req.body.optIn || 0,
		emailOptInData = parseInt(emailOptInData, 10);

	function escapeXml(unsafe) {
		return unsafe.replace(/[<>&'"]/g, function (c) {
			switch (c) {
				case '<': return '&lt;';
				case '>': return '&gt;';
				case '&': return '&amp;';
				case '\'': return '&apos;';
				case '"': return '&quot;';
			}
		});
	}

	var output = {
			success: false,
			message: '',
			response: ''
		},
		IntegrationTag = '9C02000023272A9C',
		SecurityTag = 'EdX7CqkmlKPS8SA9MOPveQPeW0x4HK3D-jreea40KcmqKJ0',
		Email = emailData,
		emailTriggerURL = 'http://api.notificationmessaging.com/NMSREST?random=' + IntegrationTag + '&encrypt=' + SecurityTag + '&email=' + Email + '&senddate=2008%2D12%2D12%2023%3A30%3A00&uidkey&stype=NOTHING';

	Parse.Cloud.httpRequest({
		url: emailTriggerURL,
		followRedirects: true,
		method: 'GET'
	}).then(function(httpResponse) {

		output.success = true;
		output.response = httpResponse.text;
		output.message = 'Done!';
		console.log(emailData);

		return res.send(JSON.stringify(output));

	}, function(httpResponse) {

		output.message = 'Request failed with response code ' + httpResponse.code;
		output.response = httpResponse.text;

		return res.send(JSON.stringify(output));

	});

});

app.get('/calendar/mnpcd.ics', function(req, res) {

	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'text/calendar');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Content-Disposition', 'attachment; filename="Malibu National Piña Colada Day.ics"');

	res.render('icsevent');

});

app.get('/calendar/mnpcd.vcs', function(req, res) {

	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'text/x-vcalendar');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Content-Disposition', 'attachment; filename="Malibu National Piña Colada Day.vcs"');

	res.render('vcsevent');

});

app.get('*', function(req, res) {

	res.render('index');

});

// This line is required to make Express respond to http requests.
app.listen();