'use strict'
// defined all variables

var key = "4fe4e7559494ab53f530900317599bbf";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var errorNode = document.querySelector(".error");
var cardNode = document.querySelector(".city-card");
var inputBox = document.querySelector("#txt-input");
var cityname = document.querySelector(".city-name");
var cardtime = document.querySelector(".date");
var temperature = document.querySelector(".temperature");
var minMaxTemp = document.querySelector(".min-max");
var weatherStatus = document.querySelector(".status");
var weatherIcon = document.querySelector(".weather-icon");
var cityNames = null;

// Event Listener Added

inputBox.addEventListener("focus", function(){errorNode.classList.add("hide-me")});
document.querySelector("#find-btn").addEventListener("click", validate);
document.querySelector("#clear-btn").addEventListener("click", function(){
    cardNode.classList.add("hide-me");
    errorNode.classList.add("hide-me");
    document.querySelector("body").className = "";
    document.querySelector("body").classList.add('setBackground-transprent');
})

cardNode.classList.add("hide-me");
errorNode.classList.add("hide-me");

//input validation
function validate(){
    if(inputBox.value.trim() != ""){
        // geting city names data
        var cityNameApi = new XMLHttpRequest();
        cityNameApi.open("GET", "https://countriesnow.space/api/v0.1/countries" , true);
        cityNameApi.onload = function(){
            if(this.status == 200){
                cityNames = JSON.parse(this.response);
                checkCityName(inputBox.value.trim());
            }
            else
                errorNode.classList.remove("hide-me");
        }
        if(cityNames == null)
            cityNameApi.send();
        else
            checkCityName(inputBox.value.trim());
    }
    else{
        cardNode.classList.add("hide-me");
        errorNode.classList.remove("hide-me");
    }
}

//fetching data from api call
function fetchData(city){
    var apiRequest = new XMLHttpRequest();
    var setApiURL = apiUrl+city+"&appid="+key+"&units=metric";
    console.log(setApiURL);
    apiRequest.open("GET", setApiURL, true);
    apiRequest.onload = function(){
        (this.status == 200) ? display(JSON.parse(this.response)) : errorNode.classList.remove("hide-me");
    }
    apiRequest.send();
}

//display data on screen as card
function display(data){
    cardNode.classList.remove("hide-me");
    cityname.innerHTML = data.name;
    temperature.innerHTML = data.main.temp+" &deg;C";
    minMaxTemp.innerHTML = "Min. "+Math.floor(data.main.temp_min)+" &deg;C &nbsp; Max. "+Math.ceil(data.main.temp_max)+" &deg;C";
    weatherStatus.innerHTML = data.weather[0].main;
    cardtime.innerHTML = getDisplayDate();
    weatherIcon.innerHTML = '<img src="https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png" alt="Weather Icon">';
    setBackgroundBody(data.weather[0].main);
}

//will return current date and time
function getDisplayDate(){
    var dateObj = new Date();
    var hrs = dateObj.getHours();
    var month = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var timeline;
    if(hrs>11){
        hrs -= 12;
        timeline = " PM";
    }
    else
        timeline = " AM";
    hrs = ("0"+hrs).slice(-2);
    return dateObj.getDate()+" "+month[dateObj.getMonth()]+" &nbsp; "+hrs+":"+("0"+dateObj.getMinutes()).slice(-2)+timeline;
}

function setBackgroundBody( weatherStatusString ){
    var bodyNode = document.querySelector("body");
    document.querySelector("body").className = "";
    bodyNode.classList.add('setBackground-'+weatherStatusString);
}

// city name validation
function checkCityName(cityValue){
    var flag = true;
    cityNames.data.forEach(function(val){
        val.cities.forEach(function(valOfCity){
            if( cityValue.toLowerCase() == valOfCity.toLowerCase() ){
                fetchData(valOfCity);
                flag = false;
            }
        });
    });
    if(flag){
        cardNode.classList.add("hide-me");
        errorNode.classList.remove("hide-me");
    }
}