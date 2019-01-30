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
            <td>" + person.username + "</td>\
            <td>" + person.forename + "</td>\
            <td>" + person.surname + "</td>\
          </tr>")
        });



        // .forEach(function(person) {
        //   tbodyEl.append('\
        //                 <tr>\
        //                     <td class="id">' + product.id + '</td>\
        //                     <td><input type="text" class="name" value="' + product.name + '"></td>\
        //                     <td>\
        //                         <button class="update-button">UPDATE/PUT</button>\
        //                         <button class="delete-button">DELETE</button>\
        //                     </td>\
        //                 </tr>\
        //             ');
        // });
      }
    });
  });
});
