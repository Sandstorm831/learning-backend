
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.get('/files', (req, res) => {

    function readdirCallback(err, files) {
        if (err) {
            res.status(500).json({
                msg: err.message
            });
        }
        else if (files == undefined) {
            res.status(500).json({
                msg: "Folder not found"
            });
        }
        else {
            let fileNames = []
            for (let i = 0; i < files.length; i++) {
                fileNames.push({
                    name: files[i]
                })
            }
            res.send(fileNames);
        }
    }
    fs.readdir('./files', readdirCallback)

})

app.get('/files/:filename', (req, res) => {

    fs.readdir('./files', (err, files) => {
        if (err) {
            res.status(500).json({
                msg: err.message
            });
        }
        else if (files == undefined) {
            res.status(500).json({
                msg: "Folder not found"
            });
        }
        else {
            let isFound = false;
            for(let i=0; i<files.length; i++){
                if (req.params.filename == files[i]){
                    isFound = true;
                    fs.readFile(`./files/${req.params.filename}`,{encoding: "utf-8"}, (err, data)=>{
                        res.send(data)
                    });
                    break;
                }
            }
            if (!isFound){
                res.status(404).json({
                    msg: "File not found"
                })
            }
        }
    })

    /* This appproach is more cleaner, by harkirat. Mine approach is having an iteration loop, it surpasses that also.

    const filePath = path.join(__dirname,'./files/', req.params.filename);
    fs.readFile(filePath, {encoding: "utf-8"},(err, data) => {
        if(err){
            res.status(404).json({
                msg: "File not found"
            })
        }
        res.send(data)
    })
    
    */


})

app.all("*", (req, res) => {
    res.status(404).json({
        msg: "Route not found"
    })
})

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})

module.exports = app;