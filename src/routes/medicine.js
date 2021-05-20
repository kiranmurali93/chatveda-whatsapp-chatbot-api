var express = require("express");
var router = express.Router();
const axios = require('axios')

const stateData = require('../data/data.json')
// medicine

router.get('/medicines/:state/:district', (req, res)=>{
    const stateNumber = req.params.state
    const districtNumber = req.params.district
    const stateName = stateData.states[stateNumber].state
    const districtName = stateData.states[stateNumber].districts[districtNumber]
    axios.get('https://life-api.coronasafe.network/data/medicine_v2.json')
    .then((responses) => {
        medicineDatas = responses.data.data
        var count = 0
        var finalData = []
        medicineDatas.forEach(medicineData => {
            if(medicineData['state'] == stateName && medicineData['district'] == districtName && medicineData['is_duplicate'] == false && medicineData['deleted'] == false && count < 4){
                var phone = medicineData['phone_1']
                var title = medicineData['title']
                var description = medicineData['description']
                var address = medicineData['address']
                finalData.push({phone, title, description, address})
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