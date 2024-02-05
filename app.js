if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}


let  getWeather = () => {
  let cName = document.querySelector('#inp-weather').value;
  let weather = document.querySelector('.notFound');
  let weatherdata = document.querySelector('.weather')
  if(cName!==""){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cName}&units=metric&appid=3f83207dfc6dd0be845e6d19c51ed6d8`)
    .then((res) => {
      weatherdata.style.display = "block";
      weather.style.display="none";
      console.log(res)
      document.querySelector('.celcius').innerHTML = Math.round(res.data.main.temp) + '°c';
      document.querySelector('.humadityP').innerHTML = Math.round(res.data.main.humidity) + '%';
      document.querySelector('.city').innerHTML = res.data.name ;
      document.querySelector('.windS').innerHTML = Math.round(res.data.wind.speed) + 'km/h';
  
      let weatherIcon = document.querySelector('.weather-icon')
      let weatherCondition = res.data.weather[0].main;
      // weatherIcon.src = "./img/rain.png"
      console.log(res.data.weather[0].icon)
      weatherIcon.src = "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";
      
      console.log(weatherCondition)
      if(weatherCondition === 'Smoke'){
       weatherIcon.icon = "img/smoke.png"
      }
      else if (weatherCondition === 'Clear') {
        weatherIcon.src = "img/clear-sky.png"
      }
      else if (weatherCondition === 'Haze') {
        weatherIcon.src = "img/haze.png"
      }
      else if (weatherCondition === 'Snow') {
        weatherIcon.src = "img/snow.png"
      }
      else if (weatherCondition === 'Clouds') {
        weatherIcon.src = "img/cloud.png"
      }
    })
      .catch((err) => {
        weather.style.display="block";
        weatherdata.style.display = "none";
       
           });
  }
  else{
    Swal.fire({
      icon: "error",
      text: "Plese Enter a country/city",
    });
  }
}
   