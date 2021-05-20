var express = require("express");
var router = express.Router();
const axios = require('axios')

const stateData = require('../data/data.json')
// ambulance

router.get('/ambulance/:state/:district', (req, res)=>{
    const stateNumber = req.params.state
    const districtNumber = req.params.district
    const stateName = stateData.states[stateNumber].state
    const districtName = stateData.states[stateNumber].districts[districtNumber]
    var finalData = {}
    axios.get('https://life-api.coronasafe.network/data/ambulance_v2.json')
    .then((responses) => {
        ambulanceDatas = responses.data.data
        var count = 0
        ambulanceDatas.forEach(ambulanceData => {
            if(ambulanceData['state'] == stateName && ambulanceData['district'] == districtName && ambulanceData['is_duplicate'] == false && ambulanceData['deleted'] == false && count < 4){
                //var phone = ambulanceData['phone_1']
                finalData['phone'+count] = ambulanceData['phone_1']

                //var title = ambulanceData['title']
                finalData['title'+count] = ambulanceData['title']
                
                //var address = ambulanceData['address']
                finalData['address'+count] = ambulanceData['address']
                
                //finalData.push({phone, title, address})
                count++
                
            }
        });
        if((Object.keys(finalData).length) === 0){
            res.json({error:'value not found'})
        }
        else{
            res.send(finalData)}
    }).catch((err)=>console.log(err))
    
})


// router.get('/fruit/:fruitName/:fruitColor', function(req, res) {
//     var data = {
//         "fruit": {
//             "apple": req.params.fruitName,
//             "color": req.params.fruitColor
//         }
//     }; 

//     res.json(data);
// });





module.exports = router;