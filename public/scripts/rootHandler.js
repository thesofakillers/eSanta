$(document).ready(function() {
  $('.logo.clickable').on('click', function(){
    $("#mainDynamic").html("\
      <div class='row'>\
        <div class='col labeled-button text-center naughtyList'>\
          <i class='fas fa-scroll clickable icon-button'></i>\
          <p>The Naughty List</p>\
        </div>\
        <div class='col labeled-button text-center ownWishlist'>\
          <i class='far fa-list-alt clickable icon-button'></i>\
          <p>Your Wishlist</p>\
        </div>\
      </div>\
\
      <div class='row pt-4'>\
          <div class='col-1'></div>\
          <div class='col text-justify lead'>\
            Ho ho ho! It's about time! Santa has finally modernized and hit the web.\
            Register now to create and edit your very own Christmas wishlist so\
            that Santa and his elves can easily have access to it.\
            Be careful though...you may be on the naughty list.\
          </div>\
          <div class='col-1'></div>\
      </div>\
    ")
  })
});
