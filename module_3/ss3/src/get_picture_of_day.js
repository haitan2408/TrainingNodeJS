axios = require('axios');

function getPictureOfDay() {
    return  new Promise((resolve, reject) => {
        axios.get("https://api.nasa.gov/planetary/apod?api_key=mnjBEVmCAPgV3YoicwjjFeOj5waLwhDJONuUaRKq").then(result => {
            resolve(result.data);
        }, error => {
            reject(error)
        })
    })
}
getPictureOfDay().then(data => {
    console.log(data)
}) ;
