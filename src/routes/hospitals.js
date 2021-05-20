var express = require("express");
var router = express.Router();
const axios = require('axios')

const stateData = require('../data/data.json')
// hospital

router.get('/hospitals/:state/:district', (req, res)=>{
    const stateNumber = req.params.state
    const districtNumber = req.params.district
    const stateName = stateData.states[stateNumber].state
    const districtName = stateData.states[stateNumber].districts[districtNumber]
    axios.get('https://life-api.coronasafe.network/data/hospital_v2.json')
    .then((responses) => {
        hospitalDatas = responses.data.data
        var count = 0
        var finalData = {}
        hospitalDatas.forEach(hospitalData => {
            if(hospitalData['state'] == stateName && hospitalData['district'] == districtName && hospitalData['is_duplicate'] == false && hospitalData['deleted'] == false && count < 4){
                finalData['phone'+count] = hospitalData['phone_1']
                finalData['title'+count] = hospitalData['title']
                finalData['description'+count] = hospitalData['description']
                //finalData.push({phone, title, description})
                count ++
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