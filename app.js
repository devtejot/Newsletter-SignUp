const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){

    const Fname = req.body.fname;
    const Lname = req.body.lname;
    const Mail = req.body.mail;

    const data = {
        members: [
            {
                email_address: Mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/2deb1de3f4";
    const options = {
        method: "POST",
        auth: "devtejot:4a4d22c4ea1c0c50e2521d920996c635-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running!!");
})



// API key
// 4a4d22c4ea1c0c50e2521d920996c635-us21

// Unique Key
// 2deb1de3f4