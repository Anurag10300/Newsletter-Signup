const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(express.static("public"));


app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index1.html");
});



app.post('/', function (request, resp) {
    const firstName = request.body.fName;
    const lName = request.body.lName;
    const email = request.body.eMail;
    const url = "https://us1.api.mailchimp.com/3.0/lists/ee6f27e5f9"

    const options = {
        method: "POST",
        auth: "Anurag:fcea4191b8330855299d6893e496b0a3-us1"

    }

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lName
            }
        }]
    }

    const jsonData = JSON.stringify(data);

    const reques = https.request(url, options, function (response) {


        if (response.statusCode === 200) {
            resp.sendFile(__dirname + "/success.html");
        } else {
            resp.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));

        });
    });

    reques.write(jsonData);
    reques.end();

});

app.post("/failure", function (req, res) {
    return res.redirect("/");
});

app.post("/success", function (req, res) {
    return res.redirect("/");
});

app.listen( process.env.PORT || 3000, function () {
    console.log("Server active at 3000");
});

//apikey===fcea4191b8330855299d6893e496b0a3-us1