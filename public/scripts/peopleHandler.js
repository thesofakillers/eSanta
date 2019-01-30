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
            <td class='clickable'>" + person.username + "</td>\
            <td>" + person.forename + "</td>\
            <td>" + person.surname + "</td>\
          </tr>")
        });
      }
    });
  });
  $("#mainDynamic").on('click', 'td.clickable', function(){
    var usernameClicked = $(this).text();
    $.ajax({
      url: 'people/'+usernameClicked,
      contentType: 'application/json',
      success: function(response) {
        var main = $("#mainDynamic");
        main.html(usernameClicked)
      }
    });
  });
});
