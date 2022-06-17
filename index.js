function getData(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=d56b027f0d0c4b16b2b144656221706&q=${location}&aqi=yes`)
        .then(response => response.json())
        .then(data => initialize(data))
        .catch(error => console.log(error))
        .finally(console.log("fetched successfully!"));

    function initialize(data) {
        let locationData = data;
        updateCurrentWeather(locationData);
        console.log(locationData.current);
    }
}

function updateCurrentWeather(data) {
    let currentWeather = document.getElementById("currentWeatherData");
    let html = `<div class="row">
<div class="col city-wrapper">
    <h1 class="city" id="city">${data.location.name}</h1>
</div>
<div class="col city-details-wrapper">
        <h5>${data.location.country}</h5>
        <h5>Local Time - ${data.location.localtime.split(" ")[1]}</h5>
        <h6>latitude - ${data.location.lat}</h6>
        <h6>longitude - ${data.location.lon}</h6>
</div>
<div class="col temperature-wrapper">
    <h3 class="condition">${data.current.condition.text}</h3>
    <img class="condition-img" src="${data.current.condition.icon}">
    <h2 class="temperature">${data.current.temp_c} <sup>o</sup>C</h2>
    <p class="feels-like"><em>Feels Like <span>${data.current.feelslike_c} <sup>o</sup>C</span></em></p>
</div>
<div class="col other-details-wrapper">
    <h5 class="wind">Wind</h5>
    <p>Speed-  ${data.current.wind_kph} kmph</p>
    <p>Direction - ${data.current.wind_degree} ${data.current.wind_dir}</p>
    <h5 class="aqi">Air Quality Index - ${data.current.air_quality["us-epa-index"]}</h5>
</div>
</div>`
    currentWeather.innerHTML = html;
}

function UpdateUI() {
    let search = document.getElementById("searchField");
    let searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        let locationToSearch = search.value;
        getData(locationToSearch);
        console.log("clicked");
    })
    search.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            let locationToSearch = search.value;
            getData(locationToSearch);
            console.log("clicked");
        }
    })
}
UpdateUI();