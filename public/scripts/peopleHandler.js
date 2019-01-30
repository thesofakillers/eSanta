$(document).ready(function() {
  // when the naughtyList button or link is clicked
  $(".naughtyList").on('click', function() {
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
          <caption class='text-white'>Santa's Naughty List</caption>\
            <thead>\
              <tr>\
                <th scope='col'>Username</th>\
                <th scope='col'>Forename</th>\
                <th scope='col'>Surname</th>\
              </tr>\
            </thead>\
            <tbody>\
            </tbody>\
          </table>\
        </div>")

        // assign response to a variable
        var people = response;
        // populate empty table from above with people in /people
        people.forEach(person => {
          var tableBody = $("#mainDynamic tbody")
          tableBody.append("\
          <tr>\
            <td class='people model clickable'>" + person.username + "</td>\
            <td>" + person.forename + "</td>\
            <td>" + person.surname + "</td>\
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
        <h1> User: <span class = 'people model clickable'>"+ response.username +"</span></h4>\
        <h3 class = 'text-justify'>\
        Forename: "+ response.forename + " </br>\
        Surname: "+ response.surname + "</br>\
        <span class = 'wishlists model clickable'> See wishlist </span>\
        </h3 >\
        ")
      }
    });
  });
});
