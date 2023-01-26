// Weather API key
var apiKey = "30ad82a7adaf1f5c25a136a16380ae36";

//City
var city = "";

//Search
var searchBtn = document.getElementById("search");

//Weather forecast
var currentCity = document.getElementById("current-city");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");

//weather forecast for 5 days
var fiveDayIcon = document.getElementsByClassName("five-day-icon-display");
var fiveDayTemp = document.getElementsByClassName("five-day-temp");
var fiveDayWind = document.getElementsByClassName("five-day-wind");
var fiveDayHumidity = document.getElementsByClassName("five-day-humidity");

//current date
var currentDate = moment().format('L');

//display current date and city name
currentCity.textContent = "Daily Forecast " + "(" + currentDate + ")";

//display weather forecast on search
searchBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    //city input
    city = document.getElementById("search-input").value;

    fetchWeather();
    searchHistory();
});

function fetchWeather() {
    var requestUrl = 
        "https://api.openweathermap.org/data/2.5/weather?q=" + 
        city + 
        "&appid=" + 
        apiKey + 
        "&units=imperial";

console.log(city);
console.log(requestUrl);

//display weather
fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

    //display current date and city
    currentCity.textContent = data.name + " (" + currentDate + ")";

    //display forecast
    currentIcon.setAttribute(
        "src", 
        " http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
    );
    currentTemp.textContent = "Temp: " + data.main.temp + " °F";
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    })
    .catch(function (error) {
        alert("Enter valid city name");
        currentCity.textContent = "Daily Forecast";
        return;
    });

//5 day forecast
var fiveDayUrl = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + 
    city + 
    "&appid=" + 
    apiKey + 
    "&units=imperial";

console.log(fiveDayUrl)

//display 5 day forecast
fetch(fiveDayUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0, j = 6; i < 5, j < data.list.length; i++, j += 8) {
            fiveDayIcon[i].setAttribute(
                "src",
                "http://openweathermap.org/img/wn/" +
                data.list[j].weather[0].icon + 
                ".png"
            );
        fiveDayTemp[i].textContent = "Temp: " + data.list[j].main.temp + "°F";
        fiveDayWind[i].textContent = "Wind: " + data.list[j].wind.speed + " MPH";
        fiveDayHumidity[i].textContent = "Humidity: " + data.list[j].main.humidity + "%";
        }
    });
}

//create search history
function searchHistory() {
    var searchHistoryDiv = document.getElementById("search-history");

    var searchHistoryBtn = document.createElement("button");
    searchHistoryBtn.setAttribute("class", "searchHistory");

    //button for previous searches and saves to local storage
    searchHistoryDiv.append(searchHistoryBtn);
    localStorage.setItem(city, JSON.stringify(city));
    searchHistoryBtn.textContent = JSON.parse(localStorage.getItem(city));

    //show results for previous searches
    searchHistoryBtn.addEventListener("click", function (event) {
        event.preventDefault();
        city = searchHistoryBtn.textContent;
        fetchWeather();
        console.log(city);
    });
}

//display date for 5 day forecast
for (var i = 0; i <5; i++) {
    var futureDate = document.getElementsByClassName("card-title");

    futureDate[i].textContent = moment()
        .add(1 + i, "days")
        .format("L");
}