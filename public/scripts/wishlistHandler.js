/*
  handles wishlist creation
*/
function createWishlist(mainEl) {
  // core of the wishlist form
  var formBasis = "\
    <div class='form-row p-2 wishEntry'>\
      <div class='col-10'>\
        <input type='text' class='form-control wishEntryInput' placeholder='wish' required>\
      </div>\
      <div class='col-2'>\
        <button type='button' class='btn btn-danger removeEntryButton'>-</button>\
      </div>\
    </div>\
    <div class='form-row p-2 expandableRow'>\
      <div class = col-1></div>\
      <div class='col-8'>\
        <button type='submit' class='btn btn-primary'>Create Wishlist</button>\
      </div>\
      <div class = col-1></div>\
      <div class='col-2'>\
        <button type='button' class='btn btn-success addEntryButton'>+</button>\
      </div>\
    </div>\
  "
  // wishlist form container
  mainEl.html("\
  <h4>What would <span class='font-italic'>you</span> like for Christmas?</h4>\
  <form class='opaque', id ='wishlistForm'>\
    " + formBasis + "\
  </form>\
  ")

  // target wishlist form
  wishlistForm = $('#wishlistForm')

  // define delete button
  wishlistForm.on('click', '.removeEntryButton', function() {
    $(this).parent().parent().remove();
  });

  // define add button
  wishlistForm.on('click', '.addEntryButton', function() {
    $(this).parent().parent().replaceWith(formBasis);
  });

  // define what to do on submit
  wishlistForm.on('submit', function() {
    event.preventDefault();
    // initialize empty list
    var submittedWishes = [];
    $('.wishEntryInput').each(function() {
      // populate submittedWishes
      submittedWishes.push($(this).val())
    });

    // get JWTtoken
    var currToken = localStorage.getItem('Authorization')

    // POST wishlist
    $.ajax({
      url: '/wishlists',
      method: 'POST',
      contentType: 'application/json',
      headers: {
        Authorization: currToken
      },
      data: JSON.stringify({
        wishes: submittedWishes
      }),
      statusCode: {
        400: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-warning alert-dismissible fade show' role='alert'>\
                  Wishlist not created. You already have one!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
                ");
        },
        403: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
                  Wishlist not created. You are not authorized!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
                ");
        },
        200: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-success alert-dismissible fade show' role='alert'>\
                  Wishlist created.\
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


/*
  Displays a given user's wishlist
  Inputs:
  -mainEl = DOM corresponding to #mainDynamic
  -wishlistJSON = JSON object containing username and wishes
  -ofOwnerBool = boolean describing whether request is being made by wishlist owner
*/
function displayWishlist(mainEl, wishlistJSON, ofOwnerBool) {
  var username = wishlistJSON.username;
  var wishes = wishlistJSON.wishes;
  mainEl.html("\
  <h2><span class = 'people model clickable'>" + username + "</span>\'s wishlist</h2>\
  <ul class='list-group' id ='userWishlist'>\
  </ul>\
  ")
  wishes.forEach(wish => {
    var listBody = $("#userWishlist")
    listBody.append("\
    <li class='list-group-item list-group-item-action'>" + wish + "</li>\
    ")
  });
  if (ofOwnerBool) {
    mainEl.append("\
    <div class = p-4>\
    <button type='button' class='btn btn-secondary clickable editWishlist'>Edit Wishlist</button>\
    </div>\
    ");
  };
}

/*
  handles wishlist editing
*/
function editWishlist(mainEl, wishlistJSON) {
  // initialize editor container
  mainEl.html("\
  <h4>What would <span class='font-italic'>you</span> like for Christmas?</h4>\
  <form class='opaque', id ='wishlistForm'>\
  </form>\
  ")
  // target the form
  wishlistForm = $('#wishlistForm');

  // parse user's current wishes
  var wishes = wishlistJSON.wishes;

  // render user's current wishes on form
  wishes.forEach(wish => {
    wishlistForm.append("<div class='form-row p-2 wishEntry'>\
      <div class='col-10'>\
        <input type='text' class='form-control wishEntryInput' \
        placeholder='wish' value='" + wish + "' required>\
      </div>\
      <div class='col-2'>\
        <button type='button' class='btn btn-danger removeEntryButton'>-</button>\
      </div>\
    </div>\
    ")
  });

  // append submit and add buttons
  wishlistForm.append("<div class='form-row p-2 expandableRow'>\
    <div class = col-1></div>\
    <div class='col-8'>\
      <button type='submit' class='btn btn-primary'>Submit Changes</button>\
    </div>\
    <div class = col-1></div>\
    <div class='col-2'>\
      <button type='button' class='btn btn-success addEntryButton'>+</button>\
    </div>\
  </div>\
  ")

  // form core
  var formBasis = ("\
    <div class='form-row p-2 wishEntry'>\
      <div class='col-10'>\
        <input type='text' class='form-control wishEntryInput' placeholder='wish' required>\
      </div>\
      <div class='col-2'>\
        <button type='button' class='btn btn-danger removeEntryButton'>-</button>\
      </div>\
    </div>\
    <div class='form-row p-2 expandableRow'>\
      <div class = col-1></div>\
      <div class='col-8'>\
        <button type='submit' class='btn btn-primary'>Submit Changes</button>\
      </div>\
      <div class = col-1></div>\
      <div class='col-2'>\
        <button type='button' class='btn btn-success addEntryButton'>+</button>\
      </div>\
    </div>\
  ")


  // see createwishlist for below
  wishlistForm.on('click', '.removeEntryButton', function() {
    $(this).parent().parent().remove();
  });

  wishlistForm.on('click', '.addEntryButton', function() {
    $(this).parent().parent().replaceWith(formBasis);
  });

  wishlistForm.on('submit', function() {
    event.preventDefault();
    var submittedWishes = [];
    $('.wishEntryInput').each(function() {
      submittedWishes.push($(this).val())
    });

    // edit user's wishlist
    var currToken = localStorage.getItem('Authorization')
    $.ajax({
      url: '/wishlists/' + wishlistJSON.username,
      method: 'PUT',
      contentType: 'application/json',
      headers: {
        Authorization: currToken
      },
      data: JSON.stringify({
        wishes: submittedWishes
      }),
      statusCode: {
        400: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-warning alert-dismissible fade show' role='alert'>\
                  Wishlist not edited. You didn't have one to start with!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
                ");
        },
        403: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
                  Wishlist edit failed. You are not authorized!\
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                    <span aria-hidden='true'>&times;</span>\
                  </button>\
                </div>\
                ");
        },
        200: function(response) {
          console.log(response)
          $('.logo.clickable').trigger('click');
          mainEl.prepend("\
                <div class='alert alert-success alert-dismissible fade show' role='alert'>\
                  Wishlist edited.\
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


/*
  handles requests when a user asks to interact with their own wishlist
*/
function getOwnWishlist(mainEl, user, userToken, editMode) {
  // GET request for wishlist of the user
  $.ajax({
    url: "/wishlists/" + user,
    contentType: 'application/json',
    headers: {
      Authorization: userToken
    },
    statusCode: {
      403: function(response) {
        console.log(response.responseJSON.message)
        mainEl.prepend("\
        <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
        It seems you are not signed in!\
        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
        <span aria-hidden='true'>&times;</span>\
        </button>\
        </div>\
        ")
      },
      400: function(response) {
        createWishlist(mainEl, user)
      },
      200: function(response) {
        if (editMode) {
          editWishlist(mainEl, response)
        } else {
          displayWishlist(mainEl, response, true)
        };
      }
    }
  })
}

$(document).ready(function() {
  // targeting useful elements
  main = $("#mainDynamic")
  body = $('body')
  // what to do when a user's wishlist is clicked on
  main.on('click', ".userWishlist.clickable", function() {
    // get current token
    var currToken = localStorage.getItem('Authorization')
    // determine whose wishlist we are asking for
    var userRequested = $(this).data('username')
    // send get request for this wishlist
    $.ajax({
      url: "/wishlists/" + userRequested,
      contentType: 'application/json',
      headers: {
        Authorization: currToken
      },
      statusCode: {
        403: function() {
          main.html("\
          <h1>You are not authorized</h1>\
          <p class='text-justify pt-3'>Given a specific wishlist, only its owner and Santa's\
          elves are allowed access.</p>")
        },
        200: function(response) {
          displayWishlist(main, response, false);
        }
      }
    })
  });
  // what to do when an ownwishlist class is clicked
  body.on('click', ".clickable.ownWishlist", function() {
    var currToken = localStorage.getItem('Authorization')
    var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);
    getOwnWishlist(main, decodedCurrToken.username, currToken, false)
  });
  // what to do when the edit wishlist button is clicked
  main.on('click', ".editWishlist", function() {
    var currToken = localStorage.getItem('Authorization')
    var decodedCurrToken = jwt_decode(currToken.split(' ')[1]);
    getOwnWishlist(main, decodedCurrToken.username, currToken, true)
  });
});
