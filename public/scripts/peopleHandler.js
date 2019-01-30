$(document).ready(function() {
  $(".naughtyList").on('click', function() {

    $.ajax({
      url: '/people',
      contentType: 'application/json',
      success: function(response) {
        var main = $("#mainDynamic");
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

        var people = response;
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
  $("#mainDynamic").on('click', '.people.model.clickable', function(){
    var usernameClicked = $(this).text();
    console.log(usernameClicked)
    $.ajax({
      url: 'people/'+usernameClicked,
      contentType: 'application/json',
      success: function(response) {
        var main = $("#mainDynamic");
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
