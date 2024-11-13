const express = require("express");
app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://gargrohan138:<db_password>@cluster0.fmkey.mongodb.net/randon_name?retryWrites=true&w=majority&appName=Cluster0");
const User = mongoose.model('User', {name: String, email: String, password: String});
const SuperUser = mongoose.model('SuperUser', {colder: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
}]})
app.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({email: email}).exec();
    if(existingUser){
        const users = await User.find();
        console.log(users);
        return res.status(400).json({
            msg: "User already exists"
        })
    }
    console.log(existingUser)
    const user = new User({
        name: name,
        email: email,
        password: password,
    })
    user.save();
    const idst = user._id;
    return res.json({
        msg: "user created surccessfully",
        newId: idst,
    })
})

app.post('/createsuperuser', async (req, res) => {
    const superuser = new SuperUser({
        colder: [],
    });
    await superuser.save();
    const id = superuser._id;
    res.json({
        message: "Superuser created",
        id: id,
    })
})

app.post('/superuser/:uds', async (req, res) => {
    const query = await User.find();
    const uuid = req.params.uds;
    const superquery = await SuperUser.findById(uuid);
    for(let i=0; i<query.length; i++){
        superquery.colder.push({
            _id: query[i]._id,
        })
    }
    await superquery.save();
    return res.json({
        message: `superuser colder has been initialised with id ${uuid}`
    })
})

app.get('/superuser/:uds', async (req, res) => {
    const uuid = req.params.uds
    const superquery = await SuperUser.findById(uuid).populate('colder');
    res.send(superquery);
})

app.all("*", (req, res) => {
    return res.json({
        msg: "path not found"
    })
})

app.listen(3000, () => {
    console.log("App is running on 3000")
});
