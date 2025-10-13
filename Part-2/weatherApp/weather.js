//3b939bb77fba431addab28fd6946169b
const date = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const tempImg = document.getElementById("tempImg");
const descrpition = document.getElementById("description");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");


const months =["January", "February", "March", "April", "May", "June",  "July",
        "August", "September", "October", "November", "December"
]

let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getFullYear();

date.innerHTML = `${month} ${day}, ${year}`;

const app = document.getElementById('app');

const getWeather = async() =>{
    try{
        const weatherDataFetch = await fetch('https://api.openweathermap.org/data/2.5/weather?lat={-1.2833}&lon={36.8167}&appid={3b939bb77fba431addab28fd6946169b}', {
            headers: {
                Accept: "application/json"
            }
        });

        const weatherData = await weatherDataFetch.json();
    }
    catch(error)
    {
        console.log(error);
    }
}

getWeather()