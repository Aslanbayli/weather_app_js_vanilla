const api = {
  key: "8654aae39113408e854162423211512",
  base: "http://api.weatherapi.com/v1/current.json?key=8654aae39113408e854162423211512"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}&q=${query}&aqi=no`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.location.name}, ${weather.location.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.current.condition.text;

  // let hilow = document.querySelector(".hi-low");
  // hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
  //   weather.main.temp_max
  // )}°c`;

  let day_time = document.querySelector(".day_time");
  if (weather.current.is_day == 1){
    day_time.innerHTML = "Day Time";
  }else{
    day_time.innerHTML = "Night Time";
  }

}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
