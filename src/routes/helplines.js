var express = require("express");
var router = express.Router();
const axios = require('axios')

const stateData = require('../data/data.json')
// helpline

router.get('/helplines/:state/:district', (req, res)=>{
    const stateNumber = req.params.state
    const districtNumber = req.params.district
    const stateName = stateData.states[stateNumber].state
    const districtName = stateData.states[stateNumber].districts[districtNumber]
    var finalData = {}
    axios.get('https://life-api.coronasafe.network/data/helpline_v2.json')
    .then((responses) => {
        helplineDatas = responses.data.data
        var count = 0
        helplineDatas.forEach(helplineData => {
            if(helplineData['state'] == stateName && helplineData['district'] == districtName && helplineData['is_duplicate'] == false && helplineData['deleted'] == false && count < 4){

                 finalData['phone'+count] = helplineData['phone_1']

                 finalData['title'+count] = helplineData['title']
                 
                 finalData['description'+count] = helplineData['description']
                 
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








module.exports = router;