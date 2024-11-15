const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://gargrohan138:Sandstorm_753@cluster0.fmkey.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0");

const ToDoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = {
    ToDo
};
