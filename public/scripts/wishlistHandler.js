function createWishlist(mainEl, username){
  //TO DO
}



$(document).ready(function() {

  main = $("#mainDynamic")
  body = $('body')
  main.on('click', ".userWishlist.clickable", function(){
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
          main.html("\
          <h1>You are not authorized</h1>\
          <p class='text-justify pt-3'>Given a specific wishlist, only its owner and Santa's\
          elves are allowed access.</p>")
        }
      },
      success : function(response){console.log(response)}
    })
  });

  body.on('click', ".clickable.ownWishlist", function(){
    var currToken = localStorage.getItem('Authorization')
    var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);
    var currentUser = decodedCurrToken.username
    $.ajax({
      url: "/wishlists/" + currentUser,
      contentType: 'application/json',
      headers: {
        Authorization: currToken
      },
      statusCode : {
        403: function(response){
          console.log(response.responseJSON.message)
          main.prepend("\
          <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
          It seems you are not signed in!\
          <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
          <span aria-hidden='true'>&times;</span>\
          </button>\
          </div>\
          ")
        },
        400: function(response){
          createWishlist(main, currentUser)
        },
        200: function(response){
          console.log(response.message)
        }
      }
    })

  })

});
