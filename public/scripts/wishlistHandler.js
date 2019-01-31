$(document).ready(function() {
  $("#mainDynamic").on('click', ".userWishlist.clickable", function(){
    var currToken = localStorage.getItem('Authorization')
    var userRequested = $(this).data('username')
    $.ajax({
      url: "/wishlists/" + userRequested,
      contentType: 'application/json',
      headers: {
        Authorization : currToken
      },
      statusCode : {
        403: function(){
          $("#mainDynamic").html("\
          <h1>You are not authorized</h1>\
          <p class='text-justify pt-3'>Given a specific wishlist, only its owner and Santa's\
          elves are allowed access.</p>")
        }
      },
      success : function(response){console.log(response)}
    })
  });


});
