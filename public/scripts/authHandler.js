/*
  Handles the rendering of the Login form and parses the inputted data to
  server.
  Will also redirect user depending on success or failure
*/
function handleLoginForm(fromRegister, fromFailure){
  mainEl = $("#mainDynamic")
  // render login form
  mainEl.html("\
  <form id='loginSubmit'>\
    <div class='form-group pt-3'>\
      <label for='Username'>Username</label>\
      <input type='text' class='form-control' id='loginUsername' placeholder='username' required>\
    <div class='form-group pt-3'>\
        <label for='Password'>Password</label>\
        <input type='password' class='form-control' id='loginPassword' placeholder='password' required>\
    </div>\
    <button class='btn btn-primary type='submit'>Login</button>\
  </form>\
  ");

  // add succesful registration message if user reached page from /register
  if (fromRegister){
    mainEl.prepend("\
    <div class='alert alert-success alert-dismissible fade show' role='alert'>\
      Succesfully registered. Feel free to sign in\
      <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
        <span aria-hidden='true'>&times;</span>\
      </button>\
    </div>\
    ")
  };

  // add error message if the user credentials are invalid
  if (fromFailure){
    mainEl.prepend("\
    <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
      There was an error logging you in. Please check your credentials\
      <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
        <span aria-hidden='true'>&times;</span>\
      </button>\
    </div>\
    ")
  };

  // handle form submission
  mainEl.on('submit', '#loginSubmit', function(){
    // prevent page reload
    event.preventDefault();

    // parse entered data
    var usernameSubmitted = $('#loginUsername').val()
    var passwordSubmitted = $('#loginPassword').val()

    // send AJAX POST request
    $.ajax({
      url: "/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username: usernameSubmitted,
        password: passwordSubmitted
      }),
      statusCode:{
        // handles succesful login
        200: function(response){
          console.log(response.message);
          //store JWT token received from server
          localStorage.setItem('Authorization', ('Bearer '+response.token))
          //set loggedIn boolean in system
          localStorage.setItem('loggedIn', true);
          // render logout rather than login/register
          var token = localStorage.getItem('Authorization')
          checkIfLoggedIn(token);
          // render home page
          $('.logo.clickable').trigger('click')
          // give login success message
          mainEl.prepend("\
          <div class='alert alert-success alert-dismissible fade show' role='alert'>\
            You are now logged in.\
            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
              <span aria-hidden='true'>&times;</span>\
            </button>\
          </div>\
          ")
        },
        400: function(){
          // in case of error
          // let user try again
          handleLoginForm(false, true);
        }
      }
    });
  });
}


/*
  Given the current JWTObject, checks whether the user is logged in
  Renders the Login/Register/Logout area accordingly
*/
function checkIfLoggedIn(JWTObject) {
  var authAreaEl = $("#authArea");
  $.ajax({
    url: '/authStatus',
    contentType: 'application/json',
    headers: {
      Authorization : JWTObject
    },
    statusCode: {
      403: function() {
        switchLogIOButtons(false, authAreaEl)
        localStorage.setItem('loggedIn', false);
      },
      200: function() {
        switchLogIOButtons(true, authAreaEl)
      }
    }
  });
  return authAreaEl;
}

/*
  If the user is logged out, displays 'Login' + 'Register' options on navbar
  if the user is logged out, displays 'logout' option in navbar
*/
function switchLogIOButtons(loggedInBool, navbarEl) {
  if (loggedInBool) {
    navbarEl.html("\
    <span class='clickable nav-item nav-link' id = 'logoutPointer'>Logout</span>\
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
function handleRegisterForm(mainEl, errorBoolean) {
  mainEl.html("\
    <form id='registerSubmit'>\
    <div class='form-row'>\
      <div class='col'>\
        <label for='Forename'>Forename</label>\
        <input type='text' class='form-control' id='registerForename' placeholder='Forename' required>\
      </div>\
      <div class='col'>\
        <label for='Surname'>Surname</label>\
        <input type='text' class='form-control' id='registerSurname' placeholder='Surname' required>\
      </div>\
    </div>\
    <div class='form-group pt-3'>\
      <label for='Username'>Username</label>\
      <input type='text' class='form-control' id='registerUsername' placeholder='username' required>\
    <div class='form-group pt-3'>\
        <label for='Password'>Password</label>\
        <input type='password' class='form-control' id='registerPassword' placeholder='password' required>\
    </div>\
    <div class='form-group pt-3'>\
      <div class='form-check'>\
        <input class='form-check-input' type='checkbox' id='registerAdmin'>\
        <label class='form-check-label' for='admin'>\
          I am one of Santa's elves\
        </label>\
      </div>\
    </div>\
    <button class='btn btn-primary type='submit'>Register</button>\
  </form>\
    ")

  mainEl.on('submit', '#registerSubmit', function(e) {
    // prevemt page reload
    e.preventDefault();
    e.stopImmediatePropagation();
    // parse form
    var forenameSubmitted = $('#registerForename').val()
    var surnameSubmitted = $('#registerSurname').val()
    var usernameSubmitted = $('#registerUsername').val()
    var passwordSubmitted = $('#registerPassword').val()
    var admin = ($('#registerAdmin').is(":checked") ? "concertina" : false);

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
        200: function(response) {
          handleLoginForm(true, false);
        },
        400: function() {
          mainEl.prepend("\
          <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
            There was an error. The username submitted may be already taken\
            <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
              <span aria-hidden='true'>&times;</span>\
            </button>\
          </div>\
          ")
        },
        500: function() {
          mainEl.html("\
          <h1>Internal Server Error</h1>\
          <p class='text-justify pt-3'>There was an error encrypting your \
          password, please try again later</p>")
        }
      }
    });
  });
}

/*
  Allows user to logout and renders appropriate page
*/
function logout(mainEl){
  // remove JWT token
  localStorage.removeItem('Authorization');
  // remove loggedIn boolean from storage
  localStorage.removeItem('loggedIn');
  // load home page
  $('.logo.clickable').trigger('click')
  // let user know they are no longer logged in
  mainEl.prepend("\
  <div class='alert alert-info alert-dismissible fade show' role='alert'>\
    You are no longer logged-in.\
    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
      <span aria-hidden='true'>&times;</span>\
    </button>\
  </div>\
  ")
}

$(document).ready(function() {
  // get current jwt
  var currToken = localStorage.getItem('Authorization')
  // check if user logged in, get navbar area,
  // render the correct buttons depending on whether user is logged in or not
  var authAreaEl = checkIfLoggedIn(currToken)

  var main = $("#mainDynamic");
  // handle registering
  authAreaEl.on('click', '.clickable#registerPointer', function() {
    handleRegisterForm(main, false);
  });

  // handle logging in
  authAreaEl.on('click', '.clickable#loginPointer', function() {
    handleLoginForm(false, false)
  });

  // handle logging out
  authAreaEl.on('click', '.clickable#logoutPointer', function() {
    logout(main)
    switchLogIOButtons(false, authAreaEl);
  });

});
