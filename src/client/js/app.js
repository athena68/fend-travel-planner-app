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

    const req_status = await postData("/addNewTrip", {
        city: cityName,
        date: tripStartDate,
    })

    updateUI(req_status);
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
      let status = response.status;
      return status;
    }catch(error) {
        console.log("error", error);
    }
};

//Update UI
const updateUI = async(req_status) => {
    const request = await fetch('/getData');

    try {
        const data = await request.json();

        //reset dashboard
        document.getElementById('tripDashboard').innerHTML = "";
        document.getElementById('temp').innerHTML = "";
        document.getElementById('date').innerHTML = "";

        if (req_status === 200) {
            document.getElementById('tripDashboard').innerHTML = "Trip details";
            document.getElementById('temp').innerHTML = "Your trip to: " + data.name + ", country: " + data.country;
            document.getElementById('date').innerHTML = "Departuring: " + data.date;
            // document.getElementById('content').innerHTML = data.userFeel;
        } else {
            if (req_status === 400) {
                document.getElementById('tripDashboard').innerHTML = "Error: " + data.city + " not found";
            }
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