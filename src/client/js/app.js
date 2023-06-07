// Create a new date instance dynamically with JS
// import Img from '../img/no_photo.jpg'

const server="http://localhost:8081"
const defaultCityName = 'hanoi';

async function handleSubmit(e) {
    const tripStartDate = document.getElementById('tripStartDate').value;
    let cityName = document.getElementById('city').value;

    if (cityName === '') {
        cityName=defaultCityName;
    }

    const res = await postData(`${server}/addNewTrip`, {
        city: cityName,
        date: tripStartDate,
    })

    //Get weather data
    if (200 === res.status) {
        // res = await getData('/getWeatherData');
        await getData(`${server}/getWeatherData`);

        await getData(`${server}/getCityPhoto`);
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
    const request = await fetch(`${server}/getData`);

    try {
        const data = await request.json();

        //reset infoboard
        document.getElementById('tripTitle').innerHTML = "";
        document.getElementById('date').innerHTML = "";
        document.getElementById('tripCountDown').innerHTML = "";
        document.getElementById('currentWeather').innerHTML = "";
        document.getElementById('weatherDescription1').innerHTML = "";
        document.getElementById('weatherDescription2').innerHTML = "";
        document.getElementById('weatherIcon').src = "";
        document.getElementById('cityImage').src = "";

        if (res_data.status === 200) {
            document.getElementById('tripTitle').innerHTML = "Your trip to: " + data.name + ", country: " + data.country;
            document.getElementById('date').innerHTML = "Departuring: " + data.date;
            document.getElementById('tripCountDown').innerHTML = data.name+ ", " + data.country + " is " + getDiffDays(data.date) + " days away";
            document.getElementById('currentWeather').innerHTML = "Typical weather for then is";
            document.getElementById('weatherIcon').src = `https://www.weatherbit.io/static/img/icons/${data.icon}.png`;
            document.getElementById('weatherDescription1').innerHTML = data.description;
            document.getElementById('weatherDescription2').innerHTML = "High: " + data.high_temp + "°C" + " Low: " + data.low_temp + "°C";
            document.getElementById('cityImage').src = data.image;
            // document.getElementById('cityImage').src = Img;
        } else {
            alert(res_data.statusText);

        }
    } catch(error) {
        console.log('error: ', error)
    }
}

function getDiffDays(date) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date2 = new Date();
    let date1 = new Date(date);

    // console.log("date2 =>" + date2);
    // console.log("inputDate =>" + date);
    // console.log("date1 =>" + date1);

    const diffInDays = Math.round(Math.abs((date2 - date1) / oneDay));

    return diffInDays;
}

export {
    handleSubmit,
    postData,
    getData,
    updateUI
}