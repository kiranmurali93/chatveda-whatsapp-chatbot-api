var express = require("express");
var app = express();
const axios = require('axios')
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


app.get("/", function(req, res) {
    res.status(200).send("Welcome");
  });

const ambulance = require('./src/routes/ambulance')
const helpline = require('./src/routes/helplines')
const hospital = require('./src/routes/hospitals')
const medicine = require('./src/routes/medicine')
const oxygen = require('./src/routes/oxygen')

app.use(ambulance)
app.use(helpline)
app.use(hospital)
app.use(medicine)
app.use(oxygen)

// app.get('/hospitals', (req, res) =>{
//     // return districts
//     const state = req.body.state
//     let value = ''
//     console.log('hospital')
//     axios.get('https://life-api.coronasafe.network/data/active_district_data.json')
//     .then((responses) => {
//         //console.log(responses.data.length)
//         var datas = responses.data.data
//         count = 0
//         datas.forEach(response => {
//             //console.log(response['state'])
//             if(response['state'] == state && response['hospitals'] == true && count < 4){
//                 console.log(response)
//                 value = value + ' ,' + response['district']
//                 count = count+1
//             }
//         });
//         //console.log(value)
//     res.send({value})
//     }).catch((err) => console.log(err))
// })


//port
var server = app.listen(PORT, function () {
    console.log("Server Running on port.", server.address().port);
});