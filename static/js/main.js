$(document).ready(function(){


  if ( $("body").hasClass("checkout") ) {

    $("#mdlDismiss").click(function() {

      var menu = document.getElementById("mdlDismiss");
      var form = document.getElementById("order-form");
      var overlay = document.getElementById("overlay");

      if ( $(this).attr("data-open") === "no" ) {
        form.className += " order__form--hidden";
        overlay.style.opacity = "0.8";
        menu.className += " dismiss-modal__btn--open";
        overlay.className += " checkout-overlay--open";
        menu.innerHTML = "Leave checkout?";
       $(this).attr("data-open","yes");
      } else {
        menu.className = "dismiss-modal__btn";
        menu.innerHTML = "&#10005;";
        overlay.style.opacity = "0";
        form.className += "order__form";
        overlay.className = "checkout-overlay";
        $(this).attr("data-open","no");
      }

    })


    $(".next-step__btn").click(function(e){
      e.preventDefault()
      var step = $(this).attr("data-step");
      switch (step) {
        case "1":

          var size = document.getElementById('txtSizeNeeded');

          if ( validate(size) ){
            localStorage.setItem('bbox_size-needed', size.value);
            window.location.href = "/checkout/shipping";
          }

          break;
        case "2":

        var hasError = false;

        var recipient = document.getElementById('txtRecipient');
        var address1 = document.getElementById('txtAddress1');
        var address2 = document.getElementById('txtAddress2');
        var city = document.getElementById('txtCity');
        var state = document.getElementById('txtStateProvince');
        var zip = document.getElementById('txtZipPostal');
        var country = document.getElementById('txtCountry');

        if ( validate(recipient) ){
          localStorage.setItem('bbox_recipient', recipient.value);
        } else {
          hasError = true;
        }

        if ( validate(address1) ){
          localStorage.setItem('bbox_address1', address1.value);
        } else {
          hasError = true;
        }

        if ( validate(city) ){
          localStorage.setItem('bbox_city', city.value);
        } else {
          hasError = true;
        }

        if ( validate(state) ){
          localStorage.setItem('bbox_state', state.value);
        } else {
          hasError = true;
        }

        if ( validate(zip) ){
          localStorage.setItem('bbox_zip', zip.value);
        } else {
          hasError = true;
        }

        if ( validate(country) ){
          localStorage.setItem('bbox_country', country.value);
        } else {
          hasError = true;
        }

        if (!hasError){
          window.location.href = "/checkout/payment";
        }

          break;
        case "3":

        handler.open({
          name: 'Boardbox Marketplace',
          description: 'Voltfuse Grey Nordic Beanie',
          amount: 2250
        });


          break;
        default:
      }
    })

  function validate(input){
    if (input.value === "") {
      input.className += " input-error";
      return false;
    } else {
      input.className = " ";
      return true;
    }
  }

  }

  if ( $("body").hasClass("js_checkout-option") ){

    if ( localStorage.getItem('bbox_size-needed') ){
      document.getElementById('txtSizeNeeded').value = localStorage.getItem('bbox_size-needed');
    }

  }


  if ( $("body").hasClass("js_checkout-shipping") ){

    if ( localStorage.getItem('bbox_recipient') ){
    document.getElementById('txtRecipient').value = localStorage.getItem('bbox_recipient');
    }
    if ( localStorage.getItem('bbox_address1') ){
      document.getElementById('txtAddress1').value = localStorage.getItem('bbox_address1');
    }
    if ( localStorage.getItem('bbox_address2') ){
      document.getElementById('txtAddress2').value = localStorage.getItem('bbox_address2');
    }
    if ( localStorage.getItem('bbox_city') ){
      document.getElementById('txtCity').value = localStorage.getItem('bbox_city');
    }
    if ( localStorage.getItem('bbox_state') ){
      document.getElementById('txtStateProvince').value = localStorage.getItem('bbox_state');
    }
    if ( localStorage.getItem('bbox_zip') ){
      document.getElementById('txtZipPostal').value = localStorage.getItem('bbox_zip');
    }
    if ( localStorage.getItem('bbox_country') ){
      document.getElementById('txtCountry').value = localStorage.getItem('bbox_country');
    }

  }

  if ( $("body").hasClass("js_checkout-payment") ){

      document.getElementById('item-option').innerHTML = localStorage.getItem('bbox_size-needed');
      document.getElementById('recipient').innerHTML = localStorage.getItem('bbox_recipient');
      document.getElementById('address1').innerHTML = localStorage.getItem('bbox_address1');

      if ( localStorage.getItem('bbox_address2') ){
        document.getElementById('address2').innerHTML = localStorage.getItem('bbox_address2');
      }

      var citystatezip = localStorage.getItem("bbox_city") + ", " + localStorage.getItem('bbox_state') + " " + localStorage.getItem('bbox_zip');
      document.getElementById('citystatezip').innerHTML = citystatezip;

      document.getElementById('country').innerHTML = localStorage.getItem('bbox_country');

      var handler = StripeCheckout.configure({
        key: 'pk_test_pcCWFh9dcmaHCn4ThYvXV2UX',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: function(token) {
          console.log(token)
          $.post( "/checkout", { token: token.id, amount: 2250, description: 'Voltfuse Grey Nordic Beanie' })
          .done(function( data ) {
            console.log(data);

            if ( data !== "card failed" ) {
              window.location.href = "/checkout/success";
            } else {
              alert("card failed");
            }

          });
        }
      });

      // document.getElementById('customButton').addEventListener('click', function(e) {
      //   // Open Checkout with further options:
      //   handler.open({
      //     name: 'Boardbox Marketplace',
      //     description: 'Voltfuse Grey Nordic Beanie',
      //     amount: 2250
      //   });
      //   e.preventDefault();
      // });

      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });


  }






}) // end doc ready
