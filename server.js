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


      // var helper = require('sendgrid').mail;
      //
      // var mail = new helper.Mail()
      // var email = new helper.Email("hello@getboardbox.com", "Boardbox Marketplace")
      // mail.setFrom(email)
      // mail.setSubject("New Boardbox Marketplace Order!")
      //
      // personalization = new helper.Personalization()
      // var sendTo = new helper.Email("rva.christian91@gmail.com");
      // personalization.addTo(sendTo);
      //
      // var sub_product = new helper.Substitution('%product%', product);
      // personalization.addSubstitution(sub_product);
      //
      // var sub_product_variation = new helper.Substitution('%product_variation%', product_variation );
      // personalization.addSubstitution(sub_product_variation);
      //
      // var sub_sub_total = new helper.Substitution('%sub_total%', sub_total);
      // personalization.addSubstitution(sub_sub_total);
      //
      // var sub_shipping = new helper.Substitution('%shipping%', shipping);
      // personalization.addSubstitution(sub_shipping);
      //
      // var sub_ttotal = new helper.Substitution('%total%', total);
      // personalization.addSubstitution(sub_ttotal);
      //
      // var sub_recipient = new helper.Substitution('%recipient_name%', recipient_name);
      // personalization.addSubstitution(sub_recipient);
      //
      // var sub_recipient_email = new helper.Substitution('%recipient_email%', recipient_email);
      // personalization.addSubstitution(sub_recipient_email);
      //
      // var sub_address1 = new helper.Substitution('%address_line1%', address_line1);
      // personalization.addSubstitution(sub_address1);
      //
      // var sub_address2 = new helper.Substitution('%address_line2%', address_line2);
      // personalization.addSubstitution(sub_address2);
      //
      // var sub_city = new helper.Substitution('%city_state_zip%', city_state_zip);
      // personalization.addSubstitution(sub_city);
      //
      // var sub_country = new helper.Substitution('%country%', country);
      // personalization.addSubstitution(sub_country);
      //
      // mail.addPersonalization(personalization)
      //
      // mail.setTemplateId("939a67d0-c9d8-4a91-83b9-8edf84a35ef1")
      //
      //
      // var sg = require('sendgrid')('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')
      //
      // var requestBody = mail.toJSON()
      // var emptyRequest = require('sendgrid-rest').request
      // var requestPost = JSON.parse(JSON.stringify(emptyRequest))
      // requestPost.method = 'POST'
      // requestPost.path = '/v3/mail/send'
      // requestPost.body = requestBody
      // sg.API(requestPost, function (error, response) {
      //   console.log(response.statusCode)
      //   console.log(response.body)
      //   console.log(response.headers)
      // })

      var postmark = require("postmark");
      var client = new postmark.Client("ddd14bfd-7b39-476b-92d1-44281ae614ed");

      client.sendEmail({
          "From": "hello@getboardbox.com",
          "To": "rva.christian91@gmail.com",
          "Subject": "Test",
          "TextBody": "Hello from Postmark!"
      });

      // Send to Brand
      client.sendEmailWithTemplate({
          "From": "hello@getboardbox.com",
          "TemplateId": 1111,
            "To": "rva.christian91@gmail.com", // TODO: Replace with current brand email address
            "TemplateModel": {
              "Property1" : 1,
              "Property2" : "hello"
            }
          });

        // TODO: Send Receipt to User

      res.end("successful");

    }

  });

});
