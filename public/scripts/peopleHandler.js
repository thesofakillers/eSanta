function renderNaughtyPost(mainEl) {
  mainEl.html("\
  <h3>Add someone to Santa's Naughty List<h3>\
  <form id='personSubmit'>\
    <div class='form-group pt-3'>\
      <input type='text' class='form-control' id='Username' placeholder='username' required>\
    </div>\
    <div class='form-group pt-3'>\
        <input type='text' class='form-control' id='Forename' placeholder='Forename' required>\
    </div>\
    <div class='form-group pt-3'>\
        <input type='text' class='form-control' id='Surname' placeholder='Surname' required>\
    </div>\
    <button class='btn btn-secondary type='submit'>Add to Naughty List!</button>\
  </form>\
  ");
  mainEl.on('submit', '#personSubmit', function() {
    // prevent page reload
    event.preventDefault();
    // parse entered data
    var usernameSubmitted = $('#Username').val()
    var forenameSubmitted = $('#Forename').val()
    var surnameSubmitted = $('#Surname').val()

    // get JWTtoken
    var currToken = localStorage.getItem('Authorization')
    var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);

    $.ajax({
      url: '/people',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: usernameSubmitted,
        forename: forenameSubmitted,
        surname: surnameSubmitted,
        access_token: decodedCurrToken.access_token
      }),
      statusCode: {
        403: function(response) {
          console.log(response);
          $('.logo.clickable').trigger('click');
          main.prepend("\
                <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
                  You are not authorized.\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
          ");
        },
        400: function(response) {
          console.log(response);
          main.prepend("\
                <div class='alert alert-warning alert-dismissible fade show' role='alert'>\
                  A person with that username is already in the Naughty List\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
          ");
        },
        200: function() {
          $('body').trigger('click', '.naughtyList')
          main.prepend("\
                <div class='alert alert-success alert-dismissible fade show' role='alert'>\
                  Person added to Naughty List\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
          ");
        }
      }
    });
  });
}

$(document).ready(function() {
  // target our main block
  var main = $("#mainDynamic");
  // when the naughtyList button or link is clicked
  $('body').on('click', '.naughtyList', function() {
    // send an ajax request to server, asking for /people
    $.ajax({
      url: '/people', // route being asked
      contentType: 'application/json',
      success: function(response) {
        // reset html to custom table (empty)
        main.html("\
        <div class = 'table-responsive'>\
          <table class='table table-sm table-dark table-striped table-hover'>\
          <caption class='text-white lead'>Santa's Naughty List</caption>\
            <thead>\
              <tr>\
                <th width='34%' scope='col'>Username</th>\
                <th width='33%' scope='col'>Forename</th>\
                <th width='33%' scope='col'>Surname</th>\
              </tr>\
            </thead>\
          </table>\
        </div>\
        <div class = 'table-responsive' id='tableScroll'>\
          <table class='table table-sm table-dark table-striped table-hover'>\
            <tbody>\
            </tbody>\
          </table>\
        </div>\
      ")

        // assign response to a variable
        var people = response;
        // populate empty table from above with people in /people
        var tableBody = $("#mainDynamic tbody")
        people.forEach(person => {
          tableBody.append("\
          <tr>\
            <td width='34%' class='people model clickable pl-4 pr-0'>" + person.username + "</td>\
            <td width='33%'>" + person.forename + "</td>\
            <td width='33%'>" + person.surname + "</td>\
          </tr>")
        });
      }
    });
  });
  // when a particular username is clicked
  main.on('click', '.people.model.clickable', function() {
    // get what username on the table is clicked
    var usernameClicked = $(this).text();

    // send ajax request to server, asking for /people:username
    $.ajax({
      url: 'people/' + usernameClicked,
      contentType: 'application/json',
      success: function(response) {
        // target our main block
        var main = $("#mainDynamic");
        // set its html content to the person's page
        main.html("\
        <h1> User: <span class = 'people model clickable'>" + response.username + "</span></h1>\
        <h3 class = 'text-justify'>\
        Forename: " + response.forename + " </br>\
        Surname: " + response.surname + "</br>\
        <span class = 'userWishlist wishlists model clickable'> See wishlist </span>\
        </h3 >\
        ")
        //tying username to wishlist
        $(".userWishlist").data('username', response.username)
      }
    });
  });

  // when a naughtPost is clicked
  $('body').on('click', '.naughtyPost', function() {
    renderNaughtyPost(main)
  });

});
