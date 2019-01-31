$(document).ready(function() {
  var main = $("#mainDynamic");
  var navBar = $("#siteNav");
  $('.logo.clickable').on('click', function() {
    var loginStatus = JSON.parse(localStorage.getItem('loggedIn'));
    if (loginStatus) {
      var currToken = localStorage.getItem('Authorization')
      var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);
      var adminStatus = decodedCurrToken.access_token

      if (adminStatus){
        main.html("\
          <div class='row'>\
            <div class='col labeled-button text-center'>\
              <i class='fas fa-edit clickable naughtyPost icon-button'></i>\
              <p>Add To Naughty List</p>\
            </div>\
            <div class='col labeled-button text-center'>\
              <i class='fas fa-users clickable userList icon-button'></i>\
              <p>Users</p>\
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
        ");
        navBar.html("\
        <div class='nav-item nav-link clickable naughtyList'>Naughty List</div>\
        <div class='nav-item nav-link clickable naughtyPost'>Add to Naughty List</div>\
        <div class='nav-item nav-link clickable userList'>Users</div>\
        ");
      } else {
        main.html("\
          <div class='row'>\
            <div class='col labeled-button text-center'>\
              <i class='fas fa-scroll clickable naughtyList icon-button'></i>\
              <p>The Naughty List</p>\
            </div>\
            <div class='col labeled-button text-center'>\
              <i class='far fa-list-alt clickable ownWishlist icon-button'></i>\
              <p>My Wishlist</p>\
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
        ");
        navBar.html("\
        <div class='nav-item nav-link clickable naughtyList'>Naughty List</div>\
        <div class='nav-item nav-link clickable ownWishlist'>My Wishlist</div>\
        ");
      }
    } else {
      main.html("\
        <div class='row'>\
          <div class='col labeled-button text-center'>\
            <i class='fas fa-scroll clickable naughtyList icon-button'></i>\
            <p>The Naughty List</p>\
          </div>\
        </div>\
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
    ");
    navBar.html("\
    <div class='nav-item nav-link clickable naughtyList'>Naughty List</div>\
    ");
    }
  });
});
