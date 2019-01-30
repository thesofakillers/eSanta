$(document).ready(function() {
  var currToken = JSON.parse(localStorage.getItem('Authorization'))

  $("#mainDynamic").on('click', ".userWishlist.clickable", function(){
    var userRequested = $(this).data('username')
    $.ajax({
      url: "/wishlists/" + userRequested,
      contentType: 'application/json',
      headers: {
        Authorization : currToken
      },
      statusCode : {
        403: function(){
          $("#mainDynamic").html('<h1>You are not authorized</h1>')
        }
      },
      success : function(response){console.log("yay")}
    })
  });

  
});