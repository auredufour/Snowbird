
// find the localisation of the user
//--------------------------------------------------------------------
function geoFindMe() {
  // var output = document.getElementById("out");

  // if (!navigator.geolocation){
  //   output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  //   return;
  // }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    weatherUser.getInfo(latitude,longitude);
  };

  // function error() {
  //   output.innerHTML = "Unable to retrieve your location";
  // };

  // 	output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success);
}


// find the weather from where the user is
//----------------------------------------------------------------------
var weatherUser = {};
weatherUser.apiKey ='f3ff2e28132dc728';

weatherUser.getInfo = function(latitude,longitude) {
	$.ajax({
		url: 'http://api.wunderground.com/api/'+ weatherUser.apiKey +'/conditions/forecast/alert/q/'+ latitude +','+longitude+ '.json',
		method: 'GET',
		dataType: 'json',
	}).then( function(weatherUserRes){
		weatherUser.displayInfo(weatherUserRes);

	});
};

weatherUser.displayInfo = function(weatherUserRes) {
	console.log(weatherUserRes)
	var weatherType = weatherUserRes.current_observation.icon;
	var weatherTemp = weatherUserRes.current_observation.temp_c;
	$('span.temp_c').text(weatherTemp);
	weatherUser.weatherLocation = weatherUserRes.current_observation.display_location.city;
	$('p.cityName').text(weatherUser.weatherLocation);
	var weatherObs = weatherUserRes.current_observation.weather;
	$('p.weatherObs').text(weatherObs);
	// rome2rio.getInfo(weatherLocation)

	if (weatherType === 'clear' || 
		weatherType === 'mostlysunny' || 
		weatherType === 'partlysunny' ||
		weatherType === 'sunny'){
		var image = $('<img>').attr('src','assets/clear-day.svg');
		$('.iconWeather').append(image);

	} else if ( weatherType === 'cloudy' ||
				weatherType === 'partlycloudy') {
		var image = $('<img>').attr('src','assets/cloudy.svg');
		$('.iconWeather').append(image);

	} else if (weatherType === 'fog' ||
				weatherType === 'hazy'){
		var image = $('<img>').attr('src','assets/fog.svg');
		$('.iconWeather').append(image);

	} else if (weatherType === 'rain'){
		var image = $('<img>').attr('src','assets/heavy-rain.svg');
		$('.iconWeather').append(image);

	} else if (weatherType === 'chancerain'){
		var image = $('<img>').attr('src','assets/light-rain.svg');
		$('.iconWeather').append(image);

	} else if (weatherType === 'mostlycloudy'){
		var image = $('<img>').attr('src','assets/partly-cloudy.svg');
		$('.iconWeather').append(image);

	} else if ( weatherType == 'chancesleet' ||
				weatherType == 'sleet'){
		var image = $('<img>').attr('src','assets/sleet.svg');
		$('.iconWeather').append(image);

	} else if (weatherType == 'chanceflurries' ||
				weatherType == 'chancesnow' ||
				weatherType == 'flurries' ||
				weatherType == 'snow'){
		var image = $('<img>').attr('src','assets/snow.svg');
		$('.iconWeather').append(image);
	
	} else if (weatherType == 'chancetstorms' ||
				weatherType == 'tstorms'){
		var image = $('<img>').attr('src','assets/thunderstorm.svg');
		$('.iconWeather').append(image);

	} else {
		var image = $('<img>').attr('src','assets/unknow.svg');
		$('.iconWeather').append(image);
	}
};

weatherUser.init = function() {
// 	weatherUser.getInfo();
	geoFindMe();

};


//----------------------------- END OF WEATHER USER DATA ---------------------------------

// ask weather option of what the user is looking for
// find location regarding the weather they want


	var weatherCities = {};
	weatherCities.apiKey = '58a484fefee32b589c92e9a4d1f13d09';
	weatherCities.apiUrl = 'http://api.openweathermap.org/data/2.5/group/';
	weatherCities.cities = [2988507, 1850147, 5128638, 3448439, 1835848, 3530597, 1853908, 1275339, 360630, 5368361, 3435910, 524901, 1796236, 745044, 1816670, 4887398, 2643743, 112931, 3688689, 1609350, 993800, 98182, 3117735, 6540586, 2147714, 2158177, 292223, 6173331, 6077243, 5526233, 3172394, 3168673, 3374766, 5855802, 6355126, 4160812, 6453366, 3180864, 3179559, 3176949, 2950159];

	weatherCities.temp = [];

		var getData = function() {
			return $.ajax({
				url: weatherCities.apiUrl,
				method: 'GET',
				dataType: 'json',
				data: {
					APPID: weatherCities.apiKey,
					id: weatherCities.cities.toString().replace(' ',''),
				}
			})
		}

		var items = getData();
		$.when(items).then(function(data) {
			weatherCities.temp.push(data);
			// weatherCities.displayInfo(data)

			}).fail(function() {
			console.log('failed');
		});

