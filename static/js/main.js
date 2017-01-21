$(document).ready(function(){


   $(".featuredlink").click(function (){
       $('html, body').animate({
           scrollTop: $("#featured-brand").offset().top - 50
       }, 1000);
   });

   $(".faqlink").click(function (){
       $('html, body').animate({
           scrollTop: $("#faqs").offset().top - 50
       }, 1000);
   });

   $(window).scroll(function(){

    var position = $(window).scrollTop();
    var opacity =  position / 500;
    console.log(1- opacity);
    if (opacity > .4){
        $(".hero__overlay").css("opacity", position / 500);
        $(".headline").css("opacity", 1 - opacity);

    } else {
      $(".hero__overlay").css("opacity", 0.4);
      $(".headline").css("opacity", 1 - opacity);
    }




   })



  if ( $("body").hasClass("checkout") ) {

    $("#mdlDismiss").click(function() {

      var menu = document.getElementById("mdlDismiss");
      var form = document.getElementById("order-form");
      var overlay = document.getElementById("overlay");

      if ( $(this).attr("data-open") === "no" ) {
        $(".modal-options").css("opacity",1);
        form.className += " order__form--hidden";
        overlay.style.opacity = "0.8";
        menu.className += " dismiss-modal__btn--open";
        overlay.className += " checkout-overlay--open";
        menu.innerHTML = "Leave checkout?";
       $(this).attr("data-open","yes");
      } else {
        $(".modal-options").css("opacity",0);
        menu.className = "dismiss-modal__btn";
        menu.innerHTML = "&#10005;";
        overlay.style.opacity = "0";
        form.className += "order__form";
        overlay.className = "checkout-overlay";
        $(this).attr("data-open","no");
      }

    })

    $(".modal-options__exit").click(function(){
      window.location.href= "/"
    })

    $(".modal-options__cancel").click(function(){

      var menu = document.getElementById("mdlDismiss");
      var form = document.getElementById("order-form");
      var overlay = document.getElementById("overlay");

      $(".modal-options").css("opacity",0);
      menu.className = "dismiss-modal__btn";
      menu.innerHTML = "&#10005;";
      overlay.style.opacity = "0";
      form.className += "order__form";
      overlay.className = "checkout-overlay";
      $("#mdlDismiss").attr("data-open","no");
    })

    $(".next-step__btn").click(function(e){
      e.preventDefault()
      var step = $(this).attr("data-step");
      switch (step) {
        case "1":

          var wheelSize = document.getElementById('txtWheelSize');

          if ( validate(wheelSize) ){
            localStorage.setItem('bbox_size', wheelSize.value);
            window.location.href = "/checkout/shipping";
          }

          break;
        case "2":

        var hasError = false;

        var recipient = document.getElementById('txtRecipient');
        var email = document.getElementById('txtEmail');
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

        if ( validate(email) ){
          localStorage.setItem('bbox_email', email.value);
        } else {
          hasError = true;
        }

        if ( validate(address1) ){
          localStorage.setItem('bbox_address1', address1.value);
        } else {
          hasError = true;
        }

        localStorage.setItem('bbox_address2', address2.value);

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


        var amount = (parseFloat($("#total").attr("data-amount")).toFixed(2) * 100)
        console.log(amount)

        handler.open({
          name: 'Boardbox Marketplace',
          description: 'Wub Wheels - LOST CITY 100A Wheels',
          amount: amount
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

    if ( localStorage.getItem('bbox_size') ){
      document.getElementById('txtWheelSize').value = localStorage.getItem('bbox_size');
    }

  }


  if ( $("body").hasClass("js_checkout-shipping") ){

    if ( localStorage.getItem('bbox_recipient') ){
    document.getElementById('txtRecipient').value = localStorage.getItem('bbox_recipient');
    }
    if ( localStorage.getItem('bbox_email') ){
    document.getElementById('txtEmail').value = localStorage.getItem('bbox_email');
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

      document.getElementById('item-option').innerHTML = localStorage.getItem('bbox_size');
      document.getElementById('recipient').innerHTML = localStorage.getItem('bbox_recipient');
      document.getElementById('email').innerHTML = localStorage.getItem('bbox_email');
      document.getElementById('address1').innerHTML = localStorage.getItem('bbox_address1');

      if ( localStorage.getItem('bbox_address2') ){
        document.getElementById('address2').innerHTML = localStorage.getItem('bbox_address2');
      }

      var citystatezip = localStorage.getItem("bbox_city") + ", " + localStorage.getItem('bbox_state') + " " + localStorage.getItem('bbox_zip');
      document.getElementById('citystatezip').innerHTML = citystatezip;

      document.getElementById('country').innerHTML = localStorage.getItem('bbox_country');

      var shippingCost = parseFloat(4.00)
      var productCost = parseFloat(16.00)
      var totalCost = productCost + shippingCost

      $("#subtotal").text("$" + productCost.toFixed(2)).attr("data-amount", productCost.toFixed(2));
      $("#shipping").text("$" + shippingCost.toFixed(2)).attr("data-amount", shippingCost.toFixed(2));
      $("#total").text("$" + totalCost.toFixed(2)).attr("data-amount", totalCost.toFixed(2));

      var handler = StripeCheckout.configure({
        key: 'pk_test_pcCWFh9dcmaHCn4ThYvXV2UX',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: function(token) {
          console.log(token)
          $.post( "/checkout", {
            token: token.id,
            amount: (totalCost * 100),
            product: 'Wub Wheels - Label Watch Beanie',
            product_variation: localStorage.getItem('bbox_size-needed'),
            sub_total: "$" + productCost.toFixed(2),
            shipping: "$" + shippingCost.toFixed(2),
            total: "$" + totalCost.toFixed(2),
            recipient_name:  localStorage.getItem('bbox_recipient'),
            recipient_email: localStorage.getItem('bbox_email'),
            address_line1: localStorage.getItem('bbox_address1'),
            address_line2: localStorage.getItem('bbox_address2'),
            city_state_zip: localStorage.getItem('bbox_city') + ", " + localStorage.getItem('bbox_state') + " " + localStorage.getItem('bbox_zip'),
            country: localStorage.getItem('bbox_country')
           })
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



      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
        handler.close();
      });


  }






}) // end doc ready
