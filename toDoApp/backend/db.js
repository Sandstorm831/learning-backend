const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://<id>:<db_password>@cluster0.fmkey.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0");

const ToDoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = {
    ToDo
};
