const express = require("express");
const app = express()
app.use(express.json());
const port = 3000

var users = [
{
    name: "John",
    kidneys: [
        {
            healthy: false
        },
        {
            healthy: true
        }
    ]
}]

app.get('/', (req, res) => {
    const johnKidneys = users[0].kidneys;
    const totalKidneys = johnKidneys.length;
    let healthyKidneys = 0;
    johnKidneys.filter((kidney) =>  {
        if (kidney.healthy === true) healthyKidneys+=1
    });
    let unhealthyKidneys = totalKidneys-healthyKidneys;
    res.json({
        "Total Kidneys": totalKidneys,
        "Healthy Kidneys": healthyKidneys,
        "Unhealthy Kidneys": unhealthyKidneys,
    })

})

app.post('/', (req, res) => {
    const health = req.body.health;
    users[0].kidneys.push({healthy: health});
    res.json({
        msg: "Done"
    })
})

app.delete('/', (req, res) => {
    const unhealthyKidneys = numberOfUnhealthyKidneys();
    if (unhealthyKidneys == 0){
        res.status(411).json({
            msg: "All kidneys are healthy, nothing to delete"
        })
    }
    else{
        newKidneys = []
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "done"
        })
    }
})

app.put('/', (req, res) => {
    const unhealthyKidneys = numberOfUnhealthyKidneys();
    if (unhealthyKidneys == 0){
        res.status(411).json({
            msg: "All kidneys are healthy, nothing to replace"
        });
    }
    else{
        for(let i =0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true
        }
        res.json({})
    }
})


function numberOfUnhealthyKidneys(){
    let num = 0;
    users[0].kidneys.filter(kidney => {
        if(!kidney.healthy){
            num+=1
        }
    })
    return num;
}

app.listen(port, () => {
    console.log(`The HTTP server is running on ${port}`)
})

