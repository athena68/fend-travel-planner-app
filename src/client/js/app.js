/* Global Variables */

// For Geonames
const geoNameApiKey = 'tuan86';
const defaultCityName = 'hanoi';
const geoBaseUrl='http://api.geonames.org/searchJSON?q=';
const geoAppApiId=`&maxRows=10&username=${geoNameApiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function performAction(e) {
    const userFeeling = document.getElementById('feelings').value;
    const cityName = document.getElementById('city').value;

    let url=geoBaseUrl+defaultCityName+geoAppApiId;

    if (cityName != '') {
        url=geoBaseUrl+cityName+geoAppApiId;
    }

    getGeoData(url)
    .then(function(data) {

        let newData = {
            name: data.geonames[0].name,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng,
            country: data.geonames[0].countryName
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
const getGeoData = async (url) => {
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

        document.getElementById('temp').innerHTML = "city: " + data.name + " [lat, long] = [ " + data.latitude + ", " + data.longitude + " ] country: " + data.country;
        // document.getElementById('content').innerHTML = data.userFeel;
        // document.getElementById('date').innerHTML = data.date;

    } catch(error) {
        console.log('error: ', error)
    }
}

export {
    performAction,
    postData,
    getGeoData,
    updateUI
}