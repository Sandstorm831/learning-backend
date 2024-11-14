const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const jwtPassword = "123456";
const app = express()
app.use(bodyParser.json());
app.use(express.json());

const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "12345",
        name: "Harkirat",
    },
    {
        username: "rohan_g@me.iitr.ac.in",
        password: "sfdf@123",
        name: "Rohan",
    },
    {
        username: "SomeBullShitName",
        password: "dumbPassword",
        name: "Strange",
    }
]

function userExists(uname, passwd){
    const temp = ALL_USERS.filter(element => {
        if(element.username === uname && element.password === passwd) return true
    })
    return temp.length > 0;
}

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "The user doesn't exist in the database",
        })
    }
    var token = jwt.sign({ username }, jwtPassword);
    return res.json({
        token,
    })
})

app.get('/users', (req, res) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        const elseUsers = ALL_USERS.filter(element => element.username !== username)
        res.json(elseUsers)

    } catch(err){
        res.status(403).json({
            msg: "Invalid Token"
        })
    }
})

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})