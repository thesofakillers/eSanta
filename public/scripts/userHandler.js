/*
  renders the list of users registered on website
*/
function renderUserList(usersJSON) {
  var main = $("#mainDynamic"); // target our main block
  // reset html to custom table (empty)
  main.html("\
  <div class = 'table-responsive'>\
    <table class='table table-sm table-dark table-striped table-hover'>\
    <caption class='text-white lead'>Silicon Santa Userbase</caption>\
      <thead>\
        <tr>\
          <th width='20%' scope='col'>Username</th>\
          <th width='20%' scope='col'>Forename</th>\
          <th width='20%' scope='col'>Surname</th>\
          <th width='20%' scope='col'>Admin</th>\
          <th width='20%' scope='col'></th>\
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
  // target table
  var tableBody = $("#mainDynamic tbody")
  // populate it from database
  usersJSON.forEach(user => {
    tableBody.append("\
    <tr>\
      <td width='20%'>" + user.username + "</td>\
      <td width='20%'>" + user.forename + "</td>\
      <td width='20%'>" + user.surname + "</td>\
      <td width='20%'>" + ((user.access_token === 'concertina') ? true : false) + "</td>\
      <td width='20%'>\
        <button type='button' class='btn btn-secondary postToNaughty very-small'>+ Naughty List</button>\
      </td>\
    </tr>")
  });
  // what to do when postToNaughty button is clicked
  tableBody.on('click', '.postToNaughty', function() {
    // get row of button
    var userRow = $(this).parent().parent()
    // parse relevant row data
    var usernameToPost = userRow.find('td').eq(0).text();
    var forenameToPost = userRow.find('td').eq(1).text();
    var surnameToPost = userRow.find('td').eq(2).text();

    // get JWTtoken
    var currToken = localStorage.getItem('Authorization')
    var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);

    // post to /people
    $.ajax({
      url: '/people',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: usernameToPost,
        forename: forenameToPost,
        surname: surnameToPost,
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
                  User already on naughty list!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
          ");
        },
        200: function() {
          main.prepend("\
                <div class='alert alert-success alert-dismissible fade show' role='alert'>\
                  User added to naughty list!\
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
  // when the userList button or link is clicked
  var main = $('#mainDynamic');
  var body = $('body');

  // what to do when user asks for user list
  body.on('click', '.clickable.userList', function() {
    // get current auth token
    var currToken = localStorage.getItem('Authorization');
    // send GET request to /users
    $.ajax({
      url: '/users',
      contentType: 'application/json',
      headers: {
        Authorization: currToken
      },
      statusCode: {
        403: function(response) {
          console.log(response);
          $('.logo.clickable').trigger('click');
          main.prepend("\
                <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
                  You are not authorized!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
          ");
        },
        200: function(response) {
          console.log(response)
          renderUserList(response)
        }
      }
    });
  });
});
