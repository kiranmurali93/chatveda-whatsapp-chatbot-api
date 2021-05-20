var express = require("express");
var router = express.Router();
const axios = require('axios')

const stateData = require('../data/data.json')
// oxygen

router.get('/oxygen/:state/:district', (req, res)=>{
    const stateNumber = req.params.state
    const districtNumber = req.params.district
    const stateName = stateData.states[stateNumber].state
    const districtName = stateData.states[stateNumber].districts[districtNumber]
    axios.get('https://life-api.coronasafe.network/data/oxygen_v2.json')
    .then((responses) => {
        oxygenDatas = responses.data.data
        var count = 0
        var finalData = []
        oxygenDatas.forEach(oxygenData => {
            if(oxygenData['state'] == stateName && oxygenData['district'] == districtName && oxygenData['is_duplicate'] == false && oxygenData['deleted'] == false && count < 4){
                var phone = oxygenData['phone_1']
                var title = oxygenData['title']
                var description = oxygenData['description']
                finalData.push({phone, title, description})
                count = count + 1
            }
        });
        if((Object.keys(finalData).length) === 0){
            res.json({error:'value not found'})
        }
        else{
            res.send(finalData)}
    }).catch((err)=>console.log(err))
    
})








module.exports = router;