/*
  Given the current JWTObject, checks whether the user is logged in
  Returns boolean describing outcome of this check
*/
function checkIfLoggedIn(JWTObject) {
  $.ajax({
    url: '/authStatus',
    contentType: 'application/json',
    headers: {
      Authorization: JWTObject
    },
    statusCode: {
      403: function() {
        localStorage.setItem('LoggedIn', 'false')
      },
      200: function() {
        localStorage.setItem('LoggedIn', 'true')
      }
    }
  });
  var loggedInBool = localStorage.getItem('LoggedIn');
  if (loggedInBool === 'true'){
    return true
  } else {
    return false
  };
}

/*
  If the user is logged out, displays 'Login' + 'Register' options on navbar
  if the user is logged out, displays 'logout' option in navbar
*/
function switchLogIOButtons(loggedInBool, navbarEl) {
  if (loggedInBool) {
    navbarEl.html("\
    <span class='clickable nav-item nav-link' id = 'loginPointer'>Logout</span>\
    ");
  } else {
    navbarEl.html("\
      <span class='clickable nav-item nav-link' id = 'loginPointer'>Login</span>\
      <span class='clickable nav-item nav-link' id = 'registerPointer'>Register</span>\
    ");
  };
}

/*
  Handles the rendering of the Register form and parses the inputted data to
  server.
  Will also redirect user depending on success or failure
*/
function handleRegisterForm(errorBoolean) {
  var main = $("#mainDynamic");
  main.html("\
    <form id='registerSubmit'>\
    <div class='form-row'>\
      <div class='col'>\
        <label for='Forename'>Forename</label>\
        <input type='text' class='form-control' id='Forename' placeholder='Forname' required>\
      </div>\
      <div class='col'>\
        <label for='Surname'>Surname</label>\
        <input type='text' class='form-control' id='Surname' placeholder='Surname' required>\
      </div>\
    </div>\
    <div class='form-group pt-3'>\
      <label for='Username'>Username</label>\
      <input type='text' class='form-control' id='Username' placeholder='username' required>\
    <div class='form-group pt-3'>\
        <label for='Password'>Password</label>\
        <input type='password' class='form-control' id='Password' placeholder='password' required>\
    </div>\
    <div class='form-group pt-3'>\
      <div class='form-check'>\
        <input class='form-check-input' type='checkbox' id='admin'>\
        <label class='form-check-label' for='admin'>\
          I am one of Santa's elves\
        </label>\
      </div>\
    </div>\
    <button class='btn btn-primary type='submit'>Register</button>\
  </form>\
    ")
  if (errorBoolean) {
    main.append("\
    <p class='alert alert-danger text-justify'>There was an error.\
    The username submitted may be already taken<p>")
  }
  main.on('submit', '#registerSubmit', function() {
    // prevemt page reload
    event.preventDefault();
    // parse form
    var forenameSubmitted = $('#Forename').val()
    var surnameSubmitted = $('#Surname').val()
    var usernameSubmitted = $('#Username').val()
    var passwordSubmitted = $('#Password').val()
    var admin = $('#admin').is(":checked") ? "concertina" : false;

    $.ajax({
      url: '/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: usernameSubmitted,
        forename: forenameSubmitted,
        surname: surnameSubmitted,
        password: passwordSubmitted,
        access_token: admin
      }),
      statusCode: {
        200: function() {
          handleLoginForm(true, false)
        },
        400: function() {
          handleRegisterForm(true);
        },
        500: function() {
          $("#mainDynamic").html("\
          <h1>Internal Server Error</h1>\
          <p class='text-justify pt-3'>There was an error encrypting your \
          password, please try again later</p>")
        }
      }
    });
  });
}

function handleLoginForm(fromRegister, fromFailure){
  //TODO
}

function logout(){
  // TODO
}

$(document).ready(function() {
  // get current jwt
  var currToken = JSON.parse(localStorage.getItem('Authorization'))
  // check if user logged in
  var loggedIn = checkIfLoggedIn(currToken)
  // get navbar authentication area
  var authAreaEl = $("#authArea");
  // render the correct buttons depending on whether user is logged in or not
  switchLogIOButtons(loggedIn, authAreaEl);

  // handle registering
  authAreaEl.on('click', '.clickable#registerPointer', function() {
    handleRegisterForm(false);
  });

  // handle logging in TODO
  authAreaEl.on('click', '.clickable#loginPointer', function() {
    handleLoginForm(false, false)
    switchLogIOButtons(loggedIn, authAreaEl);
  });

  // handle logging out TODO
  authAreaEl.on('click', '.clickable#logoutPointer', function() {
    loggedIn = logout()
    switchLogIOButtons(loggedIn, authAreaEl);
  });

});
