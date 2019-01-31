$(document).ready(function() {
  var main = $("#mainDynamic");
  var navBar = $("#siteNav");
  $('.logo.clickable').on('click', function() {
    // determine whether user is currently logged in
    var loginStatus = JSON.parse(localStorage.getItem('loggedIn'));
    // if user is currently logged in
    if (loginStatus) {
      // get their JWT
      var currToken = localStorage.getItem('Authorization')
      // parse it
      var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);
      // determine whether the user is an admin (elf)
      var adminStatus = decodedCurrToken.access_token

      // if the user is an admin
      if (adminStatus){
        // render POST to /people and GET /users options
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
                Alabaster? Is that you? Or is it Sugarplum Mary?\
                ...Anyway, as one of my lovely elves, you have the ability\
                to add people to the Naughty List, browse our registered users \
                and view their wishlists.\
                Thank you so much for your work and Merry Christmas!.\
              </div>\
              <div class='col-1'></div>\
          </div>\
        ");
        navBar.html("\
        <div class='nav-item nav-link clickable naughtyList'>Naughty List</div>\
        <div class='nav-item nav-link clickable naughtyPost'>Add to Naughty List</div>\
        <div class='nav-item nav-link clickable userList'>Users</div>\
        ");
      } else { // if the user is not an admin
        // render POST/PUT /wishlist:user and GET naughtyList buttons
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
                Now who do we have here? Have you been naughty? Nice?\
                Why don't you go and check on my official Naughty List?\
                If you're sure you've been nice though, what are you waiting\
                for!? Go and set up your wishlist! And Merry Christmas!\
              </div>\
              <div class='col-1'></div>\
          </div>\
        ");
        navBar.html("\
        <div class='nav-item nav-link clickable naughtyList'>Naughty List</div>\
        <div class='nav-item nav-link clickable ownWishlist'>My Wishlist</div>\
        ");
      }
    } else { // if the client is not logged in
      // render GET naughty list button
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
