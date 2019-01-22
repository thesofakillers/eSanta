import people from './../models/people'
import utils from './../utils'

const peopleController = {};


/*
controller which returns the JSON array of people on Santa's list
*/
peopleController.getPeople = (req, res) => {
  res.status(200)
  res.send(people);
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
    res.status(200)
    res.send(people[index]);
  } else { // if it doesn't
    res.status(400).send();
  }
};


/*
controller which adds a person to /people
*/
peopleController.postPerson = (req, res) => {
  res.send({
    message: "hello"
  });
};

export default peopleController
