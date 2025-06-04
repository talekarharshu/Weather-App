 const apiKey = "01fac5fc3f064dc5be0a94265d5568bf";
    const weatherIcon = document.querySelector(".weather-icon");

    async function getWeather(city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          alert("City not found!");
          return;
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = `${data.main.temp}°C`;
        document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;
        document.querySelector(".description").innerText = data.weather[0].description;

        const condition = data.weather[0].main;
        switch (condition) {
          case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
          case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
          case "Rain":
            weatherIcon.src = "images/Rain.png";
            break;
          case "Drizzle":
            weatherIcon.src = "images/Drizzle.png";
            break;
          case "Thunderstorm":
            weatherIcon.src = "images/Thunderstorm.png";
            break;
          case "Snow":
            weatherIcon.src = "images/Snow.png";
            break;
          case "Mist":
          case "Haze":
          case "Fog":
            weatherIcon.src = "images/Mist.png";
            break;
          default:
            weatherIcon.src = "images/clear.png";
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
      }
    }

    document.getElementById("searchButton").addEventListener("click", () => {
      const city = document.getElementById("cityInput").value.trim();
      if (city) getWeather(city);
    });

    document.getElementById("cityInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const city = e.target.value.trim();
        if (city) getWeather(city);
      }
    });

    window.onload = () => getWeather("Mumbai");
