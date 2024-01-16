const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "709c75ce9d3f39c1eb8d4904d7f99f26";

weatherform.addEventListener("submit", async event =>{

    event.preventDefault();
    const city = cityInput.value;
    if(city)
    {
        try
        {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }   
        catch(error)
        {
            console.log(error);
            displayError(error);
        }
    }
    else
    {
        displayError("Provide city ");
    }
});

async function getWeatherData(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    
    if(!response.ok)
    {
        throw new Error("Could not fetch data");
    }
    return await response.json();
}

function displayWeatherInfo(data)
{
    const { name:city, 
            main:{temp,humidity}, 
            weather:[{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisiplay = document.createElement("h1");
    const tempDisiplay = document.createElement("p");
    const humidityDisiplay = document.createElement("p");
    const descDisiplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisiplay.textContent = city;
    tempDisiplay.textContent = `${(temp -273.15).toFixed()} degree`;
    humidityDisiplay.textContent = `Hudmidity : ${humidity}`;
    descDisiplay.textContent = `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);



    cityDisiplay.classList.add("cityDisiplay");
    tempDisiplay.classList.add("tempDisiplay");
    humidityDisiplay.classList.add("humidityDisiplay");
    descDisiplay.classList.add("descDisiplay");
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisiplay);
    card.appendChild(tempDisiplay);
    card.appendChild(humidityDisiplay);
    card.appendChild(descDisiplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId)
{
    switch(true)
    {
        case (weatherId>=200 && weatherId<300):
            return "☁️";
        case (weatherId>=300 && weatherId<400):
            return "☁️";
        case (weatherId>=500 && weatherId<600):
            return "☁️";
        case (weatherId>=600 && weatherId<700):
            return "❄️";
        case (weatherId>=700 && weatherId<800):
            return "💨";
        case (weatherId === 800):
            return "☀️";
        case (weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return "❔";
    }
}

function displayError(message)
{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}