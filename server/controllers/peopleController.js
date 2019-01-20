import people from './../models/people'

const peopleController = {};

/*
controller which returns the JSON array of people registered on the website
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
  // get index of JSON object corresponding to the username
  var index = people.map(function(d) {
    return d['username'];
  }).indexOf(usernameRequested)
  // check if the username exists
  if (index != -1) { // if it does
    res.status(200)
    res.send(people[index]);
  } else { // if it doesn't
    res.status(400).send();
  }

};


peopleController.postPerson = (req, res) => {
  res.send({
    message: "hello"
  });
};

export default peopleController
