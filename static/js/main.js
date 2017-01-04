$(document).ready(function(){

  var handler = StripeCheckout.configure({
    key: 'pk_test_pcCWFh9dcmaHCn4ThYvXV2UX',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      console.log(token)
      $.post( "/checkout", { token: token.id, amount: 2250, description: 'Voltfuse Grey Nordic Beanie' })
      .done(function( data ) {
        console.log(data);
      });
    }
  });

  document.getElementById('customButton').addEventListener('click', function(e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Boardbox Marketplace',
      description: 'Voltfuse Grey Nordic Beanie',
      amount: 2250
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });

})