// go inside the weatherCities.temp array to get the temp, cities name, and description of the weather.

		weatherCities.displayInfo = function (){
			// var weatherDataCities = weatherCities.temp[0].list
		 	var weatherData = weatherCities.temp[0].list
			//need to got the object.name/weather.description/.main.temp for every Cities
			var citiesCities=[]
			var citiesCitiesTemp=[]
			var citiesCitiesDesc = []
			$.each(weatherData, function( i, tempInfo){
				console.log(tempInfo)

//------------------------------- WEATHER COMPARISON -------------------------------------------
			
				var tempCities = (tempInfo.main.temp - 273.15)
		
				tempCities = parseFloat(tempCities);
				// var descCities = tempInfo.weather[0].description

				var temperature = $('.whereToGo input[name=weather]:checked').val();
				temperature = parseFloat(temperature);
				if (tempCities >= temperature && tempCities <= (temperature + 10) ){
					var nameCities = tempInfo.name
					var descCities = tempInfo.weather[0].id
					var tempCities = tempInfo.main.temp - 273.15
					citiesCities.push(nameCities);
					citiesCitiesTemp.push(tempCities);
					citiesCitiesDesc.push(descCities);
				}

			});
				number = Math.floor(Math.random() * citiesCities.length);
				var randomCity = citiesCities[number];
				var randomTemp = citiesCitiesTemp[number]
				var randomDesc = citiesCitiesDesc[number]
				rome2rio.getInfo(weatherUser.weatherLocation, randomCity)
				weatherUser.randomCity = randomCity;
				weatherUser.randomTemp = Math.round(randomTemp) 
				weatherUser.randomDesc = randomDesc

		}

		weatherCities.init = function(){
			$('form').on('submit', function(e) {
				weatherCities.displayInfo();
				e.preventDefault();
				$('.answer').fadeIn(2000)
				$('html, body').animate ({
				scrollTop: $("span.two").offset().top
				},2200);
 			}); 
		};


//------------------------------- END OF WEATHER CITIES DATA ------------------------------------


// find weather in major cities

// give option of place

// find how to go to place base on option selected

var rome2rio ={};
rome2rio.apiKey = 'R92qWrrN';
rome2rio.apiUrl = 'http://free.rome2rio.com/api/1.2/json/Search?key='+ rome2rio.apiKey ;
// http://free.rome2rio.com/api/1.2/json/Search?key=R92qWrrN&SearchRequest&oName=Paris&dName=Toronto


rome2rio.getInfo = function(weatherLocation,location) {
	$.ajax({
		url: rome2rio.apiUrl,
		method: 'GET',
		dataType: 'json',
		data : {
			oName: weatherLocation,
			dName: location,
			Indicative: 'Price',
		}
	}).then( function(rome2rioresponse){
		rome2rio.displayInfo(rome2rioresponse);
		// console.log(rome2rioresponse)
	});
};

