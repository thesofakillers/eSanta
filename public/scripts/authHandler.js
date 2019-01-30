$(document).ready(function() {
  var currToken = JSON.parse(localStorage.getItem('Authorization'))

  $.ajax({
    url : 'wishlists'
    
  })
  // check if user is logged in
  if (currToken){

  } else {
    <a class="nav-item nav-link" href="">Login</a>
    <a class="nav-item nav-link" href="">Register</a>
  }
});
