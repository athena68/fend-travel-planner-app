/* Global Variables */
const apiKey = '6e14c746901b0568214a1838f72764f1';
const defaultCityName = 'Hanoi,VN';
const baseUrl='http://api.openweathermap.org/data/2.5/weather?q=';
const appApiID=`&appid=${apiKey}&units=metric`;
// const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const userFeeling = document.getElementById('feelings').value;
    const cityName = document.getElementById('city').value;

    url=baseUrl+defaultCityName+appApiID;

    if (cityName != '') {
        url=baseUrl+cityName+appApiID;
    }

    getWeatherData(url)
    .then(function(data) {

        newData = {
            temperature: data['main'].temp,
            date: newDate,
            userFeel: userFeeling
        }

        postData('/addData', newData);
        // Write updated data to DOM elements
        updateUI();
    })
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
      const newData = await response.json();
      return newData;
    }catch(error) {
        console.log("error", error);
    }
};

//Async GET
const getWeatherData = async (url) => {
    const response = await fetch(url);
    try {
         // Transform into JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        // appropriately handle the error
    }
};

//Update UI
const updateUI = async() => {
    const request = await fetch('/getData');

    try {
        const data = await request.json();

        document.getElementById('temp').innerHTML = Math.round(data.temperature)+ ' degrees';
        document.getElementById('content').innerHTML = data.userFeel;
        document.getElementById('date').innerHTML = data.date;

    } catch(error) {
        console.log('error: ', error)
    }
}