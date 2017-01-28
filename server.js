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

    var stripe = require("stripe")('sk_test_n6YN203dTkI4VQQOaCAxIqMX');
    var token = request.body.token;
    var amount = request.body.amount

    var product = request.body.product;
    var product_variation = request.body.product_variation;

    var sub_total = request.body.sub_total;
    var shipping = request.body.shipping;
    var total = request.body.total;

    var recipient_name = request.body.recipient_name;
    var recipient_email = request.body.recipient_email;

    var address_line1 = request.body.address_line1;
    var address_line2 = request.body.address_line2;
    var city_state_zip = request.body.city_state_zip;
    var country = request.body.country;

    var charge = stripe.charges.create({
      amount: amount, // Amount in cents
      currency: "usd",
      source: token,
      description: product
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        res.end("card failed");
      } else {

      var postmark = require("postmark");
      var client = new postmark.Client("ddd14bfd-7b39-476b-92d1-44281ae614ed");

      // Make this email just send to Boardbox Admin so we know that an order went through..
      client.sendEmail({
          "From": "hello@getboardbox.com",
          "To": "hello@getboardbox.com",
          "Subject": "A New Order on Boardbox Marketplace!",
          "TextBody": "Hello from Postmark!" // Add basic details here.
      });

      // Send to Brand
      client.sendEmailWithTemplate({
          "From": "hello@getboardbox.com",
          "TemplateId": 1213482,
            "To": "rva.christian91@gmail.com", // TODO: Replace with current brand email address
            "TemplateModel": {
            "brand": "Emprical Skate Co",
            "product_name_and_variation": product + " " + product_variation,
            "recipient_name": recipient_name,
            "recipient_email": recipient_email,
            "address_line_1": address_line1,
            "address_line_2": address_line2,
            "city_state_zip": city_state_zip,
            "country": country,
            "amount": sub_total,
            "shipping": shipping,
            "total": total
          }
        });

        // TODO: Send Receipt to User
        // Send to Brand
        client.sendEmailWithTemplate({
            "From": "hello@getboardbox.com",
            "TemplateId": 1264622,
              "To": recipient_email, // TODO: Replace with current brand email address
              "TemplateModel": {
              "brand": "Emprical Skate Co",
              "product_name_and_variation": product + " " + product_variation,
              "recipient_name": recipient_name,
              "recipient_email": recipient_email,
              "address_line_1": address_line1,
              "address_line_2": address_line2,
              "city_state_zip": city_state_zip,
              "country": country,
              "amount": sub_total,
              "shipping": shipping,
              "total": total
            }
          });

      res.end("successful");

    }

  });

});
