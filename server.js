var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static",express.static(__dirname + "/static"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(8080, function () {
  console.log('Listening on port 8080!')
})



app.post('/checkout', function (request, res) {

    var stripe = require("stripe")("sk_test_n6YN203dTkI4VQQOaCAxIqMX");
    var token = request.body.token;
    var amount = request.body.amount
    var description = request.body.description

    var charge = stripe.charges.create({
    amount: amount, // Amount in cents
    currency: "usd",
    source: token,
    description: description
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.end("card failed");
    } else {
      res.end("charge was successful");
    }

  });

});
