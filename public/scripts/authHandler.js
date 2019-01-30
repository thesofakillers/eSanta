$(document).ready(function() {
  // get current jwt
  var currToken = JSON.parse(localStorage.getItem('Authorization'))

  // intialize loggedIn boolean
  var loggedIn;

  // check if user logged in
  $.ajax({
    url : '/authStatus',
    contentType: 'application/json',
    headers: {
      Authorization : currToken
    },
    statusCode : {
      403 : function(){loggedIn = false;},
      200 : function(){loggedIn = true;}
    }
  });


  var authAreaEl = $("#authArea");

  // render differently depending on logged in
  if (loggedIn){
    authAreaEl.html("\
    <span class='clickable nav-item nav-link'>Logout</span>\
    ");
  } else {
    authAreaEl.html("\
      <span class='clickable nav-item nav-link'>Login</span>\
      <span class=' clickable nav-item nav-link'>Register</span>\
    ");
  };
});
