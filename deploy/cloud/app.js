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
	console.log(req.body.email);
	nameData = req.body.name || '',
	nameData = nameData.replace(/\s\s+/g, ' ').split(' '),
	firstNameData = nameData[0] || '',
	lastNameData = nameData[1] || '',
	dayOfBirthData = req.body.dobDay || 1,
	Marketing_Optin = req.body.optIn || 'N',
	postCodeData = req.body.postCode || '';
	
	
	var query = new Parse.Query(Parse.User);
	//query = new Parse.Query("SubscriberCounter");
	query.count({
		success: function(counter) {
			var sc = ''+counter;
			var len = 9-sc.length;//9-i
			var SubscriberKey = "HavanaClubWeekender2016";
			for (var i = 0; i <len; i++) {
				//SubscriberKey=SubscriberKey+'0';
			}
			//SubscriberKey=SubscriberKey+counter;
			var InputBody={
			        "Address": req.body.email,
			        "SubscriberKey": SubscriberKey,
			        "Marketing_Optin":Marketing_Optin
			};
			//var payLoad="Address="+req.body.email+"&SubscriberKey="+SubscriberKey+"&Marketing_Optin="+req.body.optIn+"";
			Parse.Cloud.httpRequest({
				url: 'http://159.203.204.76:8000/sub',
				followRedirects: true,
				method: 'POST',
				body: InputBody,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}).then(function(httpResponse) {
				console.log('success');
				return res.send({result:'subscribe!!'});
			}, function(httpResponse) {
				console.log('error');
					//return res.send(JSON.stringify(ApiHeaderParameters));
				return res.send({result:"Got an httpResponse error " + httpResponse.code + " : " + httpResponse.message});
			});
		},
		error: function(error) {
			console.error("Got an error " + error.code + " : " + error.message);
			return res.send({result:"Got an error " + error.code + " : " + error.message});
		}
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
		return res.send({result:'welcome!!'});
});

app.get('/calendar/mnpcd.ics', function(req, res) {

	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'text/calendar');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Content-Disposition', 'attachment; filename="Havana Club Cuban weekender.ics"');

	res.render('icsevent');

});

app.get('/calendar/mnpcd.vcs', function(req, res) {

	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	res.set('Content-Type', 'text/x-vcalendar');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Content-Disposition', 'attachment; filename="Havana Club Cuban weekender.vcs"');

	res.render('vcsevent');

});

app.get('*', function(req, res) {

	res.render('index');

});

// This line is required to make Express respond to http requests.
app.listen();