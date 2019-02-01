$(document).ready(function() {
  // when the naughtyList button or link is clicked
  $('body').on('click', '.naughtyList', function() {
    // send an ajax request to server, asking for /people
    $.ajax({
      url: '/people', // route being asked
      contentType: 'application/json',
      success: function(response) {
        var main = $("#mainDynamic"); // target our main block
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
  $("#mainDynamic").on('click', '.people.model.clickable', function(){
    // get what username on the table is clicked
    var usernameClicked = $(this).text();

    // send ajax request to server, asking for /people:username
    $.ajax({
      url: 'people/'+usernameClicked,
      contentType: 'application/json',
      success: function(response) {
        // target our main block
        var main = $("#mainDynamic");
        // set its html content to the person's page
        main.html("\
        <h1> User: <span class = 'people model clickable'>"+ response.username +"</span></h1>\
        <h3 class = 'text-justify'>\
        Forename: "+ response.forename + " </br>\
        Surname: "+ response.surname + "</br>\
        <span class = 'userWishlist wishlists model clickable'> See wishlist </span>\
        </h3 >\
        ")
        //tying username to wishlist
        $(".userWishlist").data('username', response.username)
      }
    });
  });
});
