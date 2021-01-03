const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('.search-city');
const input = document.querySelector('.search');
const err = document.querySelector('.err');
const spiner = document.querySelector('.loader');
const showWeather = document.querySelector('.show-weather');
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const deg = document.querySelector('.deg');
const icon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const localTime = document.querySelector('.local-time');
const lostUpdated = document.querySelector('.last-updated');
let errorMessage;


form.addEventListener('submit', function(e) {
    e.preventDefault();
    cityName = input.value.trim();
    getWeather(cityName);
    input.value = '';
})


const getWeather = async(searchedCity) => {
    try {
        spiner.style.display = 'block';
        showWeather.style.display = 'none';
        err.style.display = 'none';
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=46c0c6ed2a8c4c51bfc71149201712&q=${searchedCity}`);
        const data = await res.json();
        console.log(data);
        (data.error) && (errorMessage = data.error.message);
        country.innerHTML = data.location.country;
        city.innerHTML = data.location.name;
        deg.innerHTML = data.current.temp_c;
        icon.src = data.current.condition.icon;
        condition.innerHTML = data.current.condition.text;
        localTime.innerHTML = data.location.localtime;
        lostUpdated.innerHTML = data.current.last_updated;

        showWeather.style.display = 'block';
        spiner.style.display = 'none';


    } catch (error) {

        spiner.style.display = 'none';
        err.style.display = 'block';
        err.innerHTML = errorMessage;
        setTimeout(() => err.style.display = 'none', 2000)

    }
}