// Create a new date instance dynamically with JS
const defaultCityName = 'hanoi'

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function handleSubmit(e) {
    const tripStartDate = document.getElementById('feelings').value;
    let cityName = document.getElementById('city').value;


    //TODO: handle error when user do not input city name or can not find city name
    if (cityName === '') {
        cityName=defaultCityName;
    }

    const res = await postData("/addNewTrip", {
        city: cityName,
        date: tripStartDate,
    })

    //Get weather data
    if (200 === res.status) {
        // res = await getData('/getWeatherData');
        await getData('/getWeatherData');
    }

    updateUI(res);
}

//Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

    try {
      console.log("${url} responded status => " + response.statusText);
      return response;
    }catch(error) {
        console.log("error", error);
    }
};

//Async GET
const getData = async (url = '') =>{

    const response = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
      let status = response.status;
      return status;
    } catch(error) {
        console.log("error", error);
    }
};


//Update UI
const updateUI = async(res_data) => {
    const request = await fetch('/getData');

    try {
        const data = await request.json();

        //reset dashboard
        document.getElementById('boardTitle').innerHTML = "";
        document.getElementById('tripTitle').innerHTML = "";
        document.getElementById('date').innerHTML = "";
        document.getElementById('currentWeather').innerHTML = "";
        document.getElementById('weatherDescription').innerHTML = "";
        document.getElementById('weatherIcon').src = "";

        if (res_data.status === 200) {
            document.getElementById('boardTitle').innerHTML = "Trip details";
            document.getElementById('tripTitle').innerHTML = "Your trip to: " + data.name + ", country: " + data.country;
            document.getElementById('date').innerHTML = "Departuring: " + data.date;
            document.getElementById('currentWeather').innerHTML = "Current weather";
            document.getElementById('weatherIcon').src = `https://www.weatherbit.io/static/img/icons/${data.icon}.png`;
            document.getElementById('weatherDescription').innerHTML = data.description + ", temperature: " + data.temp + "°C";
        } else {
            document.getElementById('boardTitle').innerHTML = "Error: " + res_data.statusText;

        }
    } catch(error) {
        console.log('error: ', error)
    }
}

export {
    handleSubmit,
    postData,
    updateUI
}