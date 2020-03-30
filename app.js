
class Covid {
	get(countryName="poland") {
		return new Promise((resolve,reject) => {
			fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${countryName}`, {
				method: 'GET',
				headers: {
					"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
					"x-rapidapi-key": "255ff1de94mshf64633143b351ddp12e9b3jsn7b0289a17312"
				}
			})
			.then((response) => response.text())
			.then((body) => resolve(JSON.parse(body)))
			.catch((err) => {reject(err)});
		})
	}
}

class News {
	get(url) {
		return new Promise((resolve,reject) => {
			fetch(url)
			.then(res => res.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
		})
	} 
}



//----Default-------------------//

let dataCovid = new Covid();
dataCovid.get('poland').then(data);


function data(body) {
	let totalCases = body.latest_stat_by_country[0].total_cases;
	let totalCases1 = totalCases;
	totalCases1 = totalCases1.replace(/,/g,"");
	let totalDeaths = body.latest_stat_by_country[0].total_deaths;
	let totalRecovered = body.latest_stat_by_country[0].total_recovered;
	let criticalCondition = body.latest_stat_by_country[0].serious_critical;

	if (criticalCondition ==="") {
		criticalCondition = 0;
	}
	let mildCondition = (parseInt(totalCases1,10)  - parseInt(totalDeaths) - parseInt(totalRecovered) - parseInt(criticalCondition));
	mildCondition = mildCondition.toLocaleString();
	let newCases = body.latest_stat_by_country[0].new_cases;
	let newDeaths = body.latest_stat_by_country[0].new_deaths;
	//-----------Total cases-----------------//
	document.querySelector('.total-cases-value').innerHTML = `Total Cases: <span>${totalCases}</span>`;
	document.querySelector('.total-deaths-value').innerHTML = `Total Deaths: <span>${totalDeaths}</span>`;
	document.querySelector('.total-recovered-value').innerHTML = `Total Recovered: <span class="recovered">${totalRecovered}</span>`;

	//----------Condition------------------//
	document.querySelector('.mild-condition-value').innerHTML = `Mild Condition: <span class="mild">${mildCondition}</span>`;
	document.querySelector('.critical-condition-value').innerHTML = `Critical Condition: <span class="critical">${criticalCondition}</span>`;

	//------------Todays Stats----------------//
	document.querySelector('.new-cases-value').innerHTML = `New Cases: <span >${newCases}</span>`;

	if(newDeaths ==="") {
		document.querySelector('.new-deaths-value').innerHTML = `New Deaths: <span class="critical">0</span>`;
	} else {
		document.querySelector('.new-deaths-value').innerHTML = `New Deaths: <span class="critical">${newDeaths}</span>`;
	}	

	
	
}

let polandNews = new News();

polandNews.get('https://newsapi.org/v2/top-headlines?country=pl&apiKey=da3e10e7f20b4b068309092b85f2c476').then(articles).catch(err =>console.log(err));

function articles(body) {
	let output = ''
	body.articles.forEach((article) => {
		output += `<div class="news-one news" translate="yes">
		<h2 class="title">${article.title}</h2>
		<p>${article.description}</p>
		<h4 class="read-more"><a href=${article.url}>Read More</a></h4>
	</div>`
	})

	document.querySelector('.news-box-content').innerHTML = output;

	
}

//----------------Search-box-----------------//
let countryName1 = document.querySelector('.search');
countryName1.addEventListener('submit',submitData);

function submitData(e) {
	let countries = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"American Samoa",
		"Andorra",
		"Angola",
		"Anguilla",
		"Antarctica",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Aruba",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia ",
		"Bonaire", 
		"Bosnia and Herzegovina",
		"Botswana",
		"Bouvet Island",
		"Brazil",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Cayman Islands",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Christmas Island",
		"Colombia",
		"Congo",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Curaçao",
		"Cyprus",
		"Czechia",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"French Guiana",
		"French Polynesia",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Gibraltar",
		"Greece",
		"Greenland",
		"Grenada",
		"Guadeloupe",
		"Guam",
		"Guatemala",
		"Guernsey",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Heard Island and McDonald Islands",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Isle of Man",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jersey",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Kuwait",
		"Kyrgyzstan",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macao",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Martinique",
		"Mauritania",
		"Mauritius",
		"Mayotte",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Montserrat",
		"Morocco",
		"Mozambique",
		"Myanmar",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Caledonia",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Niue",
		"Norfolk Island",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestine",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Pitcairn",
		"Poland",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Republic of North Macedonia",
		"Romania",
		"Russia",
		"Rwanda",
		"Réunion",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Martin",
		"San Marino",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Sint Maarten",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"Sudan",
		"Spain",
		"Sri Lanka",
		"Suriname",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor-Leste",
		"Togo",
		"Tokelau",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"uae",
		"uk",
		"usa",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Venezuela",
		"VietNam",
		"Virgin Islands",
		"Yemen",
		"Zambia",
		"Zimbabwe"
	];

	let data3 = document.querySelector('.country-name').value.toLowerCase();
	let data4 = "";
	const newCountries = countries.map((country) => {
		return country.toLowerCase()
	})
	
	newCountries.forEach((country) => {
		if(country === data3) {
			data4 = data3;
			document.querySelector('.main-heading').innerText = `${data3} Stats` ;
			document.querySelector('.main-heading').style.textTransform = "capitalize";

			let dataCovid = new Covid();
			if (data3 ===''){
				dataCovid.get().then(data);
			} else if( data3 === 'poland'){
				dataCovid.get(data3).then(data);
				document.querySelector(".silesian-vivodship").style.display = 'block';
			}
			else {
				dataCovid.get(data3).then(data);
				document.querySelector(".silesian-vivodship").style.display = 'none';
			}

		}

	})

	if (data4 !== data3){
		document.querySelector('.main-heading').innerHTML = `Please enter a valid country name <br> <span class="warning-message">(In case of the USA and the UK search as USA and UK)</span> ` ;
		// document.querySelector('.warning-message').textContent = `In case of the USA and the UK search as USA and UK`;
		
	}
	e.preventDefault();
}
