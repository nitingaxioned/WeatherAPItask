'use strict'
// defined all const & variables

const key = "4fe4e7559494ab53f530900317599bbf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const errorNode = document.querySelector(".error");
const cardNode = document.querySelector(".city-card");
const inputBox = document.querySelector("#txt-input");
const cityname = document.querySelector(".city-name");
const cardtime = document.querySelector(".date");
const temperature = document.querySelector(".temperature");
const minMaxTemp = document.querySelector(".min-max");
const weatherStatus = document.querySelector(".status");
const weatherIcon = document.querySelector(".weather-icon");

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
    if(inputBox.value.trim() != "")
        fetchData(inputBox.value.trim());
    else{
        cardNode.classList.add("hide-me");
        errorNode.classList.remove("hide-me");
    }
}

//fetching data from api call
function fetchData(city){
    let apiRequest = new XMLHttpRequest();
    let setApiURL = apiUrl+city+"&appid="+key+"&units=metric";
    apiRequest.open("GET", setApiURL, true);
    apiRequest.onload = function(){
        if(this.status == 200) 
            display(JSON.parse(this.response));
        else
            errorNode.classList.remove("hide-me");
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
    let dateObj = new Date();
    let hrs = dateObj.getHours();
    let month = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    let timeline;
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
    let bodyNode = document.querySelector("body");
    document.querySelector("body").className = "";
    bodyNode.classList.add('setBackground-'+weatherStatusString);
}