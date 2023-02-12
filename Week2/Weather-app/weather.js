
//const {Navigator} = require("node-navigator");
//const navigator = new Navigator();
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// function getLocation(callback) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         callback(position);
//     });
// }

// function getWeather(coords, callback) {
//     const apiKey = "e6c207da88037cc9b4b0871adf24b6d1";
//     const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
//     const req = new XMLHttpRequest();
//     req.open('GET', url);
//     req.onload = function () {
//         if (req.status === 200) {
//             callback(JSON.parse(req.responseText));
//         } else {
//             callback(new Error(req.statusText));
//         }
//     };
//     req.send();
// }

// getLocation(function (coords) {
//     getWeather(coords, function (weather) {
//         console.log(weather);
//     });
// });


// ------------------------------       PROMISE        ----------------------------------
// function getLocation() {
//     return new Promise(function (resolve, reject) {
//         try {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 resolve(position);
//             });
//         } catch (e) {
//             reject(new Error(e));
//         }
//     });
// }


// function getWeather(coords) {
//     return new Promise(function (resolve, reject)  {
//         try {
//             const apiKey = "e6c207da88037cc9b4b0871adf24b6d1";
//             const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
//             const req = new XMLHttpRequest();
//             req.open('GET', url);
//             req.onload = function () {
//                 resolve(JSON.parse(req.responseText));
//             }
//             req.send();
//         } catch (e) {
//             reject(new Error(e));
//         }
//     })
// }

// getLocation()
//     .then(coords => getWeather(coords))
//     .then(weather => console.log(weather))
//     .catch(err => console.log(err))


//--------------------------      ASYNC AWAIT       ---------------------------------

// const rp = require('request-promise');
//
// async function getWeather(coords) {
//     const apiKey = "e6c207da88037cc9b4b0871adf24b6d1";
//     const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey;
//     try {
//         const response = await rp({ uri: url, json: true });
//         return response;
//     } catch (error) {
//         throw new Error(error);
//     }
// }


function getLocation() {
    return new Promise( (resolve, reject) => {
        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve(position.coords);
            });
        } catch (e) {
            reject(new Error(e));
        }
    });
}

function getWeather(coords) {
    return new Promise((resolve, reject) => {
        try {
            const apiKey = "e6c207da88037cc9b4b0871adf24b6d1";
            const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey;
            const req = new XMLHttpRequest();
            req.open("GET", url);
            req.onload = function () {
                resolve(JSON.parse(req.response));
            };
            req.send();
        } catch (e) {
            reject(new Error(e));
        }
    });
}

(async () => {
    try {
        const coords = await getLocation();
        const weather = await getWeather(coords);
        document.getElementById('weather').innerHTML = weather.main.temp;
        document.getElementById('weather').innerHTML = weather.main.temp + ' ' + weather.weather[0].description;
    } catch (e) {
        console.log(e);
    }
})()