rome2rio.displayInfo = function (rome2rioresponse) {

	//array that keep all the duration of the different object
	var bestDuration =[];
	// to find the duration that is the smaller one
	Array.min = function ( array ){
		return Math.min.apply( Math, array);
	};

		console.log(weatherUser.randomCity)
				console.log(weatherUser.randomTemp)
				console.log(weatherUser.randomDesc)

	$.each(rome2rioresponse.routes, function(i, information){
		bestDuration.push(information.duration);
	});

	$.each(rome2rioresponse.routes, function( i, information ){
		var route = (information.distance);
		var duration = (information.duration);
		var price = (information.indicativePrice.price);
		// var priceCurrency = (information.indicativePrice.currency)
		var transportation = (information.segments[0].vehicle)
		var tranp = Array.min( bestDuration );
		console.log(weatherUser.randomDesc)


	if (weatherUser.randomDesc == '800'){
		var imageAnswer = $('<img>').attr('src','assets/clear-day.svg');
		var textQuote = ('Fuck it, let\'s go to')

	} else if ( weatherUser.randomDesc == '801' ||
				weatherUser.randomDesc == '802' ||
				weatherUser.randomDesc == '803') {
		var imageAnswer  = $('<img>').attr('src','assets/cloudy.svg');
		var textQuote = ('Hasta la vista! I am going to')


	} else if (weatherUser.randomDesc == '701' ||
			   weatherUser.randomDesc == '711' ||
			   weatherUser.randomDesc == '721' ||
			   weatherUser.randomDesc == '731' ||
			   weatherUser.randomDesc == '741' ||
			   weatherUser.randomDesc == '751' ||
			   weatherUser.randomDesc == '761'){
		var imageAnswer  = $('<img>').attr('src','assets/fog.svg');
		var textQuote = ('No man needs a vacation so much as the man who has just had one');


	} else if (weatherUser.randomDesc == '300' ||
			   weatherUser.randomDesc == '301' ||
			   weatherUser.randomDesc == '302' ||
			   weatherUser.randomDesc == '310' ||
			   weatherUser.randomDesc == '311' ||
			   weatherUser.randomDesc == '312' ||
			   weatherUser.randomDesc == '313' ||
			   weatherUser.randomDesc == '314' ||
			   weatherUser.randomDesc == '321' ||
			   weatherUser.randomDesc == '500' ||
			   weatherUser.randomDesc == '502' ||
			   weatherUser.randomDesc == '503' ||
			   weatherUser.randomDesc == '504' ||
			   weatherUser.randomDesc == '511' ||
			   weatherUser.randomDesc == '520' ||
			   weatherUser.randomDesc == '521' ||
			   weatherUser.randomDesc == '522' ||
			   weatherUser.randomDesc == '531'){
		var imageAnswer  = $('<img>').attr('src','assets/heavy-rain.svg');
		var textQuote = ('I need vitamine Sea, I am going to')

	} else if (weatherUser.randomDesc == '804'){
		var imageAnswer = $('<img>').attr('src','assets/partly-cloudy.svg');
		var textQuote =('Je veux aller a')

	} else if ( weatherUser.randomDesc == '611' ||
				weatherUser.randomDesc == '612'){
		var imageAnswer = $('<img>').attr('src','assets/sleet.svg');
		var textQuote = ('I want to goooooo to')

	} else if (weatherUser.randomDesc == '600' ||
			   weatherUser.randomDesc == '601' ||
			   weatherUser.randomDesc == '602' ||
			   weatherUser.randomDesc == '615' ||
			   weatherUser.randomDesc == '616' ||
			   weatherUser.randomDesc == '620' ||
			   weatherUser.randomDesc == '621' ||
			   weatherUser.randomDesc == '622'){
		var imageAnswer = $('<img>').attr('src','assets/snow.svg');
		var textQuote = ('It is snowing, I am going to');
	
	} else if (weatherUser.randomDesc == '200' ||
			   weatherUser.randomDesc == '201' ||
			   weatherUser.randomDesc == '202' ||
			   weatherUser.randomDesc == '210' ||
			   weatherUser.randomDesc == '211' ||
			   weatherUser.randomDesc == '212' ||
			   weatherUser.randomDesc == '221' ||
			   weatherUser.randomDesc == '230' ||
			   weatherUser.randomDesc == '231' ||
			   weatherUser.randomDesc == '232'){
		var imageAnswer = $('<img>').attr('src','assets/thunderstorm.svg');
		var textQuote =('Let\'s go to');

	} else {
		var imageAnswer = $('<img>').attr('src','assets/unknow.svg');
		var textQuote = ('Really need to go to');
	}

		if ( tranp === information.duration) {

		var textAnswer = $('<p>').text(textQuote).addClass('quote');

		var nameAnswer = $('<h3>').text(weatherUser.randomCity).addClass('nameCity');

// var divFlex = $('<div>').addClass('answerBlock').text(iconDiv, tempDiv, priceDiv );

		var iconDiv = $('<div>').addClass('imgAnswer').append(imageAnswer);
		var tempAnswer = $('<div>').addClass('tempAnswer').append($('<p>').text(weatherUser.randomTemp + 'º'));
		var iconAnswer = $('<div>').addClass('plane').append($('<img>').attr('src', 'assets/plane.svg'));
		var priceAnswer = $('<div>').addClass('priceAnswer').append($('<p>').addClass('price').text('$' + price ));
	var flexAnswer = $('<div>').addClass('flexAnswer').append(iconDiv, tempAnswer, iconAnswer, priceAnswer)
		// var routeAnswer = $('<p>').addClass('route').text(route);

		// var durationAnswer = $('<p>').addClass('duration').text(duration);


var travelInfo = $('<div>')
				.addClass('travel')
				.append(textAnswer, 
						nameAnswer, 
						flexAnswer);

		$('div.answer').html(travelInfo);

		};
	});
};
	// $('.clear').on('click', function(e){
	// 	e.preventDefault();
	// 	$('form').html('');
	// });


rome2rio.init = function(){
	// rome2rio.getInfo();
}


$(function(){
	weatherUser.init()
	rome2rio.init()
	weatherCities.init()
})

// find how long it will takes


// give option for plane tickets/train/car


