        const apiKey = "f166fef133bb725db5f95b5c0846f3cf";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchbox = document.getElementById("cityInput");
        const searchbtn = document.querySelector(".search button");
        const weatherContainer = document.querySelector(".Weather");
        const weathericon = document.querySelector(".weather-icon");
        const dateElement = document.getElementById("date");
        const dayElement = document.getElementById("day");
        const dateTimeElement = document.getElementById("dateTime");

function getCurrentDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    return now.toLocaleDateString('en-US', options);
        }

        async function checkweather(city) {
            const response = await fetch(apiUrl + city + "&appid=" + apiKey);

            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                weatherContainer.style.display = "none";
            } else {
                const data = await response.json();

                console.log(data);

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                if (data.weather[0].main == "Clouds") {
                    weathericon.src = "clouds.png";
                } else if (data.weather[0].main == "Clear") {
                    weathericon.src = "clear.png";
                } else if (data.weather[0].main == "Rain") {
                    weathericon.src = "rain.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weathericon.src = "drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    weathericon.src = "mist.png";
                } else {
                    // Handle other weather conditions or set a default icon
                    weathericon.src = "default.png";
                }

                document.querySelector(".error").style.display = "none";
                weatherContainer.style.display = "block";
                dateTimeElement.textContent = getCurrentDateTime();
            }
        }

        searchbtn.addEventListener("click", () => {
            const cityName = searchbox.value.trim();
            if (cityName !== "") {
                checkweather(cityName);
            } else {
                document.querySelector(".error").style.display = "block";
                weatherContainer.style.display = "none";
            }
        });
