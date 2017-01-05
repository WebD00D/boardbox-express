var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static/css",express.static(__dirname + "/static/css"));
app.use("/static/scss",express.static(__dirname + "/static/scss"));
app.use("/static/img",express.static(__dirname + "/static/img"));
app.use("/static/js",express.static(__dirname + "/static/js"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/checkout/options', function (req, res) {
  res.sendFile(__dirname + '/checkout-options.html');
})

app.get('/checkout/shipping', function (req, res) {
  res.sendFile(__dirname + '/checkout-shipping.html');
})

app.get('/checkout/payment', function (req, res) {
  res.sendFile(__dirname + '/checkout-payment.html');
})

app.get('/checkout/success', function (req, res) {
  res.sendFile(__dirname + '/checkout-success.html');
})

app.listen(process.env.PORT || 8080, function () {
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
