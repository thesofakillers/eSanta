const people = require('./../models/people');
const utils = require('./../utils');

const peopleController = {};


/*
controller which returns the JSON array of people on Santa's list
*/
peopleController.getPeople = (req, res) => {
  return res.status(200).send(people);;
};


/*
controller which returns the JSON object within the people array
corresponding to the username requested
*/
peopleController.getPerson = (req, res) => {
  // parse requested username from RESTful interaction
  const usernameRequested = req.params.username;
  // get usernames of all those on Santa's list
  let usernames = utils.getAttributeList(people, 'username');
  // get index of JSON object corresponding to the username
  let index = usernames.indexOf(usernameRequested);
  // check if the username exists
  if (index != -1) { // if it does
    return res.status(200).send(people[index]);
  } else { // if it doesn't
    return res.status(400).send();
  };
};


/*
controller which allows admins (elves) to add a person to /people (santa's list)
*/
peopleController.postPerson = (req, res) => {
  // get POSTer's access_token if they have one
  const isAdmin = req.body.access_token;
  // check validity of access_token
  // if the access_token doesn't exist or is not 'concertina'
  if (isAdmin !== "concertina") {
    return res.status(403).send("You are not authorized"); // forbid the user from POSTing
  }

  // let user post otherwise

  // get username admin wants to add to /people
  const usernameSubmitted = req.body.username;
  // check whether user is already in /people
  let indexPeople = utils.getAttributeList(people, 'username').indexOf(usernameSubmitted);
  if (indexPeople >= 0) { // if this user is already in /people
    //prevent the addition of this user to /people
    return res.status(400).send("username exists");
  } else { // otherwise
    // add person to /people
    people.push({
      'username': usernameSubmitted,
      'forename': req.body.forename,
      'surname': req.body.surname
    });
    // send OK response to Client
    return res.status(200).send(people);
  };
};

module.exports = peopleController